/* eslint-disable jsx-a11y/mouse-events-have-key-events */

import React from 'react'
import PropTypes from 'prop-types'
import Popover from '@material-ui/core/Popover'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'

const styles = {
  oppo: {
    fontSize: '26px',
    display: 'inline',
    textTransform: 'capitalize'
  },
  paper: {
    padding: '20px',
    width: '14vw'
  },
  popover: {
    top: '8% !important',
    left: '50% !important',
    zIndex: 1298
  },
  '@media screen and (max-width: 1280px)': {
    popover: {
      top: '25.5% !important',
      left: '75% !important'
    },
    paper: {
      width: '18vw'
    }
  },
  '@media screen and (max-width: 768px)': {
    oppo: {
      fontSize: 16,
      padding: 5
    }
  },
  '@media screen and (max-width: 800px)': {
    popover: {
      left: '0% !important'
    },
    paper: {
      width: '90vw'
    }
  },
  '@media screen and (min-width: 800px)': {
    popover: {
      left: '0% !important',
      top: '-4.5 % !important'
    },
    paper: {
      width: '90vw'
    }
  },
  '@media screen and (min-width: 1024px)': {
    popover: {
      top: '-25.5% !important',
      left: '55% !important'
    },
    paper: {
      width: '21vw'
    }
  },
  '@media screen and (min-width: 1280px)': {
    popover: {
      left: '45% !important'
    }
  },
  '@media screen and (min-width: 1600px)': {
    popover: {
      left: '40% !important'
    }
  },
  '@media screen and (min-width: 1920px)': {
    popover: {
      left: '35% !important'
    }
  }
}

class GoalsPopover extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      open: false,
      anchorEl: null
    }
    this.handlePopoverOpen = this.handlePopoverOpen.bind(this)
    this.handlePopoverClose = this.handlePopoverClose.bind(this)
  }

  handlePopoverOpen = e => {
    this.setState({
      anchorEl: e.target
    })
  }
  handlePopoverClose() {
    this.setState({
      open: false,
      anchorEl: null
    })
  }

  render() {
    const { classes } = this.props
    const { anchorEl } = this.state
    const open = !!anchorEl

    return (
      <span>
        <Typography
          variant="button"
          onMouseOver={this.handlePopoverOpen}
          className={classes.oppo}
        >
          Sustainable Development Goals
        </Typography>
        <Popover
          className={classes.popover}
          onMouseDown={this.handlePopoverClose}
          classes={{ paper: classes.paper }}
          open={open}
          anchorEl={anchorEl}
        >
          <Typography>
            <a
              href="http://businesscommission.org/news/release-sustainable-business-can-unlock-at-least-us-12-trillion-in-new-market-value-and-repair-economic-system"
              target="_blank"
              rel="noopener noreferrer"
            >
              The SDGs are expected to open up over{' '}
              <strong>$12 trillion</strong> of new market opportunities and
              create <strong>380 million new jobs</strong> by 2030.
            </a>
          </Typography>
        </Popover>
      </span>
    )
  }
}

GoalsPopover.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(GoalsPopover)
