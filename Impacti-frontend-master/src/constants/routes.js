import keyMirror from 'key-mirror'

export const ROUTE_KEYS = keyMirror({
  ORGANIZATION: null,
  ADD_FIRST_MEMBER: null,
  BOARD: null,
  PATHS_BOARD: null,
  DASHBOARD: null
  /*   ASSESSMENT: null,
  SETUP: null, */
})

export const ROUTES = {
  [ROUTE_KEYS.ORGANIZATION]: '/organization',
  [ROUTE_KEYS.ADD_FIRST_MEMBER]: '/organization/add-first-member',
  [ROUTE_KEYS.BOARD]: '/board',
  [ROUTE_KEYS.PATHS_BOARD]: '/board/paths',
  [ROUTE_KEYS.DASHBOARD]: '/dashboard'
  /*   [ROUTE_KEYS.ASSESSMENT]: '/assessment',
  [ROUTE_KEYS.SETUP]: '/assessment/setup', */
}

export const ROUTE_RANKING = [
  ROUTES[ROUTE_KEYS.ORGANIZATION],
  ROUTES[ROUTE_KEYS.ADD_FIRST_MEMBER],
  ROUTES[ROUTE_KEYS.BOARD],
  ROUTES[ROUTE_KEYS.PATHS_BOARD],
  ROUTES[ROUTE_KEYS.DASHBOARD]
  /*   ROUTES[ROUTE_KEYS.ASSESSMENT],
  ROUTES[ROUTE_KEYS.SETUP], */
]
