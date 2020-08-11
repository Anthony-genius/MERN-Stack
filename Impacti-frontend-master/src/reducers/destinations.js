import KEYS from 'constants/actionKeys/destinations'

const defaultState = {
  failedSubmittingDestinations: false,
  isFirstDestinationSelectModalOpen: false,
  isFetchingPaths: false,
  isConfirmPathRemoveDialogOpen: false,
  selectedPaths: [],
  pathToRemove: null,
  isSuggestedPathsDisclaimerModalOpen: false,
  isRemovingPath: false
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case KEYS.SUBMIT_DESTINATIONS_LIST: {
      return {
        ...state,
        isSubmittingDestinations: true,
        failedSubmittingDestinations: false
      }
    }
    case KEYS.ON_DESTINATIONS_LIST_SUBMIT_SUCCESS: {
      return {
        ...state,
        isSubmittingDestinations: false
      }
    }
    case KEYS.ON_DESTINATIONS_LIST_SUBMIT_FAILURE: {
      return {
        ...state,
        failedSubmittingDestinations: true,
        isSubmittingDestinations: false
      }
    }
    case KEYS.OPEN_FIRST_DESTINATION_SELECT_MODAL: {
      return {
        ...state,
        isFirstDestinationSelectModalOpen: true
      }
    }
    case KEYS.CLOSE_FIRST_DESTINATION_SELECT_MODAL: {
      return {
        ...state,
        isFirstDestinationSelectModalOpen: false
      }
    }
    case KEYS.OPEN_SUGGESTED_PATHS_DISCLAIMER_MODAL: {
      return {
        ...state,
        isSuggestedPathsDisclaimerModalOpen: true
      }
    }
    case KEYS.CLOSE_SUGGESTED_PATHS_DISCLAIMER_MODAL: {
      return {
        ...state,
        isSuggestedPathsDisclaimerModalOpen: false
      }
    }
    case KEYS.OPEN_CONFIRM_PATH_REMOVE_MODAL: {
      return {
        ...state,
        isConfirmPathRemoveDialogOpen: true,
        pathToRemove: action.data
      }
    }
    case KEYS.CLOSE_CONFIRM_PATH_REMOVE_MODAL: {
      return {
        ...state,
        isConfirmPathRemoveDialogOpen: false
      }
    }
    case KEYS.REMOVE_PATH: {
      return {
        ...state,
        isRemovingPath: true
      }
    }
    case KEYS.ON_REMOVE_PATH_SUCCESS: {
      return {
        ...state,
        selectedPaths: state.selectedPaths.some(
          p => p === state.pathToRemove._id
        )
          ? state.selectedPaths.filter(e => e !== state.pathToRemove._id)
          : state.selectedPaths,
        isConfirmPathRemoveDialogOpen: false,
        pathToRemove: null,
        isRemovingPath: false
      }
    }
    case KEYS.ON_REMOVE_PATH_FAILURE: {
      return {
        ...state,
        isConfirmPathRemoveDialogOpen: false,
        pathToRemove: null,
        isRemovingPath: false
      }
    }
    case KEYS.SELECT_PATH: {
      return {
        ...state,
        selectedPaths: state.selectedPaths.some(p => p === action.data._id)
          ? state.selectedPaths
          : state.selectedPaths.concat(action.data._id)
      }
    }
    case KEYS.PRESELECT_PATHS: {
      return {
        ...state,
        selectedPaths: action.data
      }
    }
    default:
      return state
  }
}
