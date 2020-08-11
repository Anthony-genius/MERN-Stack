import lastlySavedUrl from './lastlySavedUri'

const listeners = [lastlySavedUrl]

const signUpListeners = store => listeners.map(listener => listener(store))

export default signUpListeners
