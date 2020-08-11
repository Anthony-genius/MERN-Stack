import KEYS from 'constants/actionKeys/widgets/progressOnYourJourney'
import apiCaller from '../apiCaller'
import API from 'constants/api'

export const loadProgressJourneyData = dispatch => (member, path) => {
  dispatch({
    type: KEYS.LOAD_PROGRESS_JOURNEY_DATA
  })
  apiCaller
    .withAuth(API.KEYS.GET_JOURNEY_PROGRESS, {
      urlParams: { member, path }
    })
    .then(
      ({ data }) =>
        dispatch({
          type: KEYS.ON_LOAD_PROGRESS_JOURNEY_DATA_SUCCESS,
          data
        }),
      () =>
        dispatch({
          type: KEYS.ON_LOAD_PROGRESS_JOURNEY_DATA_FAILURE
        })
    )
}
