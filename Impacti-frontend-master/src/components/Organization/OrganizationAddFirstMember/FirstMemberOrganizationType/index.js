import React, { Component } from 'react'
import { connect } from 'react-redux'

import TypesDialog from 'components/TypesDialog'

class FirstMemberOrganizationType extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      errorText: '',
      prefill: this.props.member.types ? this.props.member.types : []
    }
  }

  save(data) {
    this.props.setTypes(data)
    this.props.nextStep()
  }

  render() {
    return (
      <div>
        <TypesDialog
          companyName={this.props.companyName}
          types={this.props.allTypes}
          prefillTypes={this.state.prefill}
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
    allTypes: state.dictionaries.organizationType
  }),
  dispatch => ({
    setTypes: types => dispatch({ type: 'SET_ORGANIZATION_TYPES', data: types })
  })
)(FirstMemberOrganizationType)
