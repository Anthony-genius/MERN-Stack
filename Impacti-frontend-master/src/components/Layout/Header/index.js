import React, { Component } from 'react'
import { push } from 'connected-react-router'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import ImpactiButton, { BUTTON_TYPES } from 'components/ImpactiButton'
import { logOut } from 'actions/session'
import HelpDialog from '../../HelpDialog'

import impactiExplorerLogoWithoutLogo from 'assets/EXPLORE_WITHOUT_LOGO.png'
import impactiLogo from 'assets/IMPACTILogoWhite.png'
import impactiExplorerLogo from 'assets/EXPLORE.png'
import impactiConnectLogo from 'assets/CONNECT_WITHOUT_LOGO.png'

const styles = theme => ({
  introContainer: {
    height: 60,
    position: 'fixed',
    width: '100vw',
    zIndex: '3',
    background: 'var(--primaryColor)',
    display: 'flex',
    justifyContent: 'space-between',
    '&:after': {
      background:
        'linear-gradient(180deg, rgba(160, 160, 160, 1), rgba(220, 220, 220, 0))',
      minHeight: 5,
      content: '""',
      zIndex: 999,
      width: '100%',
      position: 'absolute',
      top: 60,
      left: 0
    },
    [theme.breakpoints.down('xs')]: {
      height: 120,
      '&:after': {
        top: 120
      }
    }
  },
  container: {
    height: 60,
    position: 'fixed',
    width: '100vw',
    zIndex: '3',
    background: 'var(--primaryColor)',
    display: 'flex',
    justifyContent: 'space-between',
    '&:after': {
      background:
        'linear-gradient(180deg, rgba(160, 160, 160, 1), rgba(220, 220, 220, 0))',
      minHeight: 5,
      content: '""',
      zIndex: 999,
      width: '100%',
      position: 'absolute',
      top: 60,
      left: 0
    }
  },
  logo: {
    width: 160,
    height: 160,
    background: 'var(--primaryColor)',
    position: 'absolute',
    left: 35,
    zIndex: '1000',
    [theme.breakpoints.down('xs')]: {
      top: 0,
      left: 0,
      width: 120,
      height: 120
    }
  },
  logoExplorer: {
    height: 40,
    margin: '10px 20px',
    position: 'absolute',
    left: 185,
    [theme.breakpoints.down('xs')]: {
      height: 35,
      margin: '10px',
      top: 60,
      left: 125
    }
  },
  logoExplorerFull: {
    background: 'var(--primaryColor)',
    position: 'absolute',
    padding: '5px 90px',
    [theme.breakpoints.down('xs')]: {
      padding: '5px 10px',
      maxWidth: '60%',
      minHeight: 60
    }
  },
  logoConnect: {
    height: 60,
    width: 60,
    background: 'var(--primaryColor)',
    position: 'absolute',
    left: 135,
    zIndex: '1000',
    [theme.breakpoints.down('md')]: {
      left: 40
    },
    [theme.breakpoints.down('sm')]: {
      left: 0
    },
    [theme.breakpoints.down('xs')]: {
      top: 0,
      padding: 5,
      maxWidth: '60%',
      minHeight: 60
    }
  },
  logoConnectText: {
    height: 40,
    margin: '10px 20px',
    position: 'absolute',
    left: 185,
    [theme.breakpoints.down('md')]: {
      left: 90
    },
    [theme.breakpoints.down('sm')]: {
      left: 60
    },
    [theme.breakpoints.down('xs')]: {
      height: 35,
      margin: '10px',
      top: 0
    }
  },
  loggedInContainer: {
    display: 'flex',
    color: '#ffffff',
    position: 'absolute',
    right: 80,
    margin: '5px auto',
    [theme.breakpoints.down('xs')]: {
      right: 0,
      left: 0,
      fontSize: 13
    }
  },
  logoutLink: {
    height: '100%',
    display: 'flex',
    padding: '0 20px',
    borderLeft: '1px solid $halfTransparentWhite',
    [theme.breakpoints.down('xs')]: {
      padding: '0 15px'
    }
  },
  loginLink: {
    position: 'absolute',
    right: 80,
    margin: '5px auto',
    [theme.breakpoints.down('xs')]: {
      right: 5
    }
  },
  loginLinkButton: {
    [theme.breakpoints.down('xs')]: {
      padding: '0 15px !important'
    }
  },
  userDropdown: {
    margin: 'auto 20px',
    [theme.breakpoints.down('xs')]: {
      margin: '0 8px'
    }
  },
  email: {
    fontWeight: 'bold'
  },
  arrowDownIcon: {
    paddingLeft: 35
  },
  bellIcon: {
    padding: '0 10px',
    verticalAlign: 'text-top'
  },
  helpLink: {
    padding: '0 15px',
    margin: 'auto 0',
    color: 'inherit',
    '& img': {
      paddingRight: 5,
      verticalAlign: 'text-top'
    },
    [theme.breakpoints.down('xs')]: {
      padding: '0 10px'
    }
  }
})

