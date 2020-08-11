import React, { Component } from 'react'
import { connect } from 'react-redux'
import CountriesDialog from 'components/CountriesDialog'

class FirstMemberCountry extends Component {
  constructor(props, context) {
    super(props, context)

    this.state = {
      errorText: '',
      prefill: this.props.member.countries ? this.props.member.countries : []
    }
  }

  save(data) {
    this.props.setCountries(data)
    this.props.nextStep()
  }

  render() {
    return (
      <div>
        <CountriesDialog
          companyName={this.props.companyName}
          countries={this.props.allCountries}
          prefillCountries={this.state.prefill}
          onBack={() => this.props.prevStep()}
          onSave={data => this.save(data)}
        />
      </div>
    )
  }
}

export default connect(
  state => ({
    member: state.memberWizard,
    companyName: state.memberWizard.name,
    allCountries: state.dictionaries.country
  }),
  dispatch => ({
    setCountries: countries =>
      dispatch({ type: 'SET_ORGANIZATION_COUNTRIES', data: countries })
  })
)(FirstMemberCountry)
