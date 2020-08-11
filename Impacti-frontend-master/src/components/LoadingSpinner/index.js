import React from 'react'
import PropTypes from 'prop-types'
import CircularProgress from '@material-ui/core/CircularProgress'
import keyMirror from 'key-mirror'
import style from './style.module.css'

const STYLES = keyMirror({
  ABSOLUTE: null
})

export const SPINNER_TYPES = {
  ABSOLUTE: {
    style: STYLES.ABSOLUTE
  },
  DEFAULT: {}
}

const styles = {
  [STYLES.ABSOLUTE]: {
    inline: style.spinnerAbsolute
  }
}

const optionally = STYLE => property =>
  styles[STYLE] ? styles[STYLE][property] : null

const LoadingSpinner = props => (
  <div
    className={`${style.spinnerContainer} ${optionally(props.spinnerType.style)(
      'inline'
    )}`}
  >
    <CircularProgress size={100} />
  </div>
)

LoadingSpinner.defaultProps = {
  spinnerType: SPINNER_TYPES.DEFAULT
}

LoadingSpinner.propTypes = {
  spinnerType: PropTypes.object
}

export default LoadingSpinner
