import KEYS from 'constants/actionKeys/session'
import { getTheLatestUri } from 'selectors/auth'

const initialState = {
  lastlySavedUri: '',
  loginErrorMessage: '',
  isSubmittingLogin: false,
  hasLoginErrorOccurred: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case KEYS.RESET_PASSWORD:
      return {
        ...state,
        user: { ...action.data }
      }

    case KEYS.ON_RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        user: { ...action.data }
      }

    case KEYS.ON_RESET_PASSWORD_FAILURE:
      return {
        ...state
      }

    case KEYS.ON_UPDATE_USER_SUCCESS:
      return {
        ...state,
        user: { ...action.data }
      }

    case KEYS.ON_UPDATE_PASSWORD_SUCCESS:
      return {
        ...state,
        user: { ...action.data }
      }

    case KEYS.GET_AUTH:
      return {
        ...state,
        ...action.data,
        loading: true
      }

    case KEYS.GET_AUTH_SUCCESS:
      return {
        ...state,
        ...action.data,
        loading: false
      }

    case KEYS.GET_AUTH_FAILURE:
      return {
        ...state,
        loading: false
      }

    case KEYS.LOGIN:
      return {
        ...state,
        ...action.data,
        isSubmittingLogin: true,
        hasLoginErrorOccurred: false
      }
    case KEYS.ON_LOGIN_SUCCESS:
      return {
        ...state,
        ...action.data,
        isSubmittingLogin: false
      }
    case KEYS.ON_LOGIN_FAILURE:
      return {
        ...state,
        isSubmittingLogin: false,
        hasLoginErrorOccurred: true,
        loginErrorMessage: action.data.message
      }
    case KEYS.UPDATE_LASTLY_SAVED_URI:
      return {
        ...state,
        lastlySavedUri: getTheLatestUri(action.uriToSave, state.lastlySavedUri)
      }

    case KEYS.LOGOUT: {
      const hasLoginErrorOccurred = action.data && action.data.message
      const loginErrorMessage = hasLoginErrorOccurred ? action.data.message : ''
      return {
        ...initialState,
        loginErrorMessage,
        hasLoginErrorOccurred
      }
    }
    default:
      return state
  }
}
