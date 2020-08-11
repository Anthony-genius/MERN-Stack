import keyMirror from 'key-mirror'

const KEYS = keyMirror({
  TAGS_LOAD: null,
  TAGS_SEARCH: null,
  TRENDING_TAGS_LOAD: null,
  FOLLOWED_TAGS_SAVE: null,
  FOLLOWED_TAGS_SAVE_ID: null,
  FOLLOWED_TAGS_LOAD: null,
  FOLLOWED_TAGS_DELETE: null,
  FOLLOWED_TAGS_EDIT: null,
  POSTS_LOAD: null,
  POST_CREATE: null,
  POST_DELETE: null,
  POST_UPDATE: null,
  POST_LIKE_TOGGLE: null,
  FAVORITES_LOAD: null,
  FAVORITE_CREATE: null,
  FAVORITE_DELETE: null,
  COMMENTS_LOAD: null,
  COMMENT_CREATE: null,
  FORM_FIELDS_LOAD: null,
  FORM_FIELD_CREATE: null,
  FORM_FIELD_DELETE: null
})

export default KEYS
