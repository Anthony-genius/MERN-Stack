export function fetchCountries() {
  return dispatch => {
    dispatch(fetchCountriesBegin())
    return fetch('/assessment')
      .then(handleErrors)
      .then(res => res.json())
      .then(json => {
        dispatch(fetchCountriesSuccess(json.countries))
        return json.countries
      })
      .catch(error => dispatch(fetchCountriesFailure(error)))
  }
}
// Handle HTTP errors since fetch won't.
function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText)
  }
  return response
}
export const FETCH_COUNTRIES_BEGIN = 'FETCH_COUNTRIES_BEGIN'
export const FETCH_COUNTRIES_SUCCESS = 'FETCH_COUNTRIES_SUCCESS'
export const FETCH_COUNTRIES_FAILURE = 'FETCH_COUNTRIES_FAILURE'

export const fetchCountriesBegin = () => ({
  type: FETCH_COUNTRIES_BEGIN
})

export const fetchCountriesSuccess = countries => ({
  type: FETCH_COUNTRIES_SUCCESS,
  payload: { countries }
})

export const fetchCountriesFailure = error => ({
  type: FETCH_COUNTRIES_FAILURE,
  payload: { error }
})
