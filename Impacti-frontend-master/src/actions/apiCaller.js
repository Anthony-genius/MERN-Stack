import fetchDataAuth from './fetchDataAuth'
import fetchData from './fetchData'
import API from 'constants/api'
import { logOut } from 'actions/session'
import { store } from 'store'

const createCaller = call => (
  KEY,
  options = {
    urlParams: {},
    payload: {}
  }
) => {
  const ENDPOINT = API.ENDPOINTS[KEY]

  if (!ENDPOINT) {
    return Promise.reject('Incorrect API key')
  }

  const body = JSON.stringify(options.payload)

  return call(
    ENDPOINT.getUrl(options.urlParams),
    Object.assign(
      {},
      {
        method: ENDPOINT.method
      },
      body !== '{}' && { body }
    )
  ).then(res => {
    if (res.status >= 400 && res.status < 600) {
      return res.json().then(data => {
        const { badToken, message } = data
        if (badToken) {
          logOut(store.dispatch)({ message })
        }
        return Promise.reject(data)
      })
    }
    return res.json()
  })
}

const apiCaller = {
  withAuth: createCaller(fetchDataAuth),
  withoutAuth: createCaller(fetchData)
}

export default apiCaller