const headerBackground = {
  backgroundColor: '#3B3B3B'
}

class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isHelpDialogOpen: false
    }
  }
  openHelpDialog() {
    this.setState({ isHelpDialogOpen: true })
  }
  closeHelpDialog() {
    this.setState({ isHelpDialogOpen: false })
  }
  render() {
    const { classes, location, user, push } = this.props

    const showConnectLogo =
      location.pathname.startsWith('/dashboard') ||
      location.pathname.startsWith('/login') ||
      location.pathname.startsWith('/sign-up') ||
      location.pathname.startsWith('/password_reset') ||
      location.pathname.startsWith('/password_update')

    return (
      <div
        className={
          !user || user.emailConfirmed
            ? classes.introContainer
            : classes.container
        }
        style={headerBackground}
      >
        {!user && !showConnectLogo && (
          <>
            <div>
              <img
                className={classes.logo}
                src={impactiLogo}
                alt="Impacti Logo"
              />
              <img
                className={classes.logoExplorer}
                src={impactiExplorerLogoWithoutLogo}
                alt="Impacti Explore logo"
              />
            </div>
            <div className={classes.loginLink}>
              <ImpactiButton
                onClick={() => push('/login')}
                buttonType={BUTTON_TYPES.LOGIN}
                className={classes.loginLinkButton}
              />
              {/* <ImpactiButton
                variant="contained"
                onClick={() => push('/sign-up/email')}
                buttonType={BUTTON_TYPES.SIGNUP_HEADER}
                className={classes.loginLinkButton}
              /> */}
            </div>
          </>
        )}
        {user && !user.email && !showConnectLogo && (
          <>
            <img
              className={classes.logoExplorerFull}
              src={impactiExplorerLogo}
              alt="Impacti Explore logo"
            />
          </>
        )}
        {user && !user.email && location.pathname.startsWith('/assessment') && (
          <>
            <img
              className={classes.logoExplorerFull}
              src={impactiExplorerLogo}
              alt="Impacti Explore logo"
            />
            <div className={classes.loginLink}>
              <ImpactiButton
                onClick={() => push('/sign-up/email')}
                buttonType={BUTTON_TYPES.SAVE_FOR_LATER}
              />
            </div>
          </>
        )}
        {showConnectLogo && (
          <>
            <img
              className={classes.logoConnect}
              src={impactiLogo}
              alt="Impacti Logo"
            />
            <img
              className={classes.logoConnectText}
              src={impactiConnectLogo}
              alt="Impacti Connect logo"
            />
          </>
        )}
        <HelpDialog
          closeHelpDialog={() => this.closeHelpDialog()}
          isHelpDialogOpen={this.state.isHelpDialogOpen}
        />
      </div>
    )
  }
}

Header.defaultProps = {
  logOut: () => {}
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  logOut: PropTypes.func
  /*   isLoggedIn: PropTypes.bool,
  emailConfirmed: PropTypes.bool, */
}

export default connect(
  state => ({
    user: state.auth.user,
    location: state.router.location
  }),
  dispatch => ({
    logOut: logOut(dispatch),
    push: path => dispatch(push(path))
  })
)(withStyles(styles)(Header))
