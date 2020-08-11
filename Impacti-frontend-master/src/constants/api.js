import keyMirror from 'key-mirror'
import DICTIONARIES from './dictionaries'

const BASE_URL = process.env.REACT_APP_API_BASE_URL // eslint-disable-line

const KEYS = keyMirror({
  FETCH_DESTINATIONS: null,
  SUBMIT_DESTINATIONS: null,
  FETCH_PATHS: null,
  SUBMIT_MEMBER: null,
  GET_MEMBER: null,
  GET_ALL_MEMBERS: null,
  UPDATE_MEMBER: null,
  CREATE_EMPTY_USER_AND_MEMBER: null,
  CREATE_STATE: null,
  UPDATE_STATE: null,
  GET_STATE: null,
  REMOVE_MEMBER: null,
  REMOVE_PATH: null,
  SUBMIT_PATHS: null,
  LOGIN: null,
  SIGN_UP: null,
  UPDATE_USER: null,
  GET_AUTH: null,
  EXTEND_TOKEN: null,
  RESET_PASSWORD: null,
  UPDATE_PASSWORD: null,
  GET_STORAGE: null,
  GET_ORGANIZATION: null,
  REMEMBER_URI: null,
  GET_TAB_DEFINITIONS: null,
  GET_JOURNEY_PROGRESS: null,
  GET_ALL_POSTS: null,
  ADD_POST: null,
  DELETE_POST: null,
  UPDATE_POST: null,
  TOGGLE_LIKE_POST: null,
  GET_TRENDING_TAGS: null,
  GET_ALL_TAGS: null,
  GET_ALL_DEFAULT_TAGS: null,
  SAVE_FOLLOWED_TAGS: null,
  GET_FOLLOWED_TAGS: null,
  DELETE_FOLLOWED_TAGS: null,
  EDIT_FOLLOWED_TAGS: null,
  SEARCH_TAGS: null,
  GET_ALL_FAVORITES: null,
  ADD_FAVORITE: null,
  REMOVE_FAVORITE: null,
  GET_ALL_COMMENTS: null,
  ADD_COMMENT: null,
  GET_ALL_FORM_FIELDS: null,
  ADD_FORM_FIELD: null,
  DELETE_FORM_FIELD: null
})

const METHODS = keyMirror({
  GET: null,
  POST: null,
  PUT: null,
  PATCH: null,
  DELETE: null
})

