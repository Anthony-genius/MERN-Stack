import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import { ConnectedRouter } from 'connected-react-router'
import { connect } from 'react-redux'

import { hot } from 'react-hot-loader'

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import 'core-js/fn/array/flat-map'
import Assessment from 'components/Assessment'
import Layout from 'components/Layout'
import Start from 'components/Start'
import SignUp from 'components/SignUp'
import Hello from 'components/Hello'
import PasswordReset from 'components/PasswordReset'
import PasswordUpdate from 'components/PasswordUpdate'
import Organization from 'components/Organization'
import OrganizationBoardWithPaths from 'components/Organization/OrganizationBoardWithPaths'
import OrganizationBoard from 'components/Organization/OrganizationBoard'
import Login from 'components/Login'
import Dashboard from 'components/Dashboard'
import TermsAndConditions from 'components/TermsAndConditions'
import { impactiOrange, impactiBlue } from 'constants/inlineStyles'
import WithDictionaries from '../WithDictionaries'
import PathsAndDestinations from '../Destinations/index'
import DefinePrioritiesPage from '../PathsIntroductionWizard/DefinePrioritiesPage'
import DefineRoadmapPage from '../PathsIntroductionWizard/DefineRoadmapPage'
import PathsCompletionConfirmationPage from '../PathsCompletionConfirmationPage'
import LoadingSpinner from 'components/LoadingSpinner'
import CookieBanner from 'components/CookieBanner'
import PrivateRoute from 'components/PrivateRoute'
import AssessmentRoute from 'components/AssessmentRoute'

import { getAuth } from 'actions/session'

import styles from './styles.module.css'

const theme = createMuiTheme({
  typography: {
    useNextVariants: true
  },
  palette: {
    primary: impactiOrange,
    secondary: impactiBlue
  },
  overrides: {
    MuiButton: {
      root: {
        height: 50,
        fontSize: 20,
        '&$disabled': {
          backgroundColor: '#00a0b25e'
        }
      },
      contained: {
        color: '#ffffff !important',
        minWidth: 160
      }
    },
    MuiPaper: {
      rounded: {
        borderRadius: 5
      }
    },
    MuiInput: {
      underline: {
        '&:after': {
          backgroundColor: 'inherit'
        }
      }
    },
    MuiInputLabel: {
      shrink: {
        fontSize: 16,
        color: '#9f9f9f'
      }
    },
    MuiFormLabel: {
      root: {
        '&$focused': {
          color: 'inherit'
        }
      }
    },
    MuiFormControlLabel: {
      label: {
        color: 'inherit'
      }
    },
    MuiBadge: {
      badge: {
        top: 15,
        right: -7,
        height: 17,
        width: 17
      },
      colorPrimary: {
        color: '#ffffff'
      }
    }
  },
  textField: {
    floatingLabelColor: '#9e9e9e',
    focusColor: '#8AA8B0'
  },
  zIndex: {
    popover: 1500,
    dialog: 1600
  }
})

class App extends Component {
  componentDidMount() {
    this.props.getAuth()
  }

  render() {
    const { isLoggedIn, auth, connect, history } = this.props

    if (!auth || auth.loading) return <LoadingSpinner />

    return (
      <MuiThemeProvider theme={theme}>
        <Layout isLoggedIn={isLoggedIn}>
          <CookieBanner history={history} />
          <div className={styles.container}>
            {/*  <BrowserRouter>
              <Switch>
                <Route exact path="/board" component={Sidebar} />
                <Route
                  exact
                  path="/board/paths"
                  component={() => <Sidebar sidebarType={SIDEBAR_TYPES.WITH_SUMMARY} />}
                />
                <Route
                  exact
                  path="/paths"
                  component={() => <Sidebar sidebarType={SIDEBAR_TYPES.WITH_SUMMARY} />}
                />
              </Switch>
            </BrowserRouter> */}
            <WithDictionaries>
              <ConnectedRouter history={history}>
                <Switch>
                  <Route path="/board" exact component={OrganizationBoard} />
                  <Route
                    path="/board/paths"
                    exact
                    component={OrganizationBoardWithPaths}
                  />
                  <Route path="/organization" component={Organization} />
                  <Route
                    exact
                    path="/paths/completion-confirmation"
                    component={PathsCompletionConfirmationPage}
                  />
                  <Route
                    path="/terms-conditions"
                    component={TermsAndConditions}
                  />
                  <PrivateRoute
                    path="/dashboard"
                    component={Dashboard}
                    isLoggedIn={isLoggedIn}
                    connect={connect}
                    dashboard
                  />
                  <Route
                    exact
                    path="/paths/define-priorities"
                    component={DefinePrioritiesPage}
                  />
                  <Route
                    exact
                    path="/paths/define-roadmap"
                    component={DefineRoadmapPage}
                  />
                  <Route exact path="/paths" component={PathsAndDestinations} />
                  <Route exact path="/" component={Assessment} />
                  <AssessmentRoute
                    path="/assessment/:stage?/:step?"
                    component={Assessment}
                    auth={auth}
                  />
                  <Route exact path="/sign-up/:step?" component={SignUp} />
                  <Route exact path="/login" component={Login} />
                  <Route exact path="/start" component={Start} />
                  <Route exact path="/hello/:token" component={Hello} />
                  <Route
                    exact
                    path="/password_reset"
                    component={PasswordReset}
                  />
                  <Route
                    exact
                    path="/password_update/:token"
                    component={PasswordUpdate}
                  />
                </Switch>
              </ConnectedRouter>
            </WithDictionaries>
          </div>
        </Layout>
      </MuiThemeProvider>
    )
  }
}

export default hot(module)(
  connect(
    state => ({
      isLoggedIn: state.auth.token || !!localStorage.getItem('authToken'),
      connect: !!localStorage.getItem('connect'),
      auth: state.auth
    }),
    dispatch => ({
      getAuth: getAuth(dispatch)
    })
  )(App)
)
