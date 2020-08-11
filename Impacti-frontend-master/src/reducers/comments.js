import KEYS from 'constants/actionKeys/dashboard'

const initialState = {
  selectedTab: undefined,
  comments: [],
  isLoadingData: false,
  hasLoadingDataFailureOccurred: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case KEYS.COMMENTS_LOAD:
      return {
        ...state,
        comments: action.data
      }
    case KEYS.COMMENT_CREATE:
      return {
        ...state,
        comments: [...state.comments, action.data]
      }
    default:
      return state
  }
}
