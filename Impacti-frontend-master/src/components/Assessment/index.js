import React, { Component } from 'react'
import { connect } from 'react-redux'

import { push } from 'connected-react-router'

import AssessmentStage from './AssessmentStage'

import AssessmentConfig from 'components/Assessment/AssessmentConfig'

import LoadingSpinner from 'components/LoadingSpinner'

import {
  updateState,
  getState,
  getMember,
  createEmptyUserAndMember,
  updateMember
} from 'actions/assessmentWizard'

import { getAuth } from 'actions/session'

class Assessment extends Component {
  state = {
    loading: true
  }

  componentDidMount() {
    const { auth, getState, getMember, push } = this.props
    if (auth.user && auth.user.emailConfirmed) {
      push(`/dashboard`)
    } else if (auth.user && auth.user.organization) {
      getMember(auth.user.organization.rootMember).then(() =>
        getState(auth.user.states[0]).then(state => {
          this.setState({ stateId: state._id, memberId: state.member })
          push(`/${state.route}/${state.stage}/${state.step}`)

          this.setState({ loading: false })
        })
      )
    } else {
      this.setState({ loading: false })
    }
  }

  onStart = () => {
    const {
      createEmptyUserAndMember,
      updateState,
      getAuth,
      push,
      auth
    } = this.props

    if (!auth.user) {
      return createEmptyUserAndMember().then(({ data }) => {
        getAuth().then(() => {
          const [state] = data.user.states
          const nextStage = AssessmentConfig.stages[1]
          const nextStep = nextStage.steps[0]

          updateState(state, nextStage.key, nextStep.key)
        })
      })
    } else {
      push(`/dashboard`)
    }
  }

  render() {
    const { updateMember, updateState, history, auth } = this.props

    const { loading, stateId, memberId } = this.state

    if (!auth || auth.loading || loading) return <LoadingSpinner />

    return (
      <AssessmentStage
        goBack={history.goBack}
        onStart={this.onStart}
        nextStep={this.nextStep}
        updateMember={data => updateMember(memberId, data)}
        updateState={(stage, step) => updateState(stateId, stage, step)}
      />
    )
  }
}

export default connect(
  state => ({
    state,
    assessmentWizard: state.assessmentWizard,
    dictionaries: state.dictionaries,
    organization: state.organization,
    currentName: state.assessmentWizard.currentName,
    location: state.router.location,
    auth: state.auth
  }),
  dispatch => ({
    getAuth: getAuth(dispatch),
    updateState: updateState(dispatch),
    updateMember: updateMember(dispatch),
    getState: getState(dispatch),
    getMember: getMember(dispatch),
    createEmptyUserAndMember: createEmptyUserAndMember(dispatch),
    push: path => dispatch(push(path))
  })
)(Assessment)
