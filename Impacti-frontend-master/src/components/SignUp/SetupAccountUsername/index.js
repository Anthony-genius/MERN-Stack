import React, { Component } from 'react'

import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import Input from '@material-ui/core/Input'
import FormControl from '@material-ui/core/FormControl'
import FormHelperText from '@material-ui/core/FormHelperText'

import IcoArrowRight from 'assets/ico-arrow-right.svg'

class SetupAccountUsername extends Component {
  constructor(props, context) {
    super(props, context)
    this.nextStep = this.nextStep.bind(this)
    this.goToPrevStep = this.goToPrevStep.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.state = {
      username: this.props.fieldValues.username
        ? this.props.fieldValues.username
        : '',
      errorText: '',
      usernameInvalid: !this.props.fieldValues.username
    }
  }
  handleChange(event) {
    event.persist()
    if (!event.target.value) {
      this.setState({ errorText: 'This field is required' })
      this.setState({ usernameInvalid: true })
    } else {
      this.setState({ errorText: '' })
      this.setState({ usernameInvalid: false })
    }
    this.setState({ [event.target.name]: event.target.value })
  }
  nextStep(e) {
    e.preventDefault()
    const data = { username: this.state.username }
    this.props.saveValues(data)
    this.props.nextStep()
  }
  goToPrevStep(e) {
    e.preventDefault()
    this.props.prevStep()
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
              Registration: Username
            </div>
            <div className="paper-container__header__right">2 / 3</div>
          </div>
          <div>
            <img
              className="paper-container__text--large"
              src={require('assets/impacti-shield.svg')}
              alt="shield illustration"
            />
            <div className="paper-container__text--large">
              What&apos;s your company's name?
            </div>
            <form>
              <FormControl className="paper-container__text--large" fullWidth>
                <Input
                  id="username"
                  name="username"
                  value={this.state.username}
                  onChange={this.handleChange}
                  autoFocus
                />
                <FormHelperText error>{this.state.errorText}</FormHelperText>
              </FormControl>
              <br />
              <br />
              <div>
                <Button
                  variant="contained"
                  type="submit"
                  onClick={this.nextStep}
                  color="primary"
                  disabled={this.state.usernameInvalid}
                >
                  Next
                  <img src={IcoArrowRight} alt="->" className="arrowRightIco" />
                </Button>
              </div>
            </form>
            <div>
              <div
                className="paper-container__backbutton"
                onClick={this.goToPrevStep}
                role="link"
                tabIndex="0"
              >
                GO BACK
              </div>
            </div>
          </div>
          <div className="paper-container__footer">
            If you’ll need any assist during registration process -{' '}
            <div style={{ cursor: 'pointer' }} className="linkColoured">
              read our help!
            </div>
          </div>
        </Paper>
      </div>
    )
  }
}
export default SetupAccountUsername
