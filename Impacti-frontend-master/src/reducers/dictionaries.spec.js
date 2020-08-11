import { expect } from 'chai'
import omit from 'lodash/omit'
import Reducer from './dictionaries'
import ACTION_KEYS from 'constants/actionKeys/dictionaries'

const COUNTRY_MOCK = [{ id: 1, code: 'GB', name: 'Great Britain' }]
const CURRENCY_MOCK = [{ id: 1, code: 'GBP', name: 'British Pound' }]

describe('Reducers/Dictionaries', () => {
  it(`Action: ${ACTION_KEYS.STARTED_DICTIONARY_LIST_LOAD}`, () => {
    const state = {
      loadingStateLookup: {
        country: false,
        currency: false
      },
      currency: CURRENCY_MOCK
    }
    const expectedState = {
      loadingStateLookup: {
        country: true,
        currency: false
      },
      currency: CURRENCY_MOCK
    }
    const action = {
      type: ACTION_KEYS.STARTED_DICTIONARY_LIST_LOAD,
      data: 'country'
    }

    expect(Reducer(state, action)).to.deep.equal(expectedState)
  })

  it(`Action: ${ACTION_KEYS.DICTIONARY_LIST_LOAD}`, () => {
    const state = {
      loadingStateLookup: {
        country: true,
        currency: false
      },
      currency: CURRENCY_MOCK
    }
    const expectedState = {
      loadingStateLookup: {
        country: false,
        currency: false
      },
      country: COUNTRY_MOCK,
      currency: CURRENCY_MOCK
    }
    const action = {
      type: ACTION_KEYS.DICTIONARY_LIST_LOAD,
      data: {
        type: 'country',
        list: COUNTRY_MOCK
      }
    }

    expect(omit(Reducer(state, action), 'loadedAt')).to.deep.equal(
      omit(expectedState, 'loadedAt')
    )
  })

  it(`Action: ${ACTION_KEYS.DICTIONARY_LIST_LOAD_FAILURE}`, () => {
    const state = {
      loadingStateLookup: {
        country: true,
        currency: false
      },
      currency: CURRENCY_MOCK
    }
    const expectedState = {
      loadingStateLookup: {
        country: false,
        currency: false
      },
      currency: CURRENCY_MOCK
    }
    const action = {
      type: ACTION_KEYS.DICTIONARY_LIST_LOAD_FAILURE,
      data: {
        type: 'country',
        list: COUNTRY_MOCK
      }
    }

    expect(omit(Reducer(state, action), 'loadedAt')).to.deep.equal(
      omit(expectedState, 'loadedAt')
    )
  })
})
