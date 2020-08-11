import React from 'react'
import { Route, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'
import IconButton from '@material-ui/core/IconButton'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import ExitIcon from '@material-ui/icons/ExitToApp'
import { logOut } from 'actions/session'
import { loadTags } from 'actions/tag'

import Newsfeed from './Newsfeed'
import MyProfile from './MyProfile'
import Community from './Community'
import DashboardAvatar from './DashboardAvatar'
/**
 * suppress prop-types warning, see: https://github.com/ReactTraining/react-router/issues/6420
 * remove after updating react router
 */
Route.propTypes.component = PropTypes.oneOfType([
  Route.propTypes.component,
  PropTypes.object
])

const styles = theme => ({
  logOut: {
    color: '#000',
    marginRight: 5
  },
  container: {
    width: '70%',
    background: '#3b3b3b',
    height: 60,
    border: 'none',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    [theme.breakpoints.down('xs')]: {
      top: 60,
      width: '100%'
    }
  },
  avatar: {
    width: '50px',
    marginRight: 'auto',
    [theme.breakpoints.down('xs')]: {
      top: -60,
      position: 'absolute',
      right: 0
    }
  },
  avatarButton: {
    padding: 7
  },
  tabs: {
    height: 60,
    margin: '0 auto'
  },
  tab: {
    height: 60,
    color: '#fff',
    textTransform: 'capitalize',
    fontSize: '1.2em',
    fontWeight: 200,
    minWidth: 120,
    [theme.breakpoints.down('xs')]: {
      minWidth: 100,
      fontSize: '.95em'
    }
  },
  inputRoot: {
    color: 'inherit'
  },
  inputInput: {
    padding: '5px 5px 5px 30px',
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200
    }
  },
  icon: {
    color: '#f5f5f5',
    margin: '0 15px'
  }
})

const tabs = baseUrl => [
  {
    name: 'Newsfeed',
    to: `${baseUrl}`,
    component: Newsfeed,
    exact: true
  },
  {
    name: 'Profile',
    to: `${baseUrl}/profile`,
    component: MyProfile,
    children: [
      {
        to: `${baseUrl}/profile/edit`
      },
      {
        to: `${baseUrl}/profile/activity`
      }
    ],
    exact: false
  },
  {
    name: 'Community',
    to: `${baseUrl}/community`,
    component: Community,
    exact: true
  }
  // {
  //   name: 'About',
  //   to: `${baseUrl}/about/contact-us`,
  //   component: ContactUs
  // }
]

const getTabForPathname = ({ pathname, searchTabs }) =>
  searchTabs.findIndex(tab => {
    if (!tab) {
      return false
    }
    if (tab.to && tab.to === pathname) {
      return true
    } else if (tab.children) {
      if (getTabForPathname({ pathname, searchTabs: tab.children }) !== -1) {
        return true
      }
    }
    return false
  })

class Dashboard extends React.Component {
  state = {
    avatarAnchorEl: null
  }

  componentDidMount = () => {
    this.props.loadTags()
  }

  handleAvatarMenuOpen = event => {
    this.setState({ avatarAnchorEl: event.currentTarget })
  }

  handleAvatarMenuClose = () => {
    this.setState({ avatarAnchorEl: null })
  }

  render() {
    const { classes, pathname, logOut, match } = this.props
    const { avatarAnchorEl } = this.state

    const isAvatarMenuOpen = Boolean(avatarAnchorEl)

    const renderAvatarMenu = (
      <Menu
        anchorEl={avatarAnchorEl}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        open={isAvatarMenuOpen}
        onClose={this.handleAvatarMenuClose}
      >
        <MenuItem
          onClick={e => {
            e.preventDefault()
            logOut()
          }}
        >
          <ExitIcon className={classes.logOut} />
          Log Out
        </MenuItem>
      </Menu>
    )
    return (
      <React.Fragment>
        <AppBar position="fixed" elevation={0} className={classes.container}>
          <Tabs
            className={classes.tabs}
            indicatorColor="primary"
            value={getTabForPathname({
              pathname,
              searchTabs: tabs(match.url)
            })}
          >
            {tabs(match.url).map((tab, i) => (
              <Tab
                key={i}
                label={tab.name || 'Undefined'}
                component={Link}
                to={tab.to || '/'}
                className={classes.tab}
              />
            ))}
          </Tabs>
          <div className={classes.avatar}>
            <IconButton
              edge="end"
              color="inherit"
              aria-haspopup="true"
              onClick={this.handleAvatarMenuOpen}
              className={classes.avatarButton}
            >
              <DashboardAvatar />
            </IconButton>
            {renderAvatarMenu}
          </div>
        </AppBar>
        {tabs(match.url).map((tab, i) => (
          <Route
            key={i}
            exact={tab.exact}
            path={tab.to || '/'}
            component={tab.component || React.Fragment}
          />
        ))}
      </React.Fragment>
    )
  }
}
Dashboard.defaultProps = {
  logOut: () => {}
}

Dashboard.propTypes = {
  logOut: PropTypes.func
}

export default connect(
  state => ({
    pathname: state.router.location.pathname
  }),
  dispatch => ({
    logOut: logOut(dispatch),
    loadTags: loadTags(dispatch)
  })
)(withStyles(styles)(Dashboard))
