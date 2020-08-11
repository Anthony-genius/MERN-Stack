import KEYS from 'constants/actionKeys/applicationContext'
import ORGANIZATION_KEYS from 'constants/actionKeys/organizations'

const defaultState = {
  selectedMemberId: null,
  selectedPathId: null
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case KEYS.SELECT_MEMBER: {
      return {
        ...state,
        selectedMemberId: action.data
      }
    }
    case KEYS.SELECT_PATH_CONTEXT: {
      return {
        ...state,
        selectedPathId: action.data
      }
    }
    case KEYS.ORGANIZATION_LOAD: {
      return {
        ...state,
        selectedMemberId: state.selectedMemberId
          ? state.selectedMemberId
          : action.data.id
      }
    }
    case ORGANIZATION_KEYS.REMOVE_MEMBER: {
      return {
        ...state,
        selectedMember: action.data
      }
    }
    default: {
      return state
    }
  }
}
