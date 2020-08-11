import keyMirror from 'key-mirror'

const DICTIONARIES = keyMirror({
  SECTOR: null,
  COUNTRY: null,
  CURRENCY: null,
  CAPACITY: null,
  ORGANIZATION_TYPE: null,
  INDUSTRY: null,
  PATH: null,
  DESTINATION: null,
  SDG: null,
  COUNTRY_SDG: null,
  DRIVER: null,
  STAKEHOLDER: null,
  BASE_ASSESSMENT_FOCUS: null
})

const DICTIONARY_TTL = 300000

export const dictionariesAsArray = Object.keys(DICTIONARIES)
export const dictionaryTTL = DICTIONARY_TTL

export default DICTIONARIES
