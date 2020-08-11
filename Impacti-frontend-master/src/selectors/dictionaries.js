import { dictionaryTTL } from 'constants/dictionaries'

export const areDictionariesLoaded = state => {
  const isStillLoadingSomeDictionaries = Object.values(
    state.dictionaries.loadingStateLookup
  ).reduce((e, acc) => e || acc, false)

  const hasTTLExpired = Date.now() - state.dictionaries.loadedAt > dictionaryTTL

  return !(isStillLoadingSomeDictionaries || hasTTLExpired)
}
