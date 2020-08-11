import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Avatar from '@material-ui/core/Avatar'

class DashboardAvatar extends React.Component {
  render() {
    const { user } = this.props
    return (
      <div>
        <div>
          <Avatar
            alt="Avatar"
            src={
              (user && user.image && user.image) ||
              require('assets/user-default.png')
            }
          />
        </div>
      </div>
    )
  }
}

export default connect(state => ({
  user: state.auth.user
}))(DashboardAvatar)
