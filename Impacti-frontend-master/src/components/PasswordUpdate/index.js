import React from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import FormHelperText from '@material-ui/core/FormHelperText'
import Done from '@material-ui/icons/Done'

import fetch from 'actions/fetchData'
import API_CONSTANTS from 'constants/api'
import { updatePassword } from 'actions/session'
import { validate } from 'helpers/passwordValidator'
import impactiLogo from 'assets/IMPACTI-orange-logo-shadow-without-text-small.png'

const styles = theme => ({
  container: {
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  logo: {
    width: 180,
    marginBottom: theme.spacing(2)
  },
  form: {
    width: 300
  },
  correctPasswordsIco: {
    color: '#009688',
    position: 'absolute',
    right: 0,
    top: 24
  },
  resetPasswordFormWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: '430px',
    margin: '0 auto'
  },
  resetPasswordFormSentWrapper: {
    maxWidth: '360px',
    textAlign: 'center',
    '& p': {
      textAlign: 'left',
      marginTop: '1rem',
      marginBottom: '0.75rem'
    }
  },
  PasswordUpdateBtn: {
    margin: '30px auto 20px ',
    width: '100%'
  }
})

class PasswordUpdate extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      password: '',
      userId: '',
      passwordRepeat: '',
      isPasswordCorrect: false,
      submitted: false,
      passwordError: '',
      repeatedPasswordTheSame: false,
      wasValidationPerformed: false,
      result: [],
      validToken: false
    }

    fetch(`${API_CONSTANTS.BASE_URL}/api/auth/password_reset/update`, {
      method: 'PATCH',
      body: JSON.stringify({
        token: this.props.match.params.token
      })
    })
      .then(res => res.json())
      .then(result => {
        this.setState({ validToken: true, result: result, userId: result._id })
      })
  }

  validatePassword = e => {
    const password =
      e.target.name === 'password' ? e.target.value : this.state.password
    const repeatedPassword =
      e.target.name === 'passwordRepeat'
        ? e.target.value
        : this.state.passwordRepeat

    this.setState(
      validate({
        password,
        repeatedPassword
      })
    )
  }

  handleChange = key => e => {
    e.persist()
    this.setState({ [key]: e.target.value })

    if (this.state.wasValidationPerformed) {
      this.validatePassword(e)
    }
  }

  updatePassword = e => {
    e.preventDefault()
    const { result, password } = this.state
    this.setState({ submitted: true })
    this.props.updatePassword({ ...result, password: password })
  }

  render() {
    const {
      password,
      passwordRepeat,
      submitted,
      isPasswordCorrect,
      passwordError,
      repeatedPasswordTheSame,
      wasValidationPerformed,
      validToken
    } = this.state
    const { classes } = this.props

    return validToken && validToken ? (
      <div className={classes.resetPasswordFormWrapper}>
        <img className={classes.logo} src={impactiLogo} alt="Impacti Logo" />
        {submitted ? (
          <>
            <h3>Your password has been saved.</h3>
            <Link to="/login">Return to sign in</Link>
          </>
        ) : (
          <>
            <h3>Choose your new your password</h3>
            <form onSubmit={this.updatePassword}>
              <FormControl fullWidth>
                <InputLabel htmlFor="password">New password</InputLabel>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={this.handleChange('password')}
                  onBlur={() =>
                    this.setState(
                      validate({
                        password,
                        repeatedPassword: passwordRepeat
                      })
                    )
                  }
                  autoFocus
                />
                {isPasswordCorrect && (
                  <Done style={styles.correctPasswordsIco} />
                )}
                <FormHelperText error>{passwordError}</FormHelperText>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel htmlFor="passwordRepeat">
                  Confirm password
                </InputLabel>
                <Input
                  id="passwordRepeat"
                  name="passwordRepeat"
                  type="password"
                  value={passwordRepeat}
                  onChange={this.handleChange('passwordRepeat')}
                  onBlur={() =>
                    this.setState(
                      validate({
                        password,
                        repeatedPassword: passwordRepeat
                      })
                    )
                  }
                  autoFocus
                />
                {repeatedPasswordTheSame && isPasswordCorrect && (
                  <Done style={styles.correctPasswordsIco} />
                )}
                <FormHelperText error>
                  {!repeatedPasswordTheSame && wasValidationPerformed
                    ? 'Passwords must be identical'
                    : ''}
                </FormHelperText>
              </FormControl>
              <Button
                onClick={this.updatePassword}
                className={classes.PasswordUpdateBtn}
                variant="contained"
                color="primary"
                disabled={!isPasswordCorrect || !repeatedPasswordTheSame}
              >
                Update password
              </Button>
            </form>
          </>
        )}
      </div>
    ) : (
      <div className={classes.resetPasswordFormWrapper}>
        <img className={classes.logo} src={impactiLogo} alt="Impacti Logo" />
        <h3>Your password reset link is invalid</h3>
        <Link to="/login">Return to sign in</Link>
      </div>
    )
  }
}

PasswordUpdate.propTypes = {
  token: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired
}

export default connect(
  state => ({ user: state.auth.user }),
  dispatch => ({
    updatePassword: updatePassword(dispatch)
  })
)(withStyles(styles)(PasswordUpdate))
