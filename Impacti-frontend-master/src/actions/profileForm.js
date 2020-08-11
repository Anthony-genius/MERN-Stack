import ACTION_KEYS from 'constants/actionKeys/dashboard'
import API from 'constants/api'
import apiCaller from './apiCaller'

export const loadFormFields = dispatch => () => {
  apiCaller.withAuth(API.KEYS.GET_ALL_FORM_FIELDS, {}).then(data => {
    dispatch({
      type: ACTION_KEYS.FORM_FIELDS_LOAD,
      data
    })
  })
}

export const addFormField = dispatch => formField => {
  apiCaller
    .withAuth(API.KEYS.ADD_FORM_FIELD, { payload: formField })
    .then(data =>
      dispatch({
        type: ACTION_KEYS.FORM_FIELD_CREATE,
        data
      })
    )
}

export const deleteFormField = dispatch => formField => {
  apiCaller
    .withAuth(API.KEYS.DELETE_FORM_FIELD, {
      urlParams: { id: formField }
    })
    .then(
      loadFormFields(data =>
        dispatch({
          type: ACTION_KEYS.FORM_FIELD_DELETE,
          data
        })
      )
    )
}
