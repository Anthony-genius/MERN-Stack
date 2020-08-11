import { connect } from 'react-redux'
import {
  closeFirstDestinationSelectModal,
  submitDestinations,
  openSuggestedPathsDisclaimerModal,
  getSuggestedPaths
} from 'actions/destinations'
import DestinationsSelectDialog from './index'

export default connect(
  state => ({
    member: state.organization,
    destinations: {
      ...state.destinations,
      list: state.dictionaries.destination || []
    },
    isOpen: state.destinations.isFirstDestinationSelectModalOpen
  }),
  dispatch => ({
    submitDestinations: submitDestinations(dispatch)({
      isCascade: true,
      preselectPaths: true
    }),
    closeFirstDestinationSelectModal: closeFirstDestinationSelectModal(
      dispatch
    ),
    openSuggestedPathsDisclaimerModal: openSuggestedPathsDisclaimerModal(
      dispatch
    ),
    getSuggestedPaths: getSuggestedPaths(dispatch)
  }),
  (stateProps, dispatchProps, ownProps) => ({
    ...ownProps,
    ...stateProps,
    ...dispatchProps,
    closeModal: () => {
      dispatchProps.closeFirstDestinationSelectModal()
      dispatchProps.openSuggestedPathsDisclaimerModal()
      dispatchProps.getSuggestedPaths(stateProps.member.id)
    }
  })
)(DestinationsSelectDialog)
