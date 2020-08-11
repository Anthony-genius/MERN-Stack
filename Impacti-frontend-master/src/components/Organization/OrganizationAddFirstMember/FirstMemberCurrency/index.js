import React, { Component } from 'react'
import { connect } from 'react-redux'

import Paper from '@material-ui/core/Paper'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import Button from '@material-ui/core/Button'
import Input from '@material-ui/core/Input'

import fetchAuth from 'actions/fetchDataAuth'
import API_CONSTANTS from 'constants/api'

import IcoArrowRight from 'assets/ico-arrow-right.svg'

class FirstMemberCurrency extends Component {
  constructor(props, context) {
    super(props, context)
    this.createEmptyUserAndMember = this.createEmptyUserAndMember.bind(this)
    this.goToPrevStep = this.goToPrevStep.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.state = {
      currency: this.props.organizationData.currency
        ? this.props.organizationData.currency
        : ''
    }
  }
  createEmptyUserAndMember() {
    fetchAuth(`${API_CONSTANTS.BASE_URL}/api/internal/member`, {
      method: 'POST',
      body: JSON.stringify(
        Object.assign({}, this.props.memberToRequest, {
          currency: this.state.currency
        })
      )
    })
      .then(res => res.json())
      .then(() => {
        this.props.nextStep()
      })
  }
  goToPrevStep() {
    this.props.prevStep()
  }

  handleChange(event) {
    this.setState({ currency: event.target.value })
  }
  render() {
    return (
      <div>
        <Paper elevation={4} className="paper-container">
          <div className="paper-container__header">
            <div className="paper-container__header__left">Member details</div>
            <div className="paper-container__header__right">6 / 6</div>
          </div>
          <div>
            <div className="paper-container__text--large">
              What currency does <strong>{this.props.member.name}</strong> use?
            </div>
            <div className="paper-container__text--small">
              Select from predefined
            </div>
            <Select
              name="currency"
              value={this.state.currency}
              onChange={this.handleChange}
              fullWidth
              input={<Input id="currency-value" />}
            >
              {this.props.currencyList.map(curr => (
                <MenuItem value={curr._id} key={curr._id}>
                  {`${curr.name} (${curr.shortName})`}
                </MenuItem>
              ))}
            </Select>
            <div>
              <Button
                variant="contained"
                onClick={this.createEmptyUserAndMember}
                color="primary"
                disabled={!this.state.currency}
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
export default connect(state => ({
  member: state.memberWizard,
  memberToRequest: Object.assign({}, state.memberWizard, {
    sectors: state.memberWizard.sectors.map(e => e._id),
    countries: state.memberWizard.countries.map(e => e._id),
    industries: state.memberWizard.industries.map(e => e._id),
    types: state.memberWizard.types.map(e => e._id),
    capacity: state.memberWizard.capacity._id,
    currency: state.memberWizard.currency._id,
    workersNumber: state.memberWizard.workersNumber,
    name: state.memberWizard.name
  }),
  currencyList: state.dictionaries.currency
}))(FirstMemberCurrency)
