import React from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'

import { resetPassword } from 'actions/session'
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
  resetPasswordWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: '430px',
    margin: '0 auto'
  },
  passwordResetBtn: {
    margin: '30px auto 20px ',
    width: '100%'
  }
})

class PasswordReset extends React.Component {
  state = {
    email: '',
    submitted: false
  }

  handleChange = e => {
    this.setState({ email: e.target.value })
  }

  sendPasswordResetEmail = e => {
    e.preventDefault()
    const { email } = this.state
    this.setState({ email: '', submitted: true })
    this.props.resetPassword({ email })
  }

  render() {
    const { email, submitted } = this.state
    const { classes } = this.props

    return (
      <div className="paper-container-wrapper">
        <div className={classes.resetPasswordWrapper}>
          <img className={classes.logo} src={impactiLogo} alt="Impacti Logo" />
          {submitted ? (
            <>
              <h3>Your password reset request has been sent</h3>
              <p>
                If that account is in our system, we emailed you a link to reset
                your password.
              </p>
              <Link to="/login">Return to sign in</Link>
            </>
          ) : (
            <>
              <h3>Reset your password</h3>
              <p>
                It happens to the best of us. Enter your email and we'll send
                you reset instructions.
              </p>
              <form onSubmit={this.sendPasswordResetEmail}>
                <FormControl fullWidth>
                  <InputLabel htmlFor="email">E-mail address</InputLabel>
                  <Input
                    id="email"
                    name="email"
                    value={email}
                    onChange={this.handleChange}
                    autoFocus
                  />
                </FormControl>
                <Button
                  onClick={this.sendPasswordResetEmail}
                  className={classes.passwordResetBtn}
                  variant="contained"
                  color="primary"
                >
                  Send password reset email
                </Button>
              </form>
              <Link to="/login">I remember my password</Link>
            </>
          )}
        </div>
      </div>
    )
  }
}

export default connect(
  state => ({
    auth: state.auth
  }),
  dispatch => ({
    resetPassword: resetPassword(dispatch)
  })
)(withStyles(styles)(PasswordReset))
