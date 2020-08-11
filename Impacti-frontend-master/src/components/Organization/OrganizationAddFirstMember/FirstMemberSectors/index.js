import React, { Component } from 'react'
import { connect } from 'react-redux'
import { nodeById } from 'selectors/organization'

import SectorsAndIndustriesDialog from '../../../SectorsAndIndustriesDialog'

class FirstMemberSectors extends Component {
  save(selectedSectors, selectedIndustries) {
    this.props.saveSectorsAndIndustries(selectedSectors, selectedIndustries)
    this.props.nextStep()
  }

  render() {
    return (
      <div>
        <SectorsAndIndustriesDialog
          companyName={this.props.wizardData.name}
          onSave={(s, i) => this.save(s, i)}
          sectors={this.props.dictionaries.sector}
          industries={this.props.dictionaries.industry}
          prefill={this.props.prefill}
        />
      </div>
    )
  }
}

export default connect(
  (state, ownProps) => ({
    wizardData: ownProps.id
      ? nodeById(ownProps.id, state)(state.organization)
      : state.memberWizard,
    dictionaries: state.dictionaries,
    prefill: {
      sectors: state.memberWizard.sectors,
      industries: state.memberWizard.industries
    }
  }),
  dispatch => ({
    saveSectorsAndIndustries: (sectors, industries) =>
      dispatch({
        type: 'SET_INDUSTRIES_AND_SECTORS',
        data: { sectors, industries }
      })
  })
)(FirstMemberSectors)
