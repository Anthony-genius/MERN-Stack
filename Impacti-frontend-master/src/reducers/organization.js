import KEYS from 'constants/actionKeys/organizations'

const defaultState = {
  paths: [],
  children: [],
  id: null,
  isRemovingMember: false,
  hasRemovingMemberErrorOccurred: false,
  isFetchingMember: false,
  hasFetchingMemberErrorOccurred: false
}

const addNewMemberUnderParent = (id, member) => root =>
  root.id === id
    ? Object.assign({}, root, {
        children: [
          ...root.children,
          Object.assign({}, root, member, { parent: root })
        ],
        childrenVisible: true
      })
    : Object.assign({}, root, {
        children: root.children.map(e => addNewMemberUnderParent(id, member)(e))
      })

const removeElementById = id => root =>
  Object.assign({}, root, {
    children: Array.isArray(root.children)
      ? root.children
          .filter(e => e.id !== id)
          .map(e => removeElementById(id)(e))
      : root.children
  })

const setSubmitted = (newNode, id) => root => {
  if (root.id === id) {
    return newNode
  }

  return root.children && root.children.length > 0
    ? Object.assign({}, root, {
        children: root.children.map(e => setSubmitted(newNode, id)(e))
      })
    : root
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case 'ORGANIZATION_LOAD': {
      return Object.assign({}, action.data, { childrenVisible: true })
    }
    case 'ADD_EMPTY_MEMBER': {
      return addNewMemberUnderParent(action.member.parent, action.member)(state)
    }
    case KEYS.REMOVE_EDITED_NODE: {
      return removeElementById(action.id)(state)
    }
    case KEYS.SUBMIT_MEMBER: {
      return {
        ...state,
        isFetchingMember: true,
        hasFetchingMemberErrorOccurred: false
      }
    }
    case KEYS.ON_MEMBER_FETCH_SUCCESS: {
      return setSubmitted(action.data, action.id)({
        ...state,
        isFetchingMember: false
      })
    }
    case KEYS.ON_MEMBER_FETCH_FAILURE: {
      return {
        ...state,
        isFetchingMember: false,
        hasFetchingMemberErrorOccurred: true
      }
    }
    case KEYS.REMOVE_MEMBER: {
      return {
        ...state,
        isRemovingMember: true,
        hasRemovingMemberErrorOccurred: false
      }
    }
    case KEYS.ON_MEMBER_REMOVE_SUCCESS: {
      return removeElementById(action.id)({
        ...state,
        isRemovingMember: false
      })
    }
    case KEYS.ON_MEMBER_REMOVE_FAILURE: {
      return removeElementById(action.id)({
        ...state,
        isRemovingMember: false,
        hasRemovingMemberErrorOccurred: true
      })
    }
    default:
      return state
  }
}
