import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import Cookies from 'js-cookie'
import Modal from '@material-ui/core/Modal'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import ImpactiButton, { BUTTON_TYPES } from 'components/ImpactiButton'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'

import CookiePolicy from './CookiePolicy'

const styles = theme => ({
  consentBanner: {
    alignItems: 'baseline',
    background: '#00a0b2',
    color: 'white',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    left: 0,
    bottom: 0,
    position: 'fixed',
    width: '100%',
    zIndex: '999'
  },
  h2: {
    marginTop: 50
  },
  bannerContent: {
    flex: '1 0 300px',
    margin: 15
  },
  bannerButton: {
    backgroundColor: '#fff',
    color: '#ff7400',
    margin: '0 15px'
  },
  modalBody: {
    height: '80vh',
    scrollBehavior: 'smooth',
    overflow: 'scroll',
    padding: '0 10%'
  },
  notsureModalBody: {
    height: '45vh',
    maxWidth: 600,
    padding: '0 3%',
    margin: '15% auto',
    outline: 'none',
    [theme.breakpoints.down('xs')]: {
      width: '95vw',
      margin: '45% auto'
    }
  },
  notsureModalContainer: {
    padding: theme.spacing(2)
  },
  closeIcon: {
    float: 'right',
    margin: '1em'
  },
  buttonSlick: {
    borderStyle: 'none',
    padding: '0 0 0',
    margin: '1em 0',
    fontSize: '1em',
    cursor: 'pointer',
    textDecoration: 'underline'
  },
  buttonCentered: {
    margin: '50px auto',
    width: '125px'
  }
})
class CookieBanner extends Component {
  constructor(props) {
    super(props)
    const { cookieName, debug } = props
    this.state = {
      hidden: !!(Cookies.get(cookieName) || debug),
      openPolicy: false,
      openRefusal: false
    }
  }
  handleOpenPolicy = () => {
    this.setState({ openPolicy: true })
  }
  handleClosePolicy = () => {
    this.setState({ openPolicy: false })
  }
  handleOpenRefusal = () => {
    this.setState({ openRefusal: true })
  }
  handleCloseRefusal = () => {
    this.setState({ openRefusal: false })
  }

  accept = () => {
    const { cookieName, cookieValue, expires, extraCookieOptions } = this.props

    Cookies.set(cookieName, cookieValue, {
      expires: expires,
      ...extraCookieOptions
    })
    this.setState({ hidden: true })
  }

  acceptAndClose = () => {
    this.accept()
    this.handleCloseRefusal()
  }

  componentDidUpdate(prevProps) {
    const { history } = this.props
    if (history.location !== prevProps.history.location) {
      this.accept()
    }
  }

  render() {
    if (this.state.hidden) {
      return null
    }
    const { classes } = this.props
    return (
      <div className={classes.consentBanner}>
        <div className={classes.bannerContent}>
          <p>
            This website uses cookies to optimize your experience. We collect
            statistics to provide you with content adapted to your interests. By
            continuing on this website, you agree to the use of cookies. Want to
            learn more? View our{' '}
            <span
              className={classes.buttonSlick}
              onClick={this.handleOpenPolicy}
            >
              Cookie Policy
            </span>
          </p>
        </div>
        <Button
          className={classes.bannerButton}
          onClick={() => {
            this.accept()
          }}
        >
          I ACCEPT COOKIES
        </Button>
        <Button onClick={this.handleOpenRefusal}>I am not sure</Button>
        <Modal open={this.state.openPolicy}>
          <div className="paper-container-wrapper">
            <Paper elevation={24}>
              <div className={classes.modalBody}>
                <IconButton
                  className={classes.closeIcon}
                  onClick={this.handleClosePolicy}
                  aria-label="Close"
                >
                  <CloseIcon />
                </IconButton>
                <CookiePolicy />
                <div className={classes.buttonCentered}>
                  <ImpactiButton
                    onClick={this.handleClosePolicy}
                    variant="contained"
                    buttonType={BUTTON_TYPES.CLOSE}
                  />
                </div>
              </div>
            </Paper>
          </div>
        </Modal>
        <Modal open={this.state.openRefusal}>
          <div className={classes.notsureModalBody}>
            <Paper elevation={24} className={classes.notsureModalContainer}>
              <IconButton
                className={classes.closeIcon}
                onClick={this.handleCloseRefusal}
                aria-label="Close"
              >
                <CloseIcon />
              </IconButton>
              <p>
                Cookies are essential to get the full potential of our website.
              </p>
              <Button onClick={this.acceptAndClose}>Accept Cookies</Button>
            </Paper>
          </div>
        </Modal>
      </div>
    )
  }
}
CookieBanner.propTypes = {
  cookieName: PropTypes.string,
  cookieValue: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
    PropTypes.number
  ]),
  expires: PropTypes.number,
  extraCookieOptions: PropTypes.object
}

CookieBanner.defaultProps = {
  cookieName: 'CookieConsent',
  cookieValue: true,
  expires: 365,
  extraCookieOptions: {}
}
export default withStyles(styles)(CookieBanner)
export { Cookies }
