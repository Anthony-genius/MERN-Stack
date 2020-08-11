import { combineReducers } from 'redux'

import progressOnYourJourney from './progressOnYourJourney'
import commitmentTracker from './commitmentTracker'

export default combineReducers({
  progressOnYourJourney,
  commitmentTracker
})
