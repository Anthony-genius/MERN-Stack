import WIDGET_KEYS from 'constants/actionKeys/widgets/localContext'
import GLOBAL_KEYS from 'constants/actionKeys/applicationContext'

const defaultState = { chosenMemberId: null }

export default (state = defaultState, action) => {
  switch (action.type) {
    case WIDGET_KEYS.JOURNEY_PROGRESS_SET_LOCAL_CONTEXT: {
      return { ...state, chosenMemberId: action.data.id }
    }
    case WIDGET_KEYS.COMMITMENT_TRACKER_SET_LOCAL_CONTEXT: {
      return { ...state, chosenMemberId: action.data.id }
    }
    case GLOBAL_KEYS.SELECT_MEMBER: {
      return defaultState
    }
    default: {
      return state
    }
  }
}
