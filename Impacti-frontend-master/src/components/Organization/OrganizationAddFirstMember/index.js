import React, { Component } from 'react'
import ImpactiButton, { BUTTON_TYPES } from 'components/ImpactiButton'
import FirstMemberName from './FirstMemberName'
import FirstMemberSectors from './FirstMemberSectors'
import FirstMemberOrganizationType from './FirstMemberOrganizationType'
import FirstMemberCapacity from './FirstMemberCapacity/index'
import FirstMemberWorkersNumber from './FirstMemberWorkersNumber'
import FirstMemberCountry from './FirstMemberCountry'
import FirstMemberCurrency from './FirstMemberCurrency'
import FirstMemberAdded from './FirstMemberAdded'
import STEPS from './../../../constants/wizardSteps'
import styles from './style.module.css'

class OrganizationAddFirstMember extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      step: 1
    }
    this.setState = this.setState.bind(this)
    this.nextStep = this.nextStep.bind(this)
    this.prevStep = this.prevStep.bind(this)
    this.saveValues = this.saveValues.bind(this)
    this.organizationData = {
      name: null,
      types: [],
      capacity: null,
      workersNumber: null,
      countries: [],
      currency: null,
      industries: [],
      sectors: []
    }
  }

  content() {
    switch (this.state.step) {
      case STEPS.NAME:
        return (
          <FirstMemberName
            nextStep={this.nextStep}
            saveValues={this.saveValues}
            organizationData={this.organizationData}
          />
        )
      case STEPS.SECTORS:
        return (
          <FirstMemberSectors
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            saveValues={this.saveValues}
            organizationData={this.organizationData}
          />
        )
      case STEPS.TYPE:
        return (
          <FirstMemberOrganizationType
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            saveValues={this.saveValues}
            organizationData={this.organizationData}
          />
        )
      case STEPS.CAPACITY:
        return (
          <FirstMemberCapacity
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            saveValues={this.saveValues}
            organizationData={this.organizationData}
          />
        )
      case STEPS.WORKERS_NR:
        return (
          <FirstMemberWorkersNumber
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            saveValues={this.saveValues}
            organizationData={this.organizationData}
          />
        )
      case STEPS.COUNTRY:
        return (
          <FirstMemberCountry
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            saveValues={this.saveValues}
            organizationData={this.organizationData}
          />
        )
      case STEPS.CURRENCY:
        return (
          <FirstMemberCurrency
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            saveValues={this.saveValues}
            organizationData={this.organizationData}
          />
        )
      case STEPS.CONFIRMATION:
        return (
          <FirstMemberAdded
            nextStep={this.nextStep}
            organizationData={this.organizationData}
          />
        )
      default:
        return <div />
    }
  }

  saveValues(fields) {
    this.organizationData = Object.assign({}, this.organizationData, fields)
    return this.organizationData
  }

  nextStep() {
    this.setState({
      step: this.state.step + 1
    })
  }

  prevStep() {
    this.setState({
      step: this.state.step - 1
    })
  }

  render() {
    return (
      <div>
        <div className={styles.organizationHeader}>
          Add members to your journey
        </div>
        <div
          className={styles.organizationBackground}
          style={{ borderImage: "url('/assets/border.png') 1 round" }}
        >
          {this.content()}
        </div>
        <div className={styles.organizationFooter}>
          <ImpactiButton
            buttonType={BUTTON_TYPES.SAVE_AND_PROCEED}
            disabled
            onClick={() => this.props.closeModal()}
          />
        </div>
      </div>
    )
  }
}

export default OrganizationAddFirstMember
