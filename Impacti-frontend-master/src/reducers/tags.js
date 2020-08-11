import { uniqBy } from 'lodash'
import KEYS from 'constants/actionKeys/dashboard'

const initialState = {
  tags: [],
  trendingTags: [],
  followedTags: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case KEYS.TAGS_LOAD:
      return {
        ...state,
        tags: uniqBy([...state.tags, ...action.data], 'label')
      }
    case KEYS.TAGS_SEARCH:
      return {
        ...state,
        tags: uniqBy([...state.tags, ...action.data], 'label')
      }
    case KEYS.TRENDING_TAGS_LOAD:
      return {
        ...state,
        trendingTags: action.data
      }
    case KEYS.FOLLOWED_TAGS_LOAD:
      return { ...state, followedTags: action.data }
    case KEYS.FOLLOWED_TAGS_SAVE: {
      const { tags, tempId } = action.data
      return {
        ...state,
        followedTags: [{ tags, tempId }, ...state.followedTags]
      }
    }
    case KEYS.FOLLOWED_TAGS_SAVE_ID: {
      const { _id, tempId } = action.data
      return {
        ...state,
        followedTags: state.followedTags.map(i => {
          if (i.tempId && tempId === i.tempId) {
            return { ...i, _id }
          } else {
            return i
          }
        })
      }
    }
    case KEYS.FOLLOWED_TAGS_EDIT:
      const { tagGroupId, tags } = action.data
      const followedTags = state.followedTags
      const index = followedTags.findIndex(i => i._id === tagGroupId)
      const updatedTagGrouo = { ...followedTags[index], tags }
      return {
        ...state,
        followedTags: [
          ...followedTags.slice(0, index),
          updatedTagGrouo,
          ...followedTags.slice(index + 1)
        ]
      }
    case KEYS.FOLLOWED_TAGS_DELETE:
      return {
        ...state,
        followedTags: state.followedTags.filter(t => t._id !== action.data)
      }
    default:
      return state
  }
}
