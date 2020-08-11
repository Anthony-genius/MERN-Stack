import { push } from 'connected-react-router'

import ACTION_KEYS from 'constants/actionKeys/dashboard'
import API from 'constants/api'
import apiCaller from './apiCaller'

export const loadTabsDefinitions = dispatch => () => {
  apiCaller
    .withAuth(API.KEYS.GET_TAB_DEFINITIONS, {})
    .then(data => data.config)
    .then(data =>
      dispatch({
        type: ACTION_KEYS.DASHBOARD_LOAD_TAB_DEFINITIONS,
        data
      })
    )
}

export const selectTab = dispatch => data =>
  dispatch({
    type: ACTION_KEYS.DASHBOARD_TAB_SELECT,
    data
  })

export const filterHomePage = dispatch => tags => {
  dispatch(push(`/dashboard`, { tags }))
}
