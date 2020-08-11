import React from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'

import GenericErrorPanel from '../GenericErrorPanel'
import LoadingSpinner, { SPINNER_TYPES } from 'components/LoadingSpinner'
import ImpactiButton, { BUTTON_TYPES } from 'components/ImpactiButton'
import { login } from 'actions/session'

const styles = theme => ({
  startContainer: {
    overflow: 'auto',
    padding: '0',
    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacing.unit * 6,
      marginRight: 0,
      marginLeft: 0,
      marginBottom: theme.spacing.unit * 8
    }
  },
  startContentLeft: {
    alignItems: 'center',
    display: 'flex',
    background: '#ffffff'
  },
  startContentRight: {
    alignItems: 'center',
    display: 'flex'
  },
  innerWrapper: {
    flex: '1',
    margin: '20px auto',
    textAlign: 'center',
    zIndex: '1'
  },
  loginForm: {
    maxWidth: '300px',
    margin: '0 auto',
    textAlign: 'left'
  },
  formHeader: {
    fontSize: '38px',
    fontWeight: '300',
    padding: '20px 0'
  },
  startImage: {
    margin: 'auto auto',
    maxWidth: '100%',
    padding: '10px',
    height: '80vh'
  },
  signUpButton: {
    margin: '50px 0 20px 0',
    width: '300px'
  },
  alreadyAccount: {
    borderBottom: '1px solid #eeeeee',
    borderTop: '1px solid #eeeeee',
    fontSize: '12px',
    margin: '15px auto 15px auto',
    padding: '20px 0',
    maxWidth: '420px'
  },
  alreadyLink: {
    color: 'var(--grayBlueColor)',
    textDecoration: 'none'
  },
  backgroundFiller: {
    [theme.breakpoints.up('md')]: {
      position: 'absolute',
      background: '#ffffff',
      width: '50%',
      height: '100%',
      bottom: '0',
      zIndex: '0'
    }
  }
})

export class LoginComponent extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      username: '',
      email: '',
      password: '',
      errorText: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.login = this.login.bind(this)
  }

  login(e) {
    e.preventDefault()
    this.setState({ isDirty: false })
    const { email, password } = this.state
    this.props.login({ email, password })
  }

  handleChange(event) {
    event.persist()

    this.setState({
      [event.target.name]: event.target.value,
      errorText: event.target.value ? '' : 'This field is required',
      isDirty: true
    })
  }

  render() {
    const { auth, classes } = this.props

    return (
      <Grid
        container
        className={classes.startContainer}
        spacing={0}
        align="stretch"
      >
        {auth.isSubmittingLogin && (
          <LoadingSpinner spinnerType={SPINNER_TYPES.ABSOLUTE} />
        )}
        <Grid item xs={12} md={6} className={classes.startContentLeft}>
          <div className={classes.innerWrapper}>
            <div className={classes.formHeader}>Log in</div>
            {auth.hasLoginErrorOccurred && !this.state.isDirty && (
              <GenericErrorPanel message={auth.loginErrorMessage} />
            )}
            <form className={classes.loginForm}>
              <FormControl fullWidth>
                <InputLabel htmlFor="email">E-mail address</InputLabel>
                <Input
                  id="email"
                  name="email"
                  value={this.state.email}
                  onChange={this.handleChange}
                  autoFocus
                />
              </FormControl>
              <FormControl fullWidth>
                <InputLabel htmlFor="password">Password</InputLabel>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={this.state.password}
                  onChange={this.handleChange}
                />
              </FormControl>
              <FormControlLabel
                control={<Checkbox value="remember" />}
                label="Keep me logged in"
              />
              <div>
                <Button
                  variant="contained"
                  type="submit"
                  onClick={this.login}
                  color="primary"
                  className={classes.signUpButton}
                >
                  LOG IN
                </Button>
              </div>
            </form>
            <div className={classes.alreadyAccount}>
              <Link className={classes.alreadyLink} to="/password_reset">
                Forgot password?
              </Link>
            </div>
            <div>
              <p>
                Don't have an account yet?
                <br />
                Create yours by completing an EXPLORE SDG Assessment.
              </p>
              <Link to="/">
                <ImpactiButton
                  variant="contained"
                  buttonType={BUTTON_TYPES.BLANK_BLUE}
                >
                  Go to EXPLORE
                </ImpactiButton>
              </Link>
            </div>
          </div>
        </Grid>
        <Grid item xs={12} md={6} className={classes.startContentRight}>
          <img
            className={classes.startImage}
            src={require('assets/startscreen-ilustration.svg')}
            alt="Impacti illustration"
          />
        </Grid>
        <div className={classes.backgroundFiller} />
      </Grid>
    )
  }
}

export default connect(
  state => ({
    auth: state.auth
  }),
  dispatch => ({
    login: login(dispatch)
  })
)(withStyles(styles)(LoginComponent))
