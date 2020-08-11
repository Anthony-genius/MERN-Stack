import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'

/* import AccountInfo from './SetupAccountInfo' */
import AccountIntro from './SetupAccountIntro'
import AccountEmail from './SetupAccountEmail'
import AccountUsername from './SetupAccountUsername'
import AccountPassword from './SetupAccountPassword'
import AccountConfirm from './SetupAccountConfirm'

import LoadingSpinner from 'components/LoadingSpinner'

const steps = [
  { key: 'intro', component: AccountIntro },
  { key: 'email', component: AccountEmail },
  { key: 'username', component: AccountUsername },
  { key: 'password', component: AccountPassword },
  { key: 'confirm', component: AccountConfirm }
]

class SignUp extends Component {
  constructor(props, context) {
    super(props, context)
    this.fieldValues = {
      email: null,
      username: null,
      password: null,
      passwordRepeat: null
    }
  }

  UNSAFE_componentWillMount() {
    const { auth } = this.props
    // If the user email is set it means that a user that is logged in. They should not be able to sign up again
    if (auth && auth.user && auth.user.email) {
      this.props.push('/dashboard')
    }
    // User skipped the assessment
    if (auth && !auth.user) {
      this.props.push('/')
    }
  }

  getCurrentStep() {
    const { location } = this.props

    return location.pathname.replace('/sign-up', '').replace('/', '') || 'intro'
  }

  nextStep() {
    const stepIndex = steps.findIndex(s => s.key === this.getCurrentStep())

    const { key: nextStepKey } = steps[stepIndex + 1]

    this.props.push(`/sign-up/${nextStepKey}`)
  }

  saveValues(fields) {
    this.fieldValues = { ...this.fieldValues, ...fields }
  }

  render() {
    const { component: Component } = steps.find(
      step => step.key === this.getCurrentStep()
    )

    return Component ? (
      <Component
        nextStep={() => this.nextStep()}
        saveValues={data => this.saveValues(data)}
        fieldValues={this.fieldValues}
      />
    ) : (
      <LoadingSpinner />
    )
  }
}

export default connect(
  state => ({
    auth: state.auth
  }),
  dispatch => ({
    push: path => dispatch(push(path))
  })
)(SignUp)
