import ACTION_KEYS from 'constants/actionKeys/dashboard'
import API from 'constants/api'
import apiCaller from './apiCaller'

export const loadPosts = dispatch => () => {
  apiCaller.withAuth(API.KEYS.GET_ALL_POSTS, {}).then(data => {
    dispatch({
      type: ACTION_KEYS.POSTS_LOAD,
      data
    })
  })
}

export const addPost = dispatch => post => {
  apiCaller.withAuth(API.KEYS.ADD_POST, { payload: post }).then(data =>
    dispatch({
      type: ACTION_KEYS.POST_CREATE,
      data
    })
  )
}

export const deletePost = dispatch => post => {
  apiCaller
    .withAuth(API.KEYS.DELETE_POST, {
      urlParams: { id: post }
    })
    .then(
      loadPosts(data =>
        dispatch({
          type: ACTION_KEYS.POST_DELETE,
          data
        })
      )
    )
}

export const updatePost = dispatch => post => {
  apiCaller
    .withAuth(API.KEYS.UPDATE_POST, {
      urlParams: { id: post.postId },
      payload: post
    })
    .then(data =>
      dispatch({
        type: ACTION_KEYS.POST_UPDATE,
        data
      })
    )
}

export const togglePostLike = dispatch => (postId, userId) => {
  apiCaller.withAuth(API.KEYS.TOGGLE_LIKE_POST, {
    urlParams: { id: postId }
  })
  dispatch({
    type: ACTION_KEYS.POST_LIKE_TOGGLE,
    data: { postId, userId }
  })
}

export const loadTrendingTags = dispatch => () => {
  apiCaller.withAuth(API.KEYS.GET_TRENDING_TAGS, {}).then(data => {
    dispatch({
      type: ACTION_KEYS.TRENDING_TAGS_LOAD,
      data
    })
  })
}
