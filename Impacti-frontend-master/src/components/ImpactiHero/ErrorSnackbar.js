import React from 'react'
import PropTypes from 'prop-types'
import Snackbar from '@material-ui/core/Snackbar'

class ErrorSnackbar extends React.Component {
  render() {
    const { open, errorText, handleClose } = this.props

    return (
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        ContentProps={{
          'aria-describedby': 'message-id'
        }}
        message={<span id="message-id">{errorText}</span>}
      />
    )
  }
}

ErrorSnackbar.propTypes = {
  open: PropTypes.bool.isRequired,
  errorText: PropTypes.string,
  handleClose: PropTypes.func.isRequired
}

export default ErrorSnackbar
