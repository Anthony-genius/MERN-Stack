import { push } from 'connected-react-router'

import ACTION_KEYS from 'constants/actionKeys/assessmentWizard'
import APPLICATION_CONTEXT_ACTION_KEYS from 'constants/actionKeys/applicationContext'
import API from 'constants/api'
import apiCaller from './apiCaller'
import fetch from '../actions/fetchData'

export const onExternalUrlChange = dispatch => data =>
  dispatch({
    type: ACTION_KEYS.ASSESSMENT_ON_EXTERNAL_URL_CHANGE,
    data
  })

export const loadAnonymousOrganization = dispatch => () =>
  fetch(`${API.BASE_URL}/api/external/organization`, {
    method: 'GET'
  })
    .then(res => res.json())
    .then(data =>
      dispatch({
        type: APPLICATION_CONTEXT_ACTION_KEYS.ORGANIZATION_LOAD,
        data
      })
    )

export const createEmptyUserAndMember = dispatch => () =>
  apiCaller.withoutAuth(API.KEYS.CREATE_EMPTY_USER_AND_MEMBER).then(
    data => {
      localStorage.setItem('authToken', data.token)

      return dispatch({
        type: ACTION_KEYS.CREATE_EMPTY_USER_AND_MEMBER_SUCCESS,
        data
      })
    },
    err =>
      dispatch({
        type: ACTION_KEYS.CREATE_EMPTY_USER_AND_MEMBER_FAILURE,
        err
      })
  )

export const getAllMembers = dispatch => () => {
  apiCaller.withAuth(API.KEYS.GET_ALL_MEMBERS, {}).then(
    data =>
      dispatch({
        type: ACTION_KEYS.GET_ALL_MEMBERS_SUCCESS,
        data
      }),
    err =>
      dispatch({
        type: ACTION_KEYS.GET_ALL_MEMBERS_FAILURE,
        err
      })
  )
}

export const getMember = dispatch => memberId =>
  apiCaller
    .withAuth(API.KEYS.GET_MEMBER, {
      urlParams: { id: memberId }
    })
    .then(
      data =>
        dispatch({
          type: ACTION_KEYS.GET_MEMBER_SUCCESS,
          data
        }),
      err =>
        dispatch({
          type: ACTION_KEYS.GET_MEMBER_FAILURE,
          err
        })
    )

export const updateMember = dispatch => (memberId, member) => {
  const payload = Object.assign({}, member, {
    industries: member.industries && member.industries.map(e => e._id),
    sectors: member.sectors && member.sectors.map(e => e._id),
    countries: member.countries && member.countries.map(e => e._id),
    sdgs: member.sdgs && member.sdgs.map(e => e._id),
    drivers: member.drivers && member.drivers.map(e => e._id),
    stakeholders: member.stakeholders && member.stakeholders.map(e => e._id)
  })

  return apiCaller
    .withAuth(API.KEYS.UPDATE_MEMBER, {
      urlParams: { id: memberId },
      payload
    })
    .then(
      data =>
        dispatch({
          type: ACTION_KEYS.UPDATE_MEMBER_SUCCESS,
          data
        }),
      err =>
        dispatch({
          type: ACTION_KEYS.UPDATE_MEMBER_FAILURE,
          err
        })
    )
}

export const createState = dispatch => memberId =>
  apiCaller
    .withAuth(API.KEYS.CREATE_STATE, {
      payload: { memberId }
    })
    .then(
      data =>
        dispatch({
          type: ACTION_KEYS.CREATE_STATE_SUCCESS,
          data
        }),
      err =>
        dispatch({
          type: ACTION_KEYS.CREATE_STATE_FAILURE,
          err
        })
    )

export const updateState = dispatch => (stateId, stage, step) => {
  dispatch(push(`/assessment/${stage}/${step}`))

  return apiCaller.withAuth(API.KEYS.UPDATE_STATE, {
    urlParams: { id: stateId },
    payload: {
      stage,
      step
    }
  })
}

export const getState = dispatch => stateId =>
  apiCaller.withAuth(API.KEYS.GET_STATE, {
    urlParams: { id: stateId }
  })
