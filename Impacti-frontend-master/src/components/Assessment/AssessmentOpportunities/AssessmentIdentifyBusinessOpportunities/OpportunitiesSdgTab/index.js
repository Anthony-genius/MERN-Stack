import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import ButtonBase from '@material-ui/core/ButtonBase'
import Tooltip from '@material-ui/core/Tooltip'

const styles = theme => ({
  mark1: {
    position: 'absolute',
    left: 100,
    bottom: 125,
    width: 250,
    background: '#1F1D1D',
    borderRadius: 0,
    padding: 15,
    fontSize: 12,
    [theme.breakpoints.down('sm')]: {
      left: -70,
      bottom: 185
    },
    [theme.breakpoints.down('xs')]: {
      bottom: 110,
      left: -100
    }
  },
  arrowBottomLeft: {
    position: 'absolute',
    transform: 'rotate(325deg)',
    top: 80,
    right: 238,
    '&::before': {
      content: '""',
      margin: 'auto',
      display: 'block',
      width: 0,
      height: 0,
      borderTop: '10px solid transparent',
      borderBottom: '10px solid transparent',
      borderRight: '70px solid #1F1D1D'
    },
    [theme.breakpoints.down('sm')]: {
      right: 0
    },
    [theme.breakpoints.down('xs')]: {
      right: 183,
      top: 85,
      transform: 'rotate(225deg)'
    }
  },
  root: {
    width: '100%',
    position: 'relative',
    overflow: 'auto'
  },
  bar: {
    width: '65vw',
    maxWidth: '935px',
    backgroundColor: '#fff',
    boxShadow: 'none'
  },
  tabContainer: {
    margin: '0 45px',
    '&:firstChild': {
      margin: '0 45px 0 0'
    }
  },
  button: {
    height: '110px',
    minWidth: '110px',
    margin: '0 25px 20px'
  },
  buttonSelected: {
    height: '110px',
    minWidth: '110px',
    margin: '0 25px 20px',
    border: '4px solid var(--primaryColor)'
  },
  sdgImage: {
    width: 100,
    height: 100
  },
  '@media screen and (max-width: 768px)': {
    button: {
      margin: '0 25px 25px'
    },
    tabContainer: {
      margin: '0 15px'
    }
  }
})

class OpportunitiesSdgTab extends React.Component {
  handleChange = event => {
    const { onChange, onClick, value } = this.props
    if (onChange) {
      onChange(event, value)
    }
    if (onClick) {
      onClick(event, value)
    }
  }
  render() {
    const {
      classes,
      sdg,
      value,
      selected,
      disabled,
      visitedSdgs,
      sdgIndex,
      index,
      open
    } = this.props
    return (
      <div
        value={value}
        role="tab"
        onClick={this.handleChange}
        aria-selected={selected}
        disabled={disabled}
        className={classes.tabContainer}
      >
        {sdgIndex === 0 && index === 0 ? (
          <Tooltip
            open={open}
            classes={{ tooltip: classes.mark1 }}
            title={
              <React.Fragment>
                Use slider to go through each SDG you prioritized. You can now
                explore specific opportunities to make impact.
                <span className={classes.arrowBottomLeft} />
              </React.Fragment>
            }
          >
            <ButtonBase
              key={sdg._id}
              className={
                visitedSdgs.includes(index)
                  ? classes.buttonSelected
                  : classes.button
              }
            >
              <img
                className={classes.sdgImage}
                src={require('assets/E-SDG-goals-icons-full-rgb-' +
                  sdg.shortName +
                  '.png')}
                alt="SDGs"
              />
            </ButtonBase>
          </Tooltip>
        ) : (
          <ButtonBase
            key={sdg._id}
            className={
              visitedSdgs.includes(index)
                ? classes.buttonSelected
                : classes.button
            }
          >
            <img
              className={classes.sdgImage}
              src={require('assets/E-SDG-goals-icons-full-rgb-' +
                sdg.shortName +
                '.png')}
              alt="SDGs"
            />
          </ButtonBase>
        )}
      </div>
    )
  }
}
OpportunitiesSdgTab.propTypes = {
  onChange: PropTypes.func,
  onClick: PropTypes.func,
  selected: PropTypes.bool,
  disabled: PropTypes.bool,
  value: PropTypes.any,
  classes: PropTypes.object.isRequired
}

OpportunitiesSdgTab.defaultProps = {
  disabled: false,
  onChange: () => {},
  onClick: () => {}
}

export default withStyles(styles)(OpportunitiesSdgTab)
