import React, { Component } from 'react'
import { connect } from 'react-redux'

import Paper from '@material-ui/core/Paper'
import Input from '@material-ui/core/Input'
import FormControl from '@material-ui/core/FormControl'
import Button from '@material-ui/core/Button'

import IcoArrowRight from 'assets/ico-arrow-right.svg'

class FirstMemberWorkersNumber extends Component {
  constructor(props, context) {
    super(props, context)
    this.nextStep = this.nextStep.bind(this)
    this.goToPrevStep = this.goToPrevStep.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.state = {
      workersNumber: this.props.organizationData.workersNumber
        ? this.props.organizationData.workersNumber
        : '',
      errorText: '',
      workersNumberInvalid: false
    }
  }
  nextStep(e) {
    e.preventDefault()
    this.props.setWorkersNumber(this.state.workersNumber)
    this.props.nextStep()
  }
  goToPrevStep() {
    this.props.prevStep()
  }

  handleChange(event) {
    event.persist()
    if (event.target.value < 0) {
      this.setState({ errorText: 'Value must be greater than 0' })
      this.setState({ workersNumberInvalid: true })
    } else {
      this.setState({ errorText: '' })
      this.setState({ workersNumberInvalid: false })
    }
    this.setState({ [event.target.name]: event.target.value })
  }
  render() {
    return (
      <div>
        <Paper elevation={4} className="paper-container">
          <div className="paper-container__header">
            <div className="paper-container__header__left">Member details</div>
            <div className="paper-container__header__right">4 / 6</div>
          </div>
          <div>
            <div className="paper-container__text--large">
              On average, how many people are working for{' '}
              {this.props.member.name}?
            </div>
            <div className="paper-container__text--small">
              Provide us a number:
            </div>
            <form>
              <FormControl className="paper-container__text--large">
                <Input
                  type="number"
                  id="workersNumber"
                  name="workersNumber"
                  value={this.state.workersNumber}
                  onChange={this.handleChange}
                  autoFocus
                />
              </FormControl>
              <div className="paper-container__text--supersmall">
                This information is not mandatory at this point, so you can skip
                it if desired.
              </div>
              <div>
                <br />
                <br />
                <Button
                  variant="contained"
                  type="submit"
                  onClick={this.nextStep}
                  color="primary"
                  disabled={this.state.workersNumberInvalid}
                >
                  NEXT
                  <img src={IcoArrowRight} alt="->" className="arrowRightIco" />
                </Button>
              </div>
            </form>
            <div
              className="paper-container__backbutton"
              onClick={this.goToPrevStep}
              role="link"
              tabIndex="0"
            >
              GO BACK
            </div>
          </div>
        </Paper>
      </div>
    )
  }
}
export default connect(
  state => ({ member: state.memberWizard }),
  dispatch => ({
    setWorkersNumber: number => dispatch({ type: 'SET_WORKERS_NUMBER', number })
  })
)(FirstMemberWorkersNumber)
