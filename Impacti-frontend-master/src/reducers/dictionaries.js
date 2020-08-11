import ACTION_KEYS from 'constants/actionKeys/dictionaries'

const defaultState = {
  country: [],
  sdg: [],
  countrySdg: [],
  currency: [],
  sector: [],
  industry: [],
  capacity: [],
  organizationType: [],
  path: [],
  destination: [],
  baseAssessmentFocus: [],
  loadedAt: null,
  loadingStateLookup: {}
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case ACTION_KEYS.STARTED_DICTIONARY_LIST_LOAD: {
      return {
        ...state,
        loadingStateLookup: {
          ...state.loadingStateLookup,
          [action.data]: true
        }
      }
    }
    case ACTION_KEYS.DICTIONARY_LIST_LOAD: {
      return {
        ...state,
        [action.data.type]: action.data.list,
        loadedAt: Date.now(),
        loadingStateLookup: {
          ...state.loadingStateLookup,
          [action.data.type]: false
        }
      }
    }
    case ACTION_KEYS.DICTIONARY_LIST_LOAD_FAILURE: {
      return {
        ...state,
        loadingStateLookup: {
          ...state.loadingStateLookup,
          [action.data.type]: false
        }
      }
    }
    default:
      return state
  }
}
