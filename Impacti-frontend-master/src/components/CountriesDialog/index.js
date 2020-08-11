import React from 'react'
import Paper from '@material-ui/core/Paper'
import Chip from '@material-ui/core/Chip'
import TextField from '@material-ui/core/TextField'
import Close from '@material-ui/icons/Close'
import Avatar from '@material-ui/core/Avatar'
import PropTypes from 'prop-types'
import ImpactiButton, { BUTTON_TYPES } from 'components/ImpactiButton'

import styles from './styles.module.css'

const stylesJs = {
  chip: {
    backgroundColor: '#ff6d00',
    borderRadius: '5px',
    boxShadow: 'rgba(0, 0, 0, 0.12) 0 1px 6px, rgba(0, 0, 0, 0.12) 0 1px 4px',
    color: 'rgba(255, 255, 255, 0.87)',
    margin: '10px',
    padding: '10px',
    height: 50,
    fontWeight: 'bold',
    fontSize: 16
  },
  closeIcon: {
    backgroundColor: 'transparent',
    order: 1,
    width: 17
  }
}

class CountriesDialog extends React.Component {
  constructor(props, ctx) {
    super(props, ctx)
    this.state = {
      selectedCountries: this.props.prefillCountries,
      visibleCountries: this.props.countries
    }
    this.handleChange = this.handleChange.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    if (
      this.props.countries.length === 0 &&
      this.state.visibleCountries.length === 0
    ) {
      this.setState({ visibleCountries: nextProps.countries })
    }
  }

  handleChange(event) {
    this.setState({
      visibleCountries: this.props.countries.filter(e =>
        e.name.toLowerCase().includes(event.target.value.toLowerCase())
      )
    })
  }

  removeCountry(country) {
    this.setState({
      selectedCountries: this.state.selectedCountries.filter(
        e => e._id !== country._id
      )
    })
  }

  addCountry(country) {
    this.setState({
      selectedCountries: [
        ...new Set([...this.state.selectedCountries, country])
      ]
    })
  }

  toggleCountry(country, event) {
    if (event.target.checked) {
      this.addCountry(country)
    } else {
      this.removeCountry(country)
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
            <div className="paper-container__header__right">5 / 6</div>
          </div>
        ) : (
          <div />
        )}
        <div className="paper-container__member">
          <div>
            <div className="paper-container__text--large">
              What countries does <strong>{this.props.companyName}</strong>{' '}
              operate in?
            </div>
            <Paper elevation={2} className={styles.countriesList}>
              <TextField
                id="filterCountriesText"
                value={this.props.countryName}
                onChange={this.handleChange}
                autoFocus
              />
              {this.state.visibleCountries
                .map(e =>
                  Object.assign(e, {
                    selected: this.state.selectedCountries.some(
                      x => x._id === e._id
                    )
                  })
                )
                .map(country => (
                  <div className="material-checkbox" key={country._id}>
                    <input
                      id={country._id}
                      type="checkbox"
                      onChange={event => this.toggleCountry(country, event)}
                      checked={country.selected}
                    />
                    <label htmlFor={country._id}>{country.name}</label>
                  </div>
                ))}
            </Paper>
            <div>
              {Array.isArray(this.state.selectedCountries) ? (
                this.state.selectedCountries.map(country => (
                  <Chip
                    key={country._id}
                    onClick={() => this.removeCountry(country)}
                    style={stylesJs.chip}
                    className="chip-default"
                    label={country.name}
                    avatar={
                      <Avatar style={stylesJs.closeIcon}>
                        <Close />
                      </Avatar>
                    }
                  />
                ))
              ) : (
                <div />
              )}
            </div>
            <div className="clear" />
            <div>
              <br />
              <ImpactiButton
                onClick={() => this.props.onSave(this.state.selectedCountries)}
                disabled={this.state.selectedCountries.length === 0}
                buttonType={
                  this.props.isStandalone
                    ? BUTTON_TYPES.SAVE
                    : BUTTON_TYPES.NEXT
                }
              />
            </div>
            <div
              className="paper-container__backbutton"
              onClick={() => this.props.onBack()}
              role="link"
              tabIndex="0"
            >
              GO BACK
            </div>
          </div>
        </div>
      </Paper>
    )
  }
}
CountriesDialog.defaultProps = {
  prefillCountries: [],
  countries: [],
  onBack: () => {},
  onSave: () => {},
  companyName: '',
  isStandalone: false
}

CountriesDialog.propTypes = {
  prefillCountries: PropTypes.array,
  countries: PropTypes.array,
  onBack: PropTypes.func,
  onSave: PropTypes.func,
  companyName: PropTypes.string,
  isStandalone: PropTypes.bool
}

export default CountriesDialog
