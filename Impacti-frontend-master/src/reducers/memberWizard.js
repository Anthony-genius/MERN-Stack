const initialState = {
  name: '',
  sectors: [],
  countries: [],
  industries: [],
  types: [],
  capacity: {},
  workersNumber: null,
  currency: {},
  drivers: {},
  stakeholders: {},
  ambitions: {},
  sdgs: {}
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SET_NAME':
      return Object.assign({}, state, { name: action.name })
    case 'SET_CAPACITY':
      return Object.assign({}, state, { capacity: action.data })
    case 'SET_WORKERS_NUMBER':
      return Object.assign({}, state, { workersNumber: action.number })
    case 'SET_CURRENCY':
      return Object.assign({}, state, { currency: action.currency })
    case 'SET_ORGANIZATION_COUNTRIES':
      return Object.assign({}, state, {
        countries: action.data
      })
    case 'SET_ORGANIZATION_SECTORS':
      return Object.assign({}, state, {
        industries: action.data.industries,
        sectors: action.data.sectors
      })
    case 'SET_ORGANIZATION_DRIVERS':
      return Object.assign({}, state, {
        drivers: action.data
      })
    case 'SET_ORGANIZATION_STAKEHOLDERS':
      return Object.assign({}, state, {
        stakeholders: action.data
      })
    case 'SET_ORGANIZATION_AMBITIONS':
      return Object.assign({}, state, {
        ambitions: action.data
      })
    case 'SET_ORGANIZATION_TYPES':
      return Object.assign({}, state, {
        types: action.data
      })
    case 'SET_ORGANIZATION_CUSTOM_SDGS':
      return Object.assign({}, state, {
        sdgs: action.data
      })
    case 'SET_INDUSTRIES_AND_SECTORS':
      return Object.assign({}, state, {
        industries: action.data.industries,
        sectors: action.data.sectors
      })

    default:
      return state
  }
}
