import ACTION_KEYS from 'constants/actionKeys/dashboard'
import API from 'constants/api'
import apiCaller from './apiCaller'

export const loadFavorites = dispatch => () => {
  apiCaller.withAuth(API.KEYS.GET_ALL_FAVORITES, {}).then(data =>
    dispatch({
      type: ACTION_KEYS.FAVORITES_LOAD,
      data
    })
  )
}

export const addFavorite = dispatch => favorite => {
  apiCaller.withAuth(API.KEYS.ADD_FAVORITE, { payload: favorite }).then(data =>
    dispatch({
      type: ACTION_KEYS.FAVORITE_CREATE,
      data
    })
  )
}

export const removeFavorite = dispatch => favorite => {
  apiCaller
    .withAuth(API.KEYS.REMOVE_FAVORITE, { payload: favorite })
    .then(data =>
      dispatch({
        type: ACTION_KEYS.FAVORITE_DELETE,
        data
      })
    )
}
