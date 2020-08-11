import ACTION_KEYS from 'constants/actionKeys/dashboard'
import API from 'constants/api'
import apiCaller from './apiCaller'

export const loadComments = dispatch => () => {
  apiCaller.withAuth(API.KEYS.GET_ALL_COMMENTS, {}).then(data =>
    dispatch({
      type: ACTION_KEYS.COMMENTS_LOAD,
      data
    })
  )
}

export const addComment = dispatch => comment => {
  apiCaller.withAuth(API.KEYS.ADD_COMMENT, { payload: comment }).then(data =>
    dispatch({
      type: ACTION_KEYS.COMMENT_CREATE,
      data
    })
  )
}
