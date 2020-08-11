import ACTION_KEYS from 'constants/actionKeys/assessmentWizard'

const initialState = {
  members: [],
  pairs: [],
  currentName: '',
  paths: [],
  children: [],
  id: null,
  isFetchingMember: false,
  hasFetchingMemberErrorOccurred: false,
  name: '',
  description: '',
  mission: '',
  sectors: [],
  countries: [],
  industries: [],
  types: [],
  capacity: {},
  currency: {},
  drivers: {},
  stakeholders: {},
  ambitions: {},
  baseAssessmentAnswers: [],
  customChallenges: [],
  sdgs: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ACTION_KEYS.ASSESSMENT_INITIALIZE_HASHES_LOOKUP: {
      return {
        ...state,
        pairs: action.data,
        currentName: action.data[0] ? action.data[0].name : ''
      }
    }

    case ACTION_KEYS.ASSESSMENT_ON_EXTERNAL_URL_CHANGE: {
      const pair = state.pairs.find(el => el.hash === action.data)

      return {
        ...state,
        currentName: pair ? pair.name : state.currentName
      }
    }

    case ACTION_KEYS.CREATE_EMPTY_USER_AND_MEMBER_SUCCESS: {
      return {
        ...state,
        memberId: action.data.user.organization.rootMember,
        stateId: action.data.user.states[0]
      }
    }

    case ACTION_KEYS.GET_ALL_MEMBERS_SUCCESS: {
      return {
        ...state,
        members: action.data
      }
    }

    case ACTION_KEYS.GET_MEMBER_SUCCESS: {
      return {
        ...state,
        ...action.data
      }
    }

    case ACTION_KEYS.UPDATE_MEMBER_SUCCESS: {
      return {
        ...state,
        ...action.data
      }
    }
    default: {
      return state
    }
  }
}
