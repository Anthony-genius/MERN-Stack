/* eslint-disable jsx-a11y/mouse-events-have-key-events */

import React from 'react'
import PropTypes from 'prop-types'
import Popover from '@material-ui/core/Popover'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  paper: {
    padding: '20px',
    width: '15vw',
    [theme.breakpoints.down('xs')]: {
      display: 'none'
    }
  },
  popover: {
    pointerEvents: 'none'
  }
})

class BusinessRecommendationPopover extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      open: false,
      anchorEl: null,
      click: false
    }
  }

  handlePopoverOpen = event => {
    this.setState({
      open: true,
      anchorEl: event.target
    })
  }
  handlePopoverClose = () => {
    this.setState({
      open: false,
      anchorEl: null
    })
  }

  render() {
    const { classes, popoverText, popoverQuestion, popoverClass } = this.props
    const { anchorEl, open } = this.state

    return (
      <>
        <Typography
          variant="button"
          onMouseEnter={event => this.handlePopoverOpen(event)}
          onMouseLeave={() => this.handlePopoverClose()}
          className={popoverClass}
        >
          {popoverQuestion}
        </Typography>

        <Popover
          className={classes.popover}
          classes={{ paper: classes.paper }}
          open={open}
          anchorEl={anchorEl}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          transformOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Typography>{popoverText}</Typography>
        </Popover>
      </>
    )
  }
}

BusinessRecommendationPopover.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(BusinessRecommendationPopover)
