import React, { Component } from 'react'
import { connect } from 'react-redux'

import Paper from '@material-ui/core/Paper'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import Button from '@material-ui/core/Button'
import Input from '@material-ui/core/Input'

import IcoArrowRight from 'assets/ico-arrow-right.svg'

class FirstMemberCapacity extends Component {
  constructor(props, context) {
    super(props, context)
    this.nextStep = this.nextStep.bind(this)
    this.goToPrevStep = this.goToPrevStep.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.state = {
      capacity: this.props.organizationData.capacity
        ? this.props.organizationData.capacity
        : '',
      age: ''
    }
  }

  nextStep() {
    const data = { capacity: this.state.capacity }
    this.props.saveValues(data)
    this.props.nextStep()
  }
  goToPrevStep() {
    this.props.prevStep()
  }

  handleChange(event) {
    this.props.setCapacity(
      this.props.capacityList.find(e => e._id === event.target.value)
    )
    this.setState({ capacity: event.target.value })
  }
  render() {
    return (
      <div>
        <Paper elevation={4} className="paper-container">
          <div className="paper-container__header">
            <div className="paper-container__header__left">Member details</div>
            <div className="paper-container__header__right">3 / 6</div>
          </div>
          <div>
            <div className="paper-container__text--large">
              What is <strong>{this.props.member.name}</strong> capacity?
            </div>
            <div className="paper-container__text--small">
              Select from predefined or define your own
            </div>
            <Select
              fullWidth
              name="capacity"
              value={this.state.capacity}
              onChange={this.handleChange}
              input={<Input id="capacity-value" />}
            >
              {this.props.capacityList.map(cap => (
                <MenuItem value={cap._id} key={cap._id}>
                  {cap.name}
                </MenuItem>
              ))}
            </Select>
            <div>
              <br />
              <br />
              <Button
                variant="contained"
                onClick={this.nextStep}
                color="primary"
                disabled={!this.props.member.capacity._id}
              >
                NEXT
                <img src={IcoArrowRight} alt="->" className="arrowRightIco" />
              </Button>
            </div>
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
  state => ({
    member: state.memberWizard,
    capacityList: state.dictionaries.capacity
  }),
  dispatch => ({
    setCapacity: data => dispatch({ type: 'SET_CAPACITY', data })
  })
)(FirstMemberCapacity)
