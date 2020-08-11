import { push } from 'connected-react-router'
import API from 'constants/api'
import ACTION_KEYS from 'constants/actionKeys/session'
import apiCaller from './apiCaller'
import { refreshRate } from 'config/auth'

export const getAuth = dispatch => () => {
  dispatch({
    type: ACTION_KEYS.GET_AUTH
  })

  return apiCaller
    .withAuth(API.KEYS.GET_AUTH)
    .then(response => {
      setTimeout(extendToken(dispatch), refreshRate)
      dispatch({
        type: ACTION_KEYS.GET_AUTH_SUCCESS,
        data: response
      })
    })
    .catch(e => {
      console.error(e)
      dispatch({
        type: ACTION_KEYS.GET_AUTH_FAILURE
      })
    })
}

export const login = dispatch => data => {
  dispatch({
    type: ACTION_KEYS.LOGIN,
    data: { email: data.email }
  })

  return apiCaller
    .withoutAuth(API.KEYS.LOGIN, {
      payload: data
    })
    .then(
      response => {
        localStorage.setItem('authToken', response.token)
        localStorage.setItem('connect', 'connect')
        setTimeout(extendToken(dispatch), refreshRate)

        dispatch(push(`/dashboard`))

        dispatch({
          type: ACTION_KEYS.ON_LOGIN_SUCCESS,
          data: response
        })
      },
      err =>
        dispatch({
          type: ACTION_KEYS.ON_LOGIN_FAILURE,
          data: err
        })
    )
}

export const signUp = dispatch => data => {
  dispatch({
    type: ACTION_KEYS.SIGN_UP,
    data
  })

  return apiCaller
    .withAuth(API.KEYS.SIGN_UP, {
      payload: data
    })
    .then(
      response =>
        dispatch({
          type: ACTION_KEYS.ON_SIGN_UP_SUCCESS,
          data: response
        }),
      err =>
        dispatch({
          type: ACTION_KEYS.ON_SIGN_UP_FAILURE,
          err
        })
    )
}

export const updateUser = dispatch => data => {
  dispatch({
    type: ACTION_KEYS.UPDATE_USER,
    data
  })

  return apiCaller
    .withAuth(API.KEYS.UPDATE_USER, {
      payload: data
    })
    .then(
      response =>
        dispatch({
          type: ACTION_KEYS.ON_UPDATE_USER_SUCCESS,
          data: response
        }),
      err =>
        dispatch({
          type: ACTION_KEYS.ON_UPDATE_USER_FAILURE,
          err
        })
    )
}

export const resetPassword = dispatch => data => {
  dispatch({
    type: ACTION_KEYS.RESET_PASSWORD,
    data
  })

  return apiCaller
    .withAuth(API.KEYS.RESET_PASSWORD, {
      payload: data
    })
    .then(
      response =>
        dispatch({
          type: ACTION_KEYS.ON_RESET_PASSWORD_SUCCESS,
          data: response
        }),
      err =>
        dispatch({
          type: ACTION_KEYS.ON_RESET_PASSWORD_FAILURE,
          err
        })
    )
}

export const updatePassword = dispatch => data => {
  dispatch({
    type: ACTION_KEYS.UPDATE_PASSWORD,
    data
  })

  return apiCaller
    .withAuth(API.KEYS.UPDATE_PASSWORD, {
      payload: data
    })
    .then(
      response =>
        dispatch({
          type: ACTION_KEYS.ON_UPDATE_PASSWORD_SUCCESS,
          data: response
        }),
      err =>
        dispatch({
          type: ACTION_KEYS.ON_UPDATE_PASSWORD_FAILURE,
          err
        })
    )
}

export const extendToken = dispatch => data => {
  if (!localStorage.getItem('authToken')) return

  return apiCaller
    .withAuth(API.KEYS.EXTEND_TOKEN, {
      payload: data
    })
    .then(response => {
      localStorage.setItem('authToken', response.token)
      setTimeout(extendToken(dispatch), refreshRate)
    })
    .catch(e => {
      console.error(e)
      setTimeout(extendToken(dispatch), 1000)
    })
}

export const rememberUri = dispatch => uri => {
  dispatch({
    type: ACTION_KEYS.UPDATE_LASTLY_SAVED_URI,
    uriToSave: uri || window.location.hash.substr(1)
  })
}

export const logOut = dispatch => data => {
  localStorage.removeItem('authToken')
  localStorage.removeItem('email')
  localStorage.removeItem('connect')
  dispatch({
    type: ACTION_KEYS.LOGOUT,
    data
  })
  dispatch(push(`/login`))
}
