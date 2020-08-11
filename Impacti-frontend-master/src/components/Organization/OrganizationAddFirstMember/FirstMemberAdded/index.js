import React, { Component } from 'react'
import Paper from '@material-ui/core/Paper'
import { connect } from 'react-redux'

import WithFade from '../../../WithFade'
import { loadOrganization } from 'actions/organization'

class FirstMemberAdded extends Component {
  static goToBoard() {
    window.location = '/board'
  }
  render() {
    return (
      <WithFade action={() => FirstMemberAdded.goToBoard()}>
        <Paper
          elevation={24}
          className="paper-container paper-container--short paper-container--clickable"
          onClick={FirstMemberAdded.goToBoard}
        >
          <div>
            <div className="paper-container__text--big">
              Congratulations!
              <br />
              <br />
              You’ve just added very first member:
              <br />
              <strong>{this.props.member.name}</strong>
            </div>
            <div className="paper-container__text--small">
              Now you can add another ones: those could be locations,
              departments, suppliers, etc. You can always add members later
              also.
            </div>
          </div>
        </Paper>
      </WithFade>
    )
  }
}

export default connect(
  state => ({
    member: state.memberWizard
  }),
  dispatch => ({
    load: loadOrganization(dispatch)
  })
)(FirstMemberAdded)
