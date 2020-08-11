import { ROUTE_RANKING } from 'constants/routes'

export const isUserAuthenticated = () => !!localStorage.getItem('authToken')

export const getTheLatestUri = (next = '', current = '') => {
  if (!ROUTE_RANKING.includes(current)) {
    return ROUTE_RANKING.includes(next) ? next : ROUTE_RANKING[0]
  }

  if (!ROUTE_RANKING.includes(next)) {
    return current
  }

  if (ROUTE_RANKING.indexOf(next) > ROUTE_RANKING.indexOf(current)) {
    return next
  }

  return current
}
