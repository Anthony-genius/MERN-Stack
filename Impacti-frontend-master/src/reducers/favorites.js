import KEYS from 'constants/actionKeys/dashboard'

const initialState = {
  selectedTab: undefined,
  favorites: [],
  isLoadingData: false,
  hasLoadingDataFailureOccurred: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case KEYS.FAVORITES_LOAD:
      return {
        ...state,
        favorites: action.data
      }
    case KEYS.FAVORITE_CREATE:
      return {
        ...state,
        favorites: []
      }
    case KEYS.FAVORITE_DELETE:
      return {
        ...state,
        favorites: []
      }
    default:
      return state
  }
}
