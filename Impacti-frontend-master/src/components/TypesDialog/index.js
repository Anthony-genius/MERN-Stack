import React, { Component } from 'react'
import Paper from '@material-ui/core/Paper'
import PropTypes from 'prop-types'
import ImpactiButton, { BUTTON_TYPES } from 'components/ImpactiButton'
import ImpactiChip, { CHIP_TYPES } from '../ImpactiChip'
import styles from './styles.module.css'

class OrganizationTypeDialog extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      selectedTypes: this.props.prefillTypes
    }
  }

  isTypeChecked(type) {
    return this.state.selectedTypes.some(e => e._id === type._id)
  }

  addType(type) {
    this.setState({
      selectedTypes: [...new Set([...this.state.selectedTypes, type])]
    })
  }
  removeType(type) {
    this.setState({
      selectedTypes: this.state.selectedTypes.filter(e => e._id !== type._id)
    })
  }
  toggleType(type) {
    if (this.isTypeChecked(type)) {
      this.removeType(type)
    } else {
      this.addType(type)
    }
  }
  render() {
    return (
      <Paper
        elevation={4}
        className={`${
          this.props.isStandalone
            ? styles.standaloneContainer
            : 'paper-container--short'
        } paper-container`}
      >
        {!this.props.isStandalone ? (
          <div className="paper-container__header">
            <div className="paper-container__header__left">Member details</div>
            <div className="paper-container__header__right">2 / 6</div>
          </div>
        ) : (
          <div />
        )}
        <div className="paper-container__member">
          <div>
            <div className="paper-container__text--large">
              How would you best describe{' '}
              <strong>{this.props.companyName}</strong>?
            </div>
            <div className="paper-container__text--small">
              Select all that apply:
            </div>
            <div>
              {this.props.types.map(orgType => (
                <ImpactiChip
                  chipType={CHIP_TYPES.ALTERNATIVE}
                  key={orgType._id}
                  isActive={(() => this.isTypeChecked(orgType))()}
                  onClick={() => {
                    this.toggleType(orgType)
                  }}
                  label={orgType.name}
                />
              ))}
            </div>
            <div className="clear" />
            <div>
              <br />
              <br />
              <ImpactiButton
                onClick={() => this.props.onSave(this.state.selectedTypes)}
                disabled={this.state.selectedTypes.length === 0}
                buttonType={
                  this.props.isStandalone
                    ? BUTTON_TYPES.SAVE
                    : BUTTON_TYPES.NEXT
                }
              />
            </div>
            <button
              className="paper-container__backbutton"
              onClick={() => this.props.onBack()}
            >
              GO BACK
            </button>
          </div>
        </div>
      </Paper>
    )
  }
}

OrganizationTypeDialog.defaultProps = {
  prefillTypes: [],
  types: [],
  onBack: () => {},
  onSave: () => {},
  companyName: '',
  isStandalone: false
}

OrganizationTypeDialog.propTypes = {
  prefillTypes: PropTypes.array,
  types: PropTypes.array,
  onBack: PropTypes.func,
  onSave: PropTypes.func,
  companyName: PropTypes.string,
  isStandalone: PropTypes.bool
}

export default OrganizationTypeDialog
