import KEYS from 'constants/actionKeys/dashboard'

const initialState = {
  formFields: [],
  isLoadingData: false,
  hasLoadingDataFailureOccurred: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case KEYS.FORM_FIELDS_LOAD:
      return {
        ...state,
        formFields: action.data
      }
    case KEYS.FORM_FIELD_CREATE:
      return {
        ...state,
        formFields: [action.data, ...state.formFields]
      }
    case KEYS.FORM_FIELD_DELETE:
      return {
        ...state,
        formFields: [...action.data.data]
      }
    default:
      return state
  }
}
