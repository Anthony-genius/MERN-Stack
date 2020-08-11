import WIDGET_KEYS from 'constants/actionKeys/widgets/progressOnYourJourney'
import GLOBAL_KEYS from 'constants/actionKeys/applicationContext'

const defaultState = { chosenMemberId: null }

export default (state = defaultState, action) => {
  switch (action.type) {
    case WIDGET_KEYS.JOURNEY_PROGRESS_SET_LOCAL_CONTEXT: {
      return { ...state, chosenMemberId: action.data.id }
    }
    case GLOBAL_KEYS.SELECT_MEMBER: {
      return defaultState
    }
    case WIDGET_KEYS.LOAD_PROGRESS_JOURNEY_DATA:
      return {
        ...state,
        isLoadingData: true,
        hasLoadingDataFailureOccured: false
      }
    case WIDGET_KEYS.ON_LOAD_PROGRESS_JOURNEY_DATA_SUCCESS:
      return {
        ...state,
        boxesContent: action.data,
        isLoadingData: false
      }
    case WIDGET_KEYS.ON_LOAD_PROGRESS_JOURNEY_DATA_FAILURE:
      return {
        ...state,
        boxesContent: action.data,
        isLoadingData: false,
        hasLoadingDataFailureOccured: true
      }
    default: {
      return state
    }
  }
}
