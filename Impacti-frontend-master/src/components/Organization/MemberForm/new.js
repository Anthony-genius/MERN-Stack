import { connect } from 'react-redux'
import { removeEdited, save } from 'actions/organization'
import { nodeById } from 'selectors/organization'

import Form from './index'

export default connect(
  (state, ownProps) => ({
    dictionaries: state.dictionaries,
    initial: nodeById(ownProps.initial, state)(state.organization),
    manager: state.auth.email
  }),
  dispatch => ({
    removeEdited: removeEdited(dispatch),
    save: save(dispatch)
  })
)(Form)
