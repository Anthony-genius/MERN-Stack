import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Paper from '@material-ui/core/Paper'
import Chip from '@material-ui/core/Chip'
import TextField from '@material-ui/core/TextField'
import Close from '@material-ui/icons/Close'
import Avatar from '@material-ui/core/Avatar'
import PropTypes from 'prop-types'

const styles = theme => ({
  paperContainer: {
    padding: '0 0 15px'
  },
  countriesList: {
    height: 190,
    overflow: 'auto',
    padding: '10px 20px 20px 20px',
    textAlign: 'left',
    [theme.breakpoints.down('sm')]: {
      countriesList: {
        float: 'none',
        width: '62vw'
      }
    }
  },
  standaloneContainer: {
    width: '100% !important',
    boxShadow: 'none !important',
    paddingTop: '50px !important'
  },
  selectedCountries: {
    display: 'flex',
    flexDirection: 'row',
    maxWidth: '28vw',
    flexWrap: 'wrap',
    margin: 3
  },
  chip: {
    backgroundColor: '#ff6d00',
    borderRadius: 5,
    boxShadow: 'rgba(0, 0, 0, 0.12) 0 1px 6px, rgba(0, 0, 0, 0.12) 0 1px 4px',
    color: 'rgba(255, 255, 255, 0.87)',
    margin: 10,
    padding: 10,
    height: 50,
    fontWeight: 'bold',
    fontSize: 16
  },
  closeIcon: {
    backgroundColor: 'transparent',
    order: 1,
    width: 17,
    color: '#fafafa'
  },
  bottomButton: {
    [theme.breakpoints.down('sm')]: {
      marginBottom: theme.spacing.unit * 10
    }
  }
})

class ProfileCountriesDialog extends Component {
  constructor(props, ctx) {
    super(props, ctx)
    this.state = {
      selectedCountries: this.props.prefill ? this.props.prefill.countries : [],
      visibleCountries: this.props.countries.sort((a, b) =>
        a.name < b.name ? -1 : 1
      )
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

  removeCountry = country => {
    new Promise(async (resolve, reject) => {
      try {
        await this.setState({
          selectedCountries: this.state.selectedCountries.filter(
            e => e._id !== country._id
          )
        })

        this.props.onSave(this.state.selectedCountries)

        resolve()
      } catch (error) {
        reject(error)
      }
    })
  }

  addCountry = country =>
    new Promise(async (resolve, reject) => {
      try {
        await this.setState({
          selectedCountries: [
            ...new Set([...this.state.selectedCountries, country])
          ]
        })

        this.props.onSave(this.state.selectedCountries)

        resolve()
      } catch (error) {
        reject(error)
      }
    })

  toggleCountry(country, event) {
    if (event.target.checked) {
      this.addCountry(country)
    } else {
      this.removeCountry(country)
    }
  }

  render() {
    const { selectedCountries, visibleCountries } = this.state
    const { classes } = this.props

    return (
      <Paper elevation={4} className={classes.paperContainer}>
        <Paper elevation={2} className={classes.countriesList}>
          <TextField
            id="filterCountriesText"
            value={this.props.countryName}
            onChange={this.handleChange}
            autoFocus
          />
          <FormGroup>
            {visibleCountries.map(country => (
              <FormControlLabel
                key={country._id}
                control={
                  <Checkbox
                    checked={
                      !!selectedCountries.find(({ _id }) => _id === country._id)
                    }
                    color="primary"
                    onChange={event => this.toggleCountry(country, event)}
                  />
                }
                label={country.name}
              />
            ))}
          </FormGroup>
        </Paper>
        <div className={classes.selectedCountries}>
          {selectedCountries.map(country => (
            <Chip
              key={country._id}
              onClick={() => this.removeCountry(country)}
              className={classes.chip}
              label={country.name}
              avatar={
                <Avatar className={classes.closeIcon}>
                  <Close />
                </Avatar>
              }
            />
          ))}
        </div>
      </Paper>
    )
  }
}

ProfileCountriesDialog.defaultProps = {
  prefill: {
    countries: []
  },
  countries: [],
  onSave: () => {},
  isStandalone: false
}

ProfileCountriesDialog.propTypes = {
  prefill: PropTypes.shape({
    countries: PropTypes.array
  }),
  countries: PropTypes.array,
  onSave: PropTypes.func
}

export default withStyles(styles)(ProfileCountriesDialog)
