import React, { Component } from 'react'

import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import Input from '@material-ui/core/Input'
import FormControl from '@material-ui/core/FormControl'
import FormHelperText from '@material-ui/core/FormHelperText'

import IcoArrowRight from 'assets/ico-arrow-right.svg'

class SetupAccountEmail extends Component {
  constructor(props, context) {
    super(props, context)
    this.nextStep = this.nextStep.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.state = {
      email: this.props.fieldValues.email ? this.props.fieldValues.email : '',
      errorText: '',
      emailInvalid: !this.props.fieldValues.email
    }
  }
  nextStep(e) {
    e.preventDefault()
    const data = { email: this.state.email }
    this.props.saveValues(data)
    this.props.nextStep()
  }
  handleChange(event) {
    event.persist()
    if (!event.target.value) {
      this.setState({ errorText: 'This field is required' })
      this.setState({ emailInvalid: true })
    } else if (event.target.value.match(/\S+@\S+\.\S+/)) {
      this.setState({ errorText: '' })
      this.setState({ emailInvalid: false })
    } else {
      this.setState({ errorText: 'Invalid email format' })
      this.setState({ emailInvalid: true })
    }
    this.setState({ [event.target.name]: event.target.value })
  }
  render() {
    return (
      <div className="paper-container-wrapper">
        <Paper
          elevation={24}
          className="paper-container paper-container--short"
        >
          <div className="paper-container__header">
            <div className="paper-container__header__left">
              Registration: E-mail address
            </div>
            <div className="paper-container__header__right">1 / 3</div>
          </div>
          <div>
            <img
              className="paper-container__text--large"
              src={require('assets/email.svg')}
              alt="email illustration"
            />
            <div className="paper-container__text--large">
              Welcome to Impacti CONNECT.
              <br />
              Sign up now for your free 3-month trial.
            </div>
            <div className="paper-container__text--medium">
              Please provide your e-mail address:
            </div>
            <form>
              <FormControl className="paper-container__text--large" fullWidth>
                <Input
                  id="email"
                  name="email"
                  value={this.state.email}
                  onChange={this.handleChange}
                />
                <FormHelperText error>{this.state.errorText}</FormHelperText>
              </FormControl>
              <br />
              <br />
              <Button
                variant="contained"
                type="submit"
                onClick={this.nextStep}
                color="primary"
                disabled={this.state.emailInvalid}
              >
                Next
                <img src={IcoArrowRight} alt="->" className="arrowRightIco" />
              </Button>
            </form>
          </div>
          <div className="paper-container__footer">
            If you have any issues with creating your account, please contact{' '}
            <a href={`mailto:${'discover@impacti.solutions'}`}>
              discover@impacti.solutions
            </a>
            .
          </div>
        </Paper>
      </div>
    )
  }
}
export default SetupAccountEmail
