import KEYS from 'constants/actionKeys/organizations'

const defaultState = []

export default (state = defaultState, action) => {
  switch (action.type) {
    case KEYS.TOGGLE_CHILDREN_VISIBILITY: {
      return state.find(e => e.id === action.id)
        ? state.map(
            a =>
              a.id === action.id
                ? Object.assign({}, a, { childrenVisible: !a.childrenVisible })
                : a
          )
        : [...state, { id: action.id, childrenVisible: true }]
    }
    case KEYS.TOGGLE_EDIT_MEMBER_NODE: {
      return state.find(e => e.id === action.id)
        ? state.map(
            a =>
              a.id === action.id
                ? Object.assign({}, a, { edited: !a.edited })
                : a
          )
        : [...state, { id: action.id, edited: true }]
    }

    case 'ADD_EMPTY_MEMBER': {
      const temp = state.find(e => e.id === action.member.parent)
        ? state.map(
            a =>
              a.id === action.member.parent
                ? Object.assign({}, a, { childrenVisible: true })
                : a
          )
        : [...state, { id: action.member.parent, childrenVisible: true }]

      return [...temp, { id: action.member.id, edited: true }]
    }
    case 'ORGANIZATION_LOAD': {
      return state.find(e => e.id === action.data.id)
        ? state.map(
            a =>
              a.id === action.data.id
                ? Object.assign({}, a, { childrenVisible: true })
                : a
          )
        : [...state, { id: action.data.id, childrenVisible: true }]
    }
    case KEYS.ON_MEMBER_FETCH_SUCCESS: {
      return state.map(
        e => (e.id === action.id ? Object.assign({}, e, { edited: false }) : e)
      )
    }
    default: {
      return state
    }
  }
}
