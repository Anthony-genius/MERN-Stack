import fetch from './fetchDataAuth'
import { dictionariesAsArray } from 'constants/dictionaries'
import API_CONSTANTS from 'constants/api'
import ACTION_KEYS from 'constants/actionKeys/dictionaries'

export const load = name => dispatch => () => {
  const camelCaseName = name
    .toLowerCase()
    .replace(/_\w/g, m => m[1].toUpperCase())
  dispatch({
    type: ACTION_KEYS.STARTED_DICTIONARY_LIST_LOAD,
    data: camelCaseName
  })

  fetch(`${API_CONSTANTS.BASE_URL}/api/external/dictionaries?type=${name}`, {
    method: 'GET'
  })
    .then(res => res.json())
    .then(
      data =>
        dispatch({
          type: ACTION_KEYS.DICTIONARY_LIST_LOAD,
          data: {
            list: data,
            type: camelCaseName
          }
        }),
      () =>
        dispatch({
          type: ACTION_KEYS.DICTIONARY_LIST_LOAD_FAILURE,
          data: {
            list: [],
            type: camelCaseName
          }
        })
    )
}

export const loadAll = dispatch => () =>
  Promise.all(
    dictionariesAsArray
      .map(e => load(e))
      .map(e => e(dispatch))
      .map(e => e())
  )
