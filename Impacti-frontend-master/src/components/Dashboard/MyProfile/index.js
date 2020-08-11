import React from 'react'
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'
//import PropTypes from 'prop-types'
import { getMember } from 'actions/assessmentWizard'
import { withStyles } from '@material-ui/core/styles'

import UserProfile from './UserProfile'
import UserActivity from './UserActivity'
import UserEdit from './UserEdit'
import ProfileHeader from './ProfileHeader'

const styles = theme => ({})

class MyProfile extends React.Component {
  componentDidMount = () => {
    window.scrollTo(0, 0)
    const { auth, getMember } = this.props
    if (auth.user && auth.user.organization) {
      getMember(auth.user.organization.rootMember)
    }
  }

  render() {
    const { auth, match, location, member } = this.props

    const route = location.pathname.split('/').pop()
    const showActivity = route === 'activity'
    const editMode = route === 'edit'
    //const memberId = member.id

    return (
      <>
        <ProfileHeader
          auth={auth}
          showActivity={showActivity}
          editMode={editMode}
        />
        <Route exact path={`${match.url}`} component={UserProfile} />
        <Route exact path={`${match.url}/activity`} component={UserActivity} />
        <Route exact path={`${match.url}/edit`} component={UserEdit} />
      </>
    )
  }
}

export default withStyles(styles)(
  connect(
    state => ({
      auth: state.auth
    }),
    dispatch => ({
      getMember: getMember(dispatch)
    })
  )(MyProfile)
)
