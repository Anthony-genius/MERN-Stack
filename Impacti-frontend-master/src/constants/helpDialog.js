import keyMirror from 'key-mirror'

const ROUTE_KEYS = keyMirror({
  ORGANIZATION: null,
  DASHBOARD: null,
  BOARD: null,
  PATHS: null,
  DEFAULT: null
})

const HELP_TEXTS = {
  ORGANIZATION:
    'Place for organization help content. Place for organization help content. Place for organization help content. Place for organization help content',
  DASHBOARD:
    'Place for dashboard help content. Place for dashboard help content. Place for dashboard help content. Place for dashboard help content',
  BOARD:
    'Place for board help content. Place for board help content. Place for board help content. Place for board help content',
  PATHS:
    'Place for path help content. Place for path help content. Place for path help content. Place for path help content',
  DEFAULT:
    'Place for default wizard help content. Place for default wizard help content. Place for default wizard help content. Place for default wizard help content'
}

const HELP_DIALOG_CONTENT = {
  organization: HELP_TEXTS[ROUTE_KEYS.ORGANIZATION],
  board: HELP_TEXTS[ROUTE_KEYS.BOARD],
  dashboard: HELP_TEXTS[ROUTE_KEYS.DASHBOARD],
  paths: HELP_TEXTS[ROUTE_KEYS.PATHS],
  default: HELP_TEXTS[ROUTE_KEYS.DEFAULT]
}

export default HELP_DIALOG_CONTENT