const ENDPOINTS = {
  [KEYS.FETCH_DESTINATIONS]: {
    method: METHODS.GET,
    getUrl() {
      return `${BASE_URL}/api/external/dictionaries?type=${
        DICTIONARIES.DESTINATION
      }`
    }
  },
  [KEYS.SUBMIT_DESTINATIONS]: {
    method: METHODS.PATCH,
    getUrl(p = {}) {
      return `${BASE_URL}/api/internal/member/${p.id}/destination`
    }
  },
  [KEYS.FETCH_PATHS]: {
    method: METHODS.GET,
    getUrl() {
      return `${BASE_URL}/api/external/dictionaries?type=${DICTIONARIES.PATH}`
    }
  },
  [KEYS.SUBMIT_MEMBER]: {
    method: METHODS.POST,
    getUrl() {
      return `${BASE_URL}/api/internal/member`
    }
  },
  [KEYS.GET_MEMBER]: {
    method: METHODS.GET,
    getUrl(p = {}) {
      return `${BASE_URL}/api/internal/member/${p.id}`
    }
  },
  [KEYS.GET_ALL_MEMBERS]: {
    method: METHODS.GET,
    getUrl() {
      return `${BASE_URL}/api/internal/member`
    }
  },
  [KEYS.UPDATE_MEMBER]: {
    method: METHODS.POST,
    getUrl(p = {}) {
      return `${BASE_URL}/api/internal/member/${p.id}`
    }
  },
  [KEYS.CREATE_EMPTY_USER_AND_MEMBER]: {
    method: METHODS.POST,
    getUrl() {
      return `${BASE_URL}/api/auth/empty`
    }
  },
  [KEYS.CREATE_STATE]: {
    method: METHODS.POST,
    getUrl() {
      return `${BASE_URL}/api/internal/me/state`
    }
  },
  [KEYS.UPDATE_STATE]: {
    method: METHODS.POST,
    getUrl(p = {}) {
      return `${BASE_URL}/api/internal/me/state/${p.id}`
    }
  },
  [KEYS.GET_STATE]: {
    method: METHODS.GET,
    getUrl(p = {}) {
      return `${BASE_URL}/api/internal/me/state/${p.id}`
    }
  },
  [KEYS.REMOVE_MEMBER]: {
    method: METHODS.DELETE,
    getUrl(p = {}) {
      return `${BASE_URL}/api/internal/member/${p.id}`
    }
  },
  [KEYS.REMOVE_PATH]: {
    method: METHODS.PATCH,
    getUrl(p = {}) {
      return `${BASE_URL}/api/internal/member/${p.id}/path`
    }
  },
  [KEYS.SUBMIT_PATHS]: {
    method: METHODS.PATCH,
    getUrl(p = {}) {
      return `${BASE_URL}/api/internal/member/${p.id}/path`
    }
  },
  [KEYS.GET_SUGGESTED_PATHS]: {
    method: METHODS.GET,
    getUrl(p = {}) {
      return `${BASE_URL}/api/internal/member/suggestions/${p.id}`
    }
  },
  [KEYS.GET_AUTH]: {
    method: METHODS.GET,
    getUrl() {
      return `${BASE_URL}/api/auth`
    }
  },
  [KEYS.LOGIN]: {
    method: METHODS.POST,
    getUrl() {
      return `${BASE_URL}/api/auth/login`
    }
  },
  [KEYS.SIGN_UP]: {
    method: METHODS.POST,
    getUrl() {
      return `${BASE_URL}/api/auth/sign-up`
    }
  },
  [KEYS.UPDATE_USER]: {
    method: METHODS.POST,
    getUrl() {
      return `${BASE_URL}/api/auth/update`
    }
  },
  [KEYS.RESET_PASSWORD]: {
    method: METHODS.POST,
    getUrl() {
      return `${BASE_URL}/api/auth/password_reset/`
    }
  },
  [KEYS.UPDATE_PASSWORD]: {
    method: METHODS.POST,
    getUrl() {
      return `${BASE_URL}/api/auth/password_reset/save`
    }
  },
  [KEYS.EXTEND_TOKEN]: {
    method: METHODS.GET,
    getUrl() {
      return `${BASE_URL}/api/auth/token/extend`
    }
  },
  [KEYS.GET_STORAGE]: {
    method: METHODS.GET,
    getUrl() {
      return `${BASE_URL}/api/internal/me/storage`
    }
  },
  [KEYS.GET_ORGANIZATION]: {
    method: METHODS.GET,
    getUrl() {
      return `${BASE_URL}/api/internal/organization`
    }
  },
  [KEYS.REMEMBER_URI]: {
    method: METHODS.PATCH,
    getUrl() {
      return `${BASE_URL}/api/internal/me/storage`
    }
  },
  [KEYS.GET_TAB_DEFINITIONS]: {
    method: METHODS.GET,
    getUrl() {
      return `${BASE_URL}/api/internal/dictionaries/widgets`
    }
  },
  [KEYS.GET_JOURNEY_PROGRESS]: {
    method: METHODS.GET,
    getUrl(p = {}) {
      return p.path
        ? `${BASE_URL}/api/internal/dashboard/widgets/journey_progress?member=${
            p.member
          }&path=${p.path}`
        : `${BASE_URL}/api/internal/dashboard/widgets/journey_progress?member=${
            p.member
          }`
    }
  },
  [KEYS.GET_ALL_POSTS]: {
    method: METHODS.GET,
    getUrl() {
      return `${BASE_URL}/api/internal/post`
    }
  },
  [KEYS.ADD_POST]: {
    method: METHODS.POST,
    getUrl() {
      return `${BASE_URL}/api/internal/post`
    }
  },
  [KEYS.DELETE_POST]: {
    method: METHODS.DELETE,
    getUrl(p = {}) {
      return `${BASE_URL}/api/internal/post/${p.id}`
    }
  },
  [KEYS.UPDATE_POST]: {
    method: METHODS.PUT,
    getUrl(p = {}) {
      return `${BASE_URL}/api/internal/post/${p.id}`
    }
  },
  [KEYS.TOGGLE_LIKE_POST]: {
    method: METHODS.POST,
    getUrl(p = {}) {
      return `${BASE_URL}/api/internal/post/like/${p.id}`
    }
  },
  [KEYS.GET_TRENDING_TAGS]: {
    method: METHODS.GET,
    getUrl() {
      return `${BASE_URL}/api/internal/tag/trending`
    }
  },
  [KEYS.GET_ALL_TAGS]: {
    method: METHODS.GET,
    getUrl() {
      return `${BASE_URL}/api/internal/tag`
    }
  },
  [KEYS.GET_ALL_DEFAULT_TAGS]: {
    method: METHODS.GET,
    getUrl() {
      return `${BASE_URL}/api/internal/tag/default`
    }
  },
  [KEYS.SEARCH_TAGS]: {
    method: METHODS.GET,
    getUrl({ search }) {
      return `${BASE_URL}/api/internal/tag/search/${search}`
    }
  },
  [KEYS.GET_ALL_FAVORITES]: {
    method: METHODS.GET,
    getUrl() {
      return `${BASE_URL}/api/internal/favorite`
    }
  },
  [KEYS.ADD_FAVORITE]: {
    method: METHODS.POST,
    getUrl() {
      return `${BASE_URL}/api/internal/favorite`
    }
  },
  [KEYS.REMOVE_FAVORITE]: {
    method: METHODS.DELETE,
    getUrl() {
      return `${BASE_URL}/api/internal/favorite`
    }
  },
  [KEYS.GET_ALL_COMMENTS]: {
    method: METHODS.GET,
    getUrl() {
      return `${BASE_URL}/api/internal/comment`
    }
  },
  [KEYS.ADD_COMMENT]: {
    method: METHODS.POST,
    getUrl() {
      return `${BASE_URL}/api/internal/comment`
    }
  },
  [KEYS.SAVE_FOLLOWED_TAGS]: {
    method: METHODS.POST,
    getUrl() {
      return `${BASE_URL}/api/internal/tag/follow`
    }
  },
  [KEYS.GET_FOLLOWED_TAGS]: {
    method: METHODS.GET,
    getUrl({ organizationId }) {
      return `${BASE_URL}/api/internal/tag/follow/${organizationId}`
    }
  },
  [KEYS.DELETE_FOLLOWED_TAGS]: {
    method: METHODS.DELETE,
    getUrl(t = {}) {
      return `${BASE_URL}/api/internal/tag/follow/${t.id}`
    }
  },
  [KEYS.EDIT_FOLLOWED_TAGS]: {
    method: METHODS.POST,
    getUrl(t = {}) {
      return `${BASE_URL}/api/internal/tag/follow/${t.id}`
    }
  },
  [KEYS.GET_ALL_FORM_FIELDS]: {
    method: METHODS.GET,
    getUrl() {
      return `${BASE_URL}/api/internal/formField`
    }
  },
  [KEYS.ADD_FORM_FIELD]: {
    method: METHODS.POST,
    getUrl() {
      return `${BASE_URL}/api/internal/formField`
    }
  },
  [KEYS.DELETE_FORM_FIELD]: {
    method: METHODS.DELETE,
    getUrl(f = {}) {
      return `${BASE_URL}/api/internal/formField/${f.id}`
    }
  }
}

const API_CONSTANTS = {
  KEYS,
  METHODS,
  ENDPOINTS,
  BASE_URL
}

export default API_CONSTANTS
