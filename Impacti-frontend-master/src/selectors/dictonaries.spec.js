import { expect } from 'chai'
import Selector from './dictionaries'
import { dictionaryTTL } from 'constants/dictionaries'

describe('Selectors/Dictionaries', () => {
  describe('areDictionariesLoaded', () => {
    it('returns false if at least one dictionary is not yet loaded', () => {
      const state = {
        dictionaries: {
          loadingStateLookup: {
            currency: true,
            country: false,
            destination: true,
            path: false
          },
          loadedAt: Date.now()
        }
      }
      expect(Selector.areDictionariesLoaded(state)).to.equal(false)
    })

    it('returns true if all dictionaries are loaded, and loadedAt time is reasonable', () => {
      const state = {
        dictionaries: {
          loadingStateLookup: {
            currency: false,
            country: false,
            destination: false,
            path: false
          },
          loadedAt: Date.now()
        }
      }
      expect(Selector.areDictionariesLoaded(state)).to.equal(true)
    })

    it('returns false if all dictionaries are loaded, but loadedAt time is not reasonable at all', () => {
      const state = {
        dictionaries: {
          loadingStateLookup: {
            currency: false,
            country: false,
            destination: false,
            path: false
          },
          loadedAt: Date.now() - 42 * dictionaryTTL
        }
      }
      expect(Selector.areDictionariesLoaded(state)).to.equal(false)
    })

    it('returns false if at least one dictionary is not yet loaded and loadedAt time is quite outdated', () => {
      const state = {
        dictionaries: {
          loadingStateLookup: {
            currency: true,
            country: false,
            destination: true,
            path: false
          },
          loadedAt: Date.now() - 42 * dictionaryTTL
        }
      }
      expect(Selector.areDictionariesLoaded(state)).to.equal(false)
    })
  })
})
