import { connect } from 'react-redux'
import { toggleEditMemberMode, update } from 'actions/organization'
import { nodeById } from 'selectors/organization'

import Form from './index'

export default connect(
  (state, ownProps) => ({
    dictionaries: state.dictionaries,
    initial: nodeById(ownProps.initial, state)(state.organization),
    manager: state.auth.email
  }),
  dispatch => ({
    removeEdited: toggleEditMemberMode(dispatch)(undefined),
    save: update(dispatch)
  })
)(Form)
