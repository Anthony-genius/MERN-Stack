import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import ButtonBase from '@material-ui/core/ButtonBase'
import Tooltip from '@material-ui/core/Tooltip'
import PlaceIcon from '@material-ui/icons/Place'
import SettingsIcon from '@material-ui/icons/Settings'
import ArrowIcon from '@material-ui/icons/ArrowUpward'

const styles = theme => ({
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
    margin: '0 25px'
  },
  sdgImage: {
    width: 100,
    height: 100
  },
  reasonIcons: {
    margin: '60px auto 25px',
    width: '70%'
  },
  reasonIcon: {
    position: 'relative',
    fill: 'var(--primaryColor)',
    fontSize: '30px',
    margin: '0 7 %',
    '&:hover': {
      cursor: 'help'
    }
  },
  '@media screen and (max-width: 768px)': {
    button: {
      margin: '0 25px 25px'
    },
    reasonIcons: {
      margin: '60px auto 35px'
    }
  }
})

class SdgTab extends React.Component {
  handleChange = event => {
    const { onChange, onClick, value, sdg } = this.props
    if (onChange) {
      onChange(event, value, sdg)
    }
    if (onClick) {
      onClick(event, value, sdg)
    }
  }
  render() {
    const { classes, sdg, value, selected, disabled } = this.props

    return (
      <div
        value={value}
        sdg={sdg}
        role="tab"
        onClick={this.handleChange}
        aria-selected={selected}
        disabled={disabled}
        className={classes.tabContainer}
      >
        <ButtonBase key={sdg._id} className={classes.button}>
          <img
            className={classes.sdgImage}
            src={require('assets/E-SDG-goals-icons-full-rgb-' +
              sdg.shortName +
              '.png')}
            alt="SDGs"
          />
        </ButtonBase>
        <div className={classes.reasonIcons}>
          {sdg.reason.includes('country') && (
            <Tooltip title="This SDG is at risk where you operate.">
              <PlaceIcon className={classes.reasonIcon} />
            </Tooltip>
          )}
          {sdg.reason.includes('opportunity') && (
            <Tooltip title="This SDG is at risk due to current practices in your sector.">
              <SettingsIcon className={classes.reasonIcon} />
            </Tooltip>
          )}
          {sdg.reason.includes('leadership') && (
            <Tooltip title="Your sector has the expertise to lead innovations for this SDG.">
              <ArrowIcon className={classes.reasonIcon} />
            </Tooltip>
          )}
        </div>
      </div>
    )
  }
}
SdgTab.propTypes = {
  onChange: PropTypes.func,
  onClick: PropTypes.func,
  selected: PropTypes.bool,
  disabled: PropTypes.bool,
  value: PropTypes.number,
  classes: PropTypes.object.isRequired
}

SdgTab.defaultProps = {
  disabled: false,
  onChange: () => {},
  onClick: () => {}
}

export default withStyles(styles)(SdgTab)
