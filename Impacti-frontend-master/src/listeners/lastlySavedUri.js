import API from 'constants/api'
import ACTION_KEYS from 'constants/actionKeys/session'
import apiCaller from './../actions/apiCaller'

const getValue = s => s.auth.lastlySavedUri

const signUpListener = store => {
  let currentValue

  const sendLastlyReachedUrlFromRanking = () => {
    const previousValue = currentValue
    currentValue = getValue(store.getState())

    if (previousValue === currentValue || !currentValue) {
      return
    }

    apiCaller
      .withAuth(API.KEYS.REMEMBER_URI, {
        payload: [{ key: 'targetUri', value: currentValue }]
      })
      .then(
        response => {
          store.dispatch({
            type: ACTION_KEYS.ON_REMEMBER_URI_SUCCESS,
            response
          })
        },
        err =>
          store.dispatch({
            type: ACTION_KEYS.ON_REMEMBER_URI_FAILURE,
            err
          })
      )
  }

  store.subscribe(sendLastlyReachedUrlFromRanking)
}

export default signUpListener
