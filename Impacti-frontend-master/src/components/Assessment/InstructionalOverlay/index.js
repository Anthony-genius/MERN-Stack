import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Dialog from '@material-ui/core/Dialog'

const styles = theme => ({
  topContainer: {
    maxWidth: '1440px',
    margin: '0 auto'
  },
  container: {
    maxWidth: '95%',
    margin: '0 auto'
  }
})

class InstructionalOverlay extends Component {
  componentDidMount = () => {
    window.innerWidth < 420 && window.innerHeight < 824
      ? window.scrollTo(0, this.props.mobile)
      : window.scrollTo(0, 150)
  }
  render() {
    const { classes, open, handleClose } = this.props
    return (
      <Dialog
        open={open}
        scroll="paper"
        onClick={handleClose}
        className={classes.topContainer}
      >
        <div className={classes.container} />
      </Dialog>
    )
  }
}

InstructionalOverlay.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(InstructionalOverlay)
