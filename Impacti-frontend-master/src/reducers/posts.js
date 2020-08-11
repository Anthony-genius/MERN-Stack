import KEYS from 'constants/actionKeys/dashboard'

const initialState = {
  selectedTab: undefined,
  posts: [],
  isLoadingData: false,
  hasLoadingDataFailureOccurred: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case KEYS.POSTS_LOAD:
      return {
        ...state,
        posts: action.data
      }
    case KEYS.POST_CREATE:
      return {
        ...state,
        posts: [action.data, ...state.posts]
      }
    case KEYS.POST_UPDATE: {
      const { _id } = action.data
      const posts = state.posts
      const index = posts.findIndex(p => p._id === _id)

      return {
        ...state,
        posts: [
          ...posts.slice(0, index),
          action.data,
          ...posts.slice(index + 1)
        ]
      }
    }
    case KEYS.POST_DELETE:
      return {
        ...state,
        posts: [...action.data.data]
      }
    case KEYS.POST_LIKE_TOGGLE: {
      const { postId, userId } = action.data
      const posts = state.posts
      const index = posts.findIndex(p => p._id === postId)
      const oldPost = posts[index]
      const oldLike = oldPost.likes.find(like => like.owner === userId)

      const updatedLike = oldLike
        ? { ...oldLike, liked: !oldLike.liked }
        : { liked: true, owner: userId }

      const likeCount = (oldPost.likeCount += oldLike && oldLike.liked ? -1 : 1)

      const updatedPost = {
        ...oldPost,
        likes: [
          updatedLike,
          ...oldPost.likes.filter(like => like.owner !== userId)
        ],
        likeCount
      }

      return {
        ...state,
        posts: [
          ...posts.slice(0, index),
          updatedPost,
          ...posts.slice(index + 1)
        ]
      }
    }
    default:
      return state
  }
}
