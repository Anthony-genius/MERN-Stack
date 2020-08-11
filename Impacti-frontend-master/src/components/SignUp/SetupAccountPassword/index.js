import React, { Component } from 'react'
import { connect } from 'react-redux'

import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import FormHelperText from '@material-ui/core/FormHelperText'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import Done from '@material-ui/icons/Done'
import LoadingSpinner, { SPINNER_TYPES } from 'components/LoadingSpinner'
import { signUp } from 'actions/session'
import RESPONSES_CONSTANTS from 'constants/requestResponses'
import { validate } from 'helpers/passwordValidator'

const styles = {
  correctPasswords: {
    color: '#009688'
  },
  correctPasswordsIco: {
    color: '#009688',
    position: 'absolute',
    right: 0,
    top: 24
  },
  formMargin: {
    margin: '0 20px',
    flex: 1
  },
  flexContainer: {
    display: 'flex',
    paddingLeft: '20px',
    paddingRight: '20px',
    maxWidth: '730px'
  }
}

class SetupAccountPassword extends Component {
  constructor(props, context) {
    super(props, context)
    this.createAccount = this.createAccount.bind(this)
    this.updateOrSignUp = this.updateOrSignUp.bind(this)
    this.goToPrevStep = this.goToPrevStep.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleRequestClose = this.handleRequestClose.bind(this)
    this.state = {
      password: this.props.fieldValues.password
        ? this.props.fieldValues.password
        : '',
      passwordRepeat: '',
      isPasswordCorrect: false,
      passwordError: '',
      repeatedPasswordTheSame: false,
      dialogFailureOpen: false,
      isLoaderVisible: false,
      wasValidationPerformed: false
    }
    this.checkBoth = false
  }

  updateOrSignUp(data) {
    const { signUp } = this.props
    return signUp(data)
  }

  createAccount(e) {
    const { fieldValues, saveValues, nextStep } = this.props
    const { password } = this.state

    e.preventDefault()

    this.setState({ isLoaderVisible: true })

    saveValues({
      password
    })

    this.updateOrSignUp({
      username: fieldValues.username,
      email: fieldValues.email,
      password
    }).then(response => {
      if (
        response.data &&
        (response.data.status ===
          RESPONSES_CONSTANTS.GENERIC_SUCCESS_RESPONSE ||
          response.data._id)
      ) {
        nextStep()
      } else {
        this.setState({ dialogFailureOpen: true })
      }
    })
  }

  validatePassword(event) {
    const password =
      event.target.name === 'password'
        ? event.target.value
        : this.state.password
    const repeatedPassword =
      event.target.name === 'passwordRepeat'
        ? event.target.value
        : this.state.passwordRepeat

    this.setState(
      validate({
        password,
        repeatedPassword
      })
    )
  }

  handleChange(event) {
    event.persist()
    this.setState({ [event.target.name]: event.target.value })

    if (this.state.wasValidationPerformed) {
      this.validatePassword(event)
    }
  }

  handleRequestClose() {
    this.setState({
      dialogFailureOpen: false,
      isLoaderVisible: false
    })
  }

  goToPrevStep(e) {
    e.preventDefault()
    this.props.prevStep()
  }

  render() {
    const {
      isLoaderVisible,
      password,
      passwordRepeat,
      passwordInvalid,
      isPasswordCorrect,
      passwordError,
      repeatedPasswordTheSame,
      wasValidationPerformed
    } = this.state

    return (
      <div className="paper-container-wrapper">
        {isLoaderVisible && (
          <LoadingSpinner spinnerType={SPINNER_TYPES.ABSOLUTE} />
        )}
        <Paper
          elevation={24}
          className="paper-container paper-container--short"
        >
          <div className="paper-container__header">
            <div className="paper-container__header__left">
              Registration: Password
            </div>
            <div className="paper-container__header__right">3 / 3</div>
          </div>
          <div>
            <img
              className="paper-container__text--large"
              src={require('assets/key.svg')}
              alt="key illustration"
            />
            <div className="paper-container__text--large">
              Almost there! We&apos;ll also need a password.
            </div>
            <form>
              <div style={styles.flexContainer}>
                <FormControl
                  className="paper-container__text--large paper-container__text--large"
                  style={styles.formMargin}
                >
                  <InputLabel htmlFor="password">Your password</InputLabel>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    value={password}
                    onChange={this.handleChange}
                    onBlur={() =>
                      this.setState(
                        validate({
                          password,
                          repeatedPassword: passwordRepeat
                        })
                      )
                    }
                    autoFocus
                    style={passwordInvalid ? {} : styles.correctPasswords}
                  />
                  {isPasswordCorrect && (
                    <Done style={styles.correctPasswordsIco} />
                  )}
                  <FormHelperText error>{passwordError}</FormHelperText>
                </FormControl>
                <FormControl
                  className="paper-container__text--large paper-container__text--large"
                  style={styles.formMargin}
                >
                  <InputLabel htmlFor="passwordRepeat">
                    Repeat your password
                  </InputLabel>
                  <Input
                    id="passwordRepeat"
                    name="passwordRepeat"
                    type="password"
                    value={passwordRepeat}
                    onChange={this.handleChange}
                    onBlur={() =>
                      this.setState(
                        validate({
                          password,
                          repeatedPassword: passwordRepeat
                        })
                      )
                    }
                    style={passwordInvalid ? {} : styles.correctPasswords}
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
              </div>
              <div>
                <Button
                  variant="contained"
                  type="submit"
                  onClick={this.createAccount}
                  color="primary"
                  disabled={
                    this.state.usernameInvalid ||
                    !this.state.isPasswordCorrect ||
                    !this.state.repeatedPasswordTheSame
                  }
                >
                  Create an account
                </Button>
              </div>
            </form>
            <div>
              <div
                className="paper-container__backbutton"
                onClick={this.goToPrevStep}
                role="button"
                tabIndex={0}
              >
                GO BACK
              </div>
            </div>
          </div>
          <div className="paper-container__footer">
            Creating an account indicates that you have read and agreed with our{' '}
            <span style={{ cursor: 'pointer' }} className="linkColoured">
              terms and conditions.
            </span>
          </div>
        </Paper>
        <Dialog open={this.state.dialogFailureOpen}>
          <DialogTitle>Registration Error</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please check your input data and try again.
            </DialogContentText>
          </DialogContent>
        </Dialog>
      </div>
    )
  }
}

export default connect(
  state => ({ user: state.auth.user }),
  dispatch => ({
    signUp: signUp(dispatch)
  })
)(SetupAccountPassword)
