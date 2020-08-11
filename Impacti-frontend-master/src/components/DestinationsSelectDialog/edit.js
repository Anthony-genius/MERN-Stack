import { connect } from 'react-redux'
import { submitDestinations } from 'actions/destinations'
import DestinationsSelectDialog from './index'
import { BUTTON_TYPES } from 'components/ImpactiButton'

export default connect(
  (state, props) => ({
    member: props.member,
    destinations: {
      ...state.destinations,
      list: state.dictionaries.destination
    },
    isOpen: props.isOpen,
    buttonType: BUTTON_TYPES.UPDATE_DESTINATIONS
  }),
  (dispatch, props) => ({
    submitDestinations: submitDestinations(dispatch)({ isCascade: false }),
    closeModal: props.closeModal
  })
)(DestinationsSelectDialog)
