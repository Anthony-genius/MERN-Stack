import React, { Component } from 'react'
import Paper from '@material-ui/core/Paper'
import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import PropTypes from 'prop-types'
import ImpactiChip from '../ImpactiChip/index'
import styles from './styles.module.css'
import ImpactiButton, { BUTTON_TYPES } from 'components/ImpactiButton'

const stylesJs = {
  sectorActive: {
    backgroundColor: 'rgba(255, 109, 0, 0.1)'
  },
  greyPaper: {
    backgroundColor: '#fafafa'
  }
}

class SectorsAndIndustriesDialog extends Component {
  constructor(props, context) {
    super(props, context)
    this.isIndustryChecked = this.isIndustryChecked.bind(this)
    this.isSectorChecked = this.isSectorChecked.bind(this)
    this.countIndustries = this.countIndustries.bind(this)
    this.state = {
      orgName: '',
      errorText: '',
      orgNameInvalid: true,
      allSectors: [],
      displayedIndustries: [],
      displayedSector: {},
      selectedSector: {},
      industries: this.props.industries ? this.props.industries : [],
      sectors: this.props.sectors ? this.props.sectors : [],
      selectedIndustries: this.props.prefill
        ? this.props.prefill.industries
        : [],
      selectedSectors: this.props.prefill ? this.props.prefill.sectors : []
    }
  }

  getUpdatedIndustryState(industry) {
    return {
      selectedIndustries: [
        ...new Set([...this.state.selectedIndustries, industry])
      ],
      selectedSectors: this.props.sectors.filter(
        e =>
          e.industries.filter(
            x =>
              this.state.selectedIndustries.some(a => a._id === x._id) ||
              x._id === industry._id
          ).length > 0
      )
    }
  }
  getDeletedIndustryState(industry) {
    const nextIndustries = this.state.selectedIndustries.filter(
      e => e._id !== industry._id
    )

    return Object.assign({}, this.state, {
      selectedIndustries: nextIndustries,
      selectedSectors: this.state.selectedSectors.filter(e =>
        e.industries.filter(x => nextIndustries.some(a => a._id === x._id))
      )
    })
  }
  getDisplayedSectorState() {
    return {
      sectors: this.props.sectors.filter(
        e =>
          e.industries.filter(x =>
            this.state.industries.some(a => a._id === x._id)
          ).length > 0
      )
    }
  }
  countIndustries(sector) {
    let count = 0
    const _this = this
    sector.industries.forEach(sec => {
      if (_this.state.selectedIndustries.some(e => e._id === sec._id)) {
        count += 1
      }
    })
    return count
  }
  isIndustryChecked(indID) {
    return this.state.selectedIndustries.some(e => e._id === indID)
  }
  isSectorChecked(sector) {
    const _this = this
    let count = 0
    sector.industries.forEach(sec => {
      if (_this.state.selectedIndustries.some(e => e._id === sec._id)) {
        count += 1
      }
    })
    return count > 0
  }
  toggleIndustry(industry) {
    if (this.isIndustryChecked(industry._id)) {
      this.setState(this.getDeletedIndustryState(industry))
    } else {
      this.setState(this.getUpdatedIndustryState(industry))
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
            <div className="paper-container__header__right">1 / 6</div>
          </div>
        ) : (
          <div />
        )}
        <div className="paper-container__member">
          <div>
            <div className="paper-container__text--large">
              In what sector(s) and industries does{' '}
              <strong>{this.props.companyName}</strong> operate?
            </div>
            <div className={styles.sectorsListHeader}>
              Select all the <strong>Sectors</strong> that apply:
            </div>
            <div className={styles.industriesListHeader}>
              Select all the <strong>Industries</strong> within choosen sector:
            </div>
            <Paper
              elevation={10}
              className={styles.sectorsList}
              style={stylesJs.greyPaper}
            >
              {this.props.sectors.map(sector => (
                <div
                  key={sector._id}
                  className={styles.sectorsList__sector}
                  style={
                    sector._id === this.state.selectedSector._id
                      ? stylesJs.sectorActive
                      : {}
                  }
                >
                  {this.countIndustries(sector) > 0 && (
                    <div className={styles.industriesCounter}>
                      {this.countIndustries(sector)}
                    </div>
                  )}
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={this.isSectorChecked(sector)}
                        onChange={() => {
                          this.setState({ selectedSector: sector })
                          this.getDisplayedSectorState()
                        }}
                      />
                    }
                    label={sector.name}
                    className={
                      this.isSectorChecked(sector) ? styles.colorLabel : ''
                    }
                  />
                </div>
              ))}
            </Paper>
            <div className={styles.industriesList}>
              <div className={styles.industriesList__name}>
                {this.state.selectedSector.name}
              </div>
              {this.state.selectedSector.industries ? (
                this.state.selectedSector.industries.map(ind => (
                  <ImpactiChip
                    key={ind._id}
                    isActive={(() => this.isIndustryChecked(ind._id))()}
                    onClick={() => this.toggleIndustry(ind)}
                    label={ind.name}
                  />
                ))
              ) : (
                <div />
              )}
            </div>
            <div>
              <br />
              <br />
              <ImpactiButton
                onClick={() =>
                  this.props.onSave(
                    this.state.selectedSectors,
                    this.state.selectedIndustries
                  )
                }
                disabled={
                  this.state.selectedSectors.length === 0 ||
                  this.state.selectedIndustries.length === 0
                }
                buttonType={
                  this.props.isStandalone
                    ? BUTTON_TYPES.SAVE
                    : BUTTON_TYPES.NEXT
                }
              />
            </div>
          </div>
        </div>
      </Paper>
    )
  }
}

SectorsAndIndustriesDialog.defaultProps = {
  prefill: {
    sectors: [],
    industries: []
  },
  sectors: [],
  industries: [],
  onSave: () => {},
  companyName: ''
}

SectorsAndIndustriesDialog.propTypes = {
  prefill: PropTypes.shape({
    sectors: PropTypes.array,
    industries: PropTypes.array
  }),
  sectors: PropTypes.array,
  industries: PropTypes.array,
  onSave: PropTypes.func,
  companyName: PropTypes.string
}

export default SectorsAndIndustriesDialog
