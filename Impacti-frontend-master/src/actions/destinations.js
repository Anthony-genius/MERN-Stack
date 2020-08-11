import ACTION_KEYS from 'constants/actionKeys/destinations'
import API from 'constants/api'
import { loadOrganization } from './organization'
import apiCaller from './apiCaller'

export const getSuggestedPaths = dispatch => id =>
  apiCaller
    .withAuth(API.KEYS.GET_SUGGESTED_PATHS, {
      urlParams: { id }
    })
    .then(data =>
      dispatch({
        type: ACTION_KEYS.PRESELECT_PATHS,
        data: Array.isArray(data.paths) ? data.paths : []
      })
    )

export const submitDestinations = dispatch => ({
  isCascade = true,
  preselectPaths = false
}) => (destinations = [], member = {}) => {
  dispatch({
    type: ACTION_KEYS.SUBMIT_DESTINATIONS_LIST
  })

  if (preselectPaths) {
    getSuggestedPaths(dispatch)(member.id)
  }

  const destinationsToRemove = Array.isArray(member.destinations)
    ? member.destinations
        .filter(
          memberDestination =>
            !destinations.some(d => memberDestination._id === d._id)
        )
        .map(d => d._id)
    : []

  return apiCaller
    .withAuth(API.KEYS.SUBMIT_DESTINATIONS, {
      urlParams: { id: member.id },
      payload: {
        add: destinations.map(d => d._id),
        remove: destinationsToRemove,
        propagate: isCascade
      }
    })
    .then(
      data => {
        loadOrganization(dispatch)()

        return dispatch({
          type: ACTION_KEYS.ON_DESTINATIONS_LIST_SUBMIT_SUCCESS,
          data
        })
      },
      () =>
        dispatch({
          type: ACTION_KEYS.ON_DESTINATIONS_LIST_SUBMIT_FAILURE
        })
    )
}

export const removePath = dispatch => (path, id, isCascade = true) => {
  dispatch({
    type: ACTION_KEYS.REMOVE_PATH,
    data: path
  })

  return apiCaller
    .withAuth(API.KEYS.REMOVE_PATH, {
      payload: {
        remove: [path._id],
        propagate: isCascade
      },
      urlParams: { id }
    })
    .then(
      response => {
        dispatch({
          type: ACTION_KEYS.ON_REMOVE_PATH_SUCCESS,
          data: {
            response,
            path
          }
        })
        loadOrganization(dispatch)()
      },
      data =>
        dispatch({
          type: ACTION_KEYS.ON_REMOVE_PATH_FAILURE,
          data
        })
    )
}

export const removePathOnTreeView = dispatch => (path, id, isCascade = false) =>
  apiCaller
    .withAuth(API.KEYS.REMOVE_PATH, {
      payload: {
        remove: [path._id],
        propagate: isCascade
      },
      urlParams: { id }
    })
    .then(() => {
      loadOrganization(dispatch)()
    })

export const addPaths = dispatch => (paths, id, isCascade = true) => {
  dispatch({
    type: ACTION_KEYS.SUBMIT_PATHS_LIST
  })

  return apiCaller
    .withAuth(API.KEYS.SUBMIT_PATHS, {
      urlParams: { id },
      payload: {
        add: paths,
        propagate: isCascade
      }
    })
    .then(
      data => {
        dispatch({
          type: ACTION_KEYS.ON_PATHS_LIST_SUBMIT_SUCCESS,
          data
        })

        loadOrganization(dispatch)()
      },
      () =>
        dispatch({
          type: ACTION_KEYS.ON_PATHS_LIST_SUBMIT_FAILURE
        })
    )
}

export const selectPath = dispatch => path =>
  dispatch({
    type: ACTION_KEYS.SELECT_PATH,
    data: path
  })

export const addPathsWithoutCascade = dispatch => (paths, id) =>
  addPaths(dispatch)(paths, id, false)

export const openFirstDestinationSelectModal = dispatch => () =>
  dispatch({
    type: ACTION_KEYS.OPEN_FIRST_DESTINATION_SELECT_MODAL
  })
export const closeFirstDestinationSelectModal = dispatch => () =>
  dispatch({
    type: ACTION_KEYS.CLOSE_FIRST_DESTINATION_SELECT_MODAL
  })

export const openSuggestedPathsDisclaimerModal = dispatch => () =>
  dispatch({
    type: ACTION_KEYS.OPEN_SUGGESTED_PATHS_DISCLAIMER_MODAL
  })
export const closeSuggestedPathsDisclaimerModal = dispatch => () =>
  dispatch({
    type: ACTION_KEYS.CLOSE_SUGGESTED_PATHS_DISCLAIMER_MODAL
  })

export const openConfirmPathRemoveModal = dispatch => path =>
  dispatch({
    type: ACTION_KEYS.OPEN_CONFIRM_PATH_REMOVE_MODAL,
    data: path
  })
export const closeConfirmPathRemoveModal = dispatch => () =>
  dispatch({
    type: ACTION_KEYS.CLOSE_CONFIRM_PATH_REMOVE_MODAL
  })
