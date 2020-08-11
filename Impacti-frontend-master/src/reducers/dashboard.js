import KEYS from 'constants/actionKeys/dashboard'

const initialState = {
  selectedTab: undefined,
  tabDefinitions: [],
  isLoadingData: false,
  hasLoadingDataFailureOccured: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case KEYS.DASHBOARD_TAB_SELECT:
      return {
        ...state,
        selectedTab: action.data
      }
    case KEYS.DASHBOARD_LOAD_TAB_DEFINITIONS:
      return {
        ...state,
        tabDefinitions: action.data
      }
    default:
      return state
  }
}
