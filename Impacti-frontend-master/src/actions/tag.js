import ACTION_KEYS from 'constants/actionKeys/dashboard'
import API from 'constants/api'
import apiCaller from './apiCaller'

export const loadTags = dispatch => () => {
  apiCaller.withAuth(API.KEYS.GET_ALL_DEFAULT_TAGS, {}).then(data => {
    dispatch({
      type: ACTION_KEYS.TAGS_LOAD,
      data
    })
  })
}

export const searchForTags = dispatch => search => {
  apiCaller
    .withAuth(API.KEYS.SEARCH_TAGS, {
      urlParams: { search }
    })
    .then(data => {
      dispatch({
        type: ACTION_KEYS.TAGS_SEARCH,
        data
      })
    })
}

export const loadFollowedTags = dispatch => organizationId => {
  return apiCaller
    .withAuth(API.KEYS.GET_FOLLOWED_TAGS, {
      urlParams: { organizationId }
    })
    .then(data => {
      dispatch({
        type: ACTION_KEYS.FOLLOWED_TAGS_LOAD,
        data
      })
    })
}

export const saveFollowedTags = dispatch => tags => {
  const tempId = (() => {
    let arr = new Uint8Array(32 / 2)
    window.crypto.getRandomValues(arr)
    return Array.from(arr, dec => '0' + dec.toString(32)).join('')
  })()
  dispatch({ type: ACTION_KEYS.FOLLOWED_TAGS_SAVE, data: { tags, tempId } })

  apiCaller
    .withAuth(API.KEYS.SAVE_FOLLOWED_TAGS, { payload: { tags } })
    .then(data => {
      dispatch({
        type: ACTION_KEYS.FOLLOWED_TAGS_SAVE_ID,
        data: { tempId, _id: data._id }
      })
    })
}

export const deleteFollowedTags = dispatch => tagGroupId => {
  apiCaller.withAuth(API.KEYS.DELETE_FOLLOWED_TAGS, {
    urlParams: { id: tagGroupId }
  })
  dispatch({ type: ACTION_KEYS.FOLLOWED_TAGS_DELETE, data: tagGroupId })
}

export const editFollowedTags = dispatch => ({ tagGroupId, tags }) => {
  apiCaller.withAuth(API.KEYS.EDIT_FOLLOWED_TAGS, {
    urlParams: { id: tagGroupId },
    payload: { tags }
  })
  dispatch({ type: ACTION_KEYS.FOLLOWED_TAGS_EDIT, data: { tagGroupId, tags } })
}
