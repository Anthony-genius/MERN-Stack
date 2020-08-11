import ACTION_KEYS from 'constants/actionKeys/organizations'
import APPLICATION_CONTEXT_ACTION_KEYS from 'constants/actionKeys/applicationContext'
import API from 'constants/api'
import fetch from './fetchData'
import apiCaller from './apiCaller'

const emptyMember = parent =>
  Object.assign(
    {},
    {
      parent,
      children: [],
      name: null,
      workersNumber: null,
      capacity: null,
      childrenVisible: false,
      edited: true,
      id: parent + Math.random(),
      selectedMember: null
    }
  )

export const loadOrganization = dispatch => () =>
  apiCaller.withAuth(API.KEYS.GET_ORGANIZATION, {}).then(data =>
    dispatch({
      type: APPLICATION_CONTEXT_ACTION_KEYS.ORGANIZATION_LOAD,
      data
    })
  )

export const toggleChildrenVisibility = dispatch => (event, id) => {
  event.stopPropagation()
  dispatch({
    type: ACTION_KEYS.TOGGLE_CHILDREN_VISIBILITY,
    id
  })
}

export const addNewMember = dispatch => (event, parent) => {
  event.stopPropagation()
  dispatch({
    type: ACTION_KEYS.ADD_EMPTY_MEMBER,
    member: emptyMember(parent)
  })
}

export const removeMember = dispatch => selectedMemberId => (
  event,
  id,
  parent
) => {
  event.stopPropagation()

  dispatch({
    type: ACTION_KEYS.REMOVE_MEMBER
  })

  if (selectedMemberId === id) {
    dispatch({
      type: APPLICATION_CONTEXT_ACTION_KEYS.SELECT_MEMBER,
      data: parent.id
    })
  }

  const ENDPOINT = API.ENDPOINTS[API.KEYS.REMOVE_MEMBER]

  return fetch(ENDPOINT.getUrl({ id }), {
    method: ENDPOINT.method
  })
    .then(res => {
      if (res.status >= 400 && res.status < 600) {
        throw new Error('Bad response')
      }
      return res.json()
    })
    .then(
      data =>
        dispatch({
          type: ACTION_KEYS.ON_MEMBER_REMOVE_SUCCESS,
          data,
          id
        }),
      err =>
        dispatch({
          type: ACTION_KEYS.ON_MEMBER_REMOVE_FAILURE,
          err
        })
    )
}

export const removeEdited = dispatch => id =>
  dispatch({
    type: ACTION_KEYS.REMOVE_EDITED_NODE,
    id
  })

export const toggleEditMemberMode = dispatch => event => id => {
  if (event) {
    event.stopPropagation()
  }

  dispatch({
    type: ACTION_KEYS.TOGGLE_EDIT_MEMBER_NODE,
    id
  })
}

export const putMemberAction = key => dispatch => ({ organization, id }) => {
  dispatch({
    type: ACTION_KEYS.SUBMIT_MEMBER
  })

  const payload = Object.assign({}, organization, {
    industries:
      organization.industries && organization.industries.map(e => e._id),
    sectors: organization.sectors && organization.sectors.map(e => e._id),
    countries: organization.countries && organization.countries.map(e => e._id),
    currency: organization.currency && organization.currency._id,
    types: organization.types && organization.types.map(e => e._id),
    workersNumber: parseInt(organization.workersNumber, 10),
    parent: organization.parent.id
      ? organization.parent.id
      : organization.parent._id
  })
  return apiCaller
    .withoutAuth(key, {
      urlParams: key === API.KEYS.UPDATE_MEMBER ? { id } : {},
      payload
    })
    .then(
      data =>
        dispatch({
          type: ACTION_KEYS.ON_MEMBER_FETCH_SUCCESS,
          data,
          id
        }),
      err =>
        dispatch({
          type: ACTION_KEYS.ON_MEMBER_FETCH_FAILURE,
          err
        })
    )
}

export const save = putMemberAction(API.KEYS.SUBMIT_MEMBER)
export const update = putMemberAction(API.KEYS.UPDATE_MEMBER)
