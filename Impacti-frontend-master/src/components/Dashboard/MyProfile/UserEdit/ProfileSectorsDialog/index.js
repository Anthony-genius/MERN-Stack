import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import PropTypes from 'prop-types'
import ImpactiChip from 'components/ImpactiChip/index'

const stylesJs = {
  sectorActive: {
    backgroundColor: 'rgba(255, 109, 0, 0.1)'
  }
}

const styles = theme => ({
  paperContainer: {
    '& > div': {
      [theme.breakpoints.down('sm')]: {
        paddingRight: '20px'
      }
    }
  },
  listContainer: {
    margin: '0 auto',
    width: '100%'
  },
  sectorsList: {
    float: 'left',
    height: '540px',
    marginRight: '20px',
    overflow: 'auto',
    padding: '5px 0 5px 0',
    textAlign: 'left',
    width: '270px',
    marginBottom: '20px',
    backgroundColor: '#fafafa',
    [theme.breakpoints.down('sm')]: {
      marginRight: 'auto',
      width: '100%',
      height: '240px'
    },
    '& label': {
      maxWidth: '230px',
      width: '100%'
    }
  },
  sectorsListHeader: {
    float: 'left',
    fontSize: '14px',
    marginRight: '20px',
    paddingBottom: '20px',
    paddingTop: '50px',
    textAlign: 'left',
    width: '300px'
  },
  sectorsList__sector: {
    paddingLeft: '15px'
  },
  industriesCounter: {
    backgroundColor: 'var(--primaryColor)',
    borderRadius: '50%',
    color: '#ffffff',
    float: 'right',
    fontSize: '11px',
    fontWeight: '900',
    height: '18px',
    lineHeight: '20px',
    margin: '15px 5px 15px 0',
    textAlign: 'center',
    verticalAlign: 'middle',
    width: '18px'
  },
  industriesList: {
    height: 540,
    maxWidth: 300,
    overflow: 'auto',
    padding: '20px 10px',
    textAlign: 'left',
    border: '1px solid #eeeeee',
    marginBottom: '20px',
    [theme.breakpoints.down('sm')]: {
      height: '240px',
      maxWidth: '100%'
    },
    '& > div': {
      [theme.breakpoints.down('sm')]: {
        fontSize: '14px !important',
        margin: '5px !important',
        padding: '0px !important',
        height: '40px !important',
        maxWidth: '96%'
      }
    }
  },
  industriesList__name: {
    fontSize: '14px',
    fontWeight: 'bold',
    color: 'var(--grayBlueColor)',
    padding: '0 10px 15px 10px'
  },
  industriesListHeader: {
    fontSize: '14px',
    overflow: 'auto',
    paddingBottom: '20px',
    paddingTop: '50px',
    textAlign: 'left'
  },
  industriesLabel: {
    boxShadow: '0 1px 6px rgba(0, 0, 0, .12), 0 1px 4px rgba(0, 0, 0, .12)',
    float: 'left',
    '& span': {
      whiteSpace: 'initial'
    }
  },
  colorLabel: {
    color: 'var(--primaryColor)'
  },
  nextButton: {
    marginTop: '15px'
  },
  sectorArrow: {
    width: '0',
    position: 'absolute',
    height: '0',
    left: '371px',
    '& ::before': {
      width: '0',
      position: 'absolute',
      height: '0',
      content: '""',
      top: '10px',
      borderRight: '15px solid #eeeeee',
      borderTop: '12px solid transparent',
      borderBottom: '12px solid transparent'
    },
    '& ::after': {
      width: '0',
      position: 'absolute',
      left: '2px',
      top: '11px',
      height: '0',
      content: '""',
      borderRight: '14px solid #ffffff',
      borderTop: '11px solid transparent',
      borderBottom: '11px solid transparent'
    }
  },
  standaloneContainer: {
    width: '100% !important',
    boxShadow: 'none !important',
    paddingTop: '50px !important'
  }
})

class ProfileSectorsDialog extends Component {
  constructor(props, context) {
    super(props, context)
    this.isIndustryChecked = this.isIndustryChecked.bind(this)
    this.isSectorChecked = this.isSectorChecked.bind(this)
    this.countIndustries = this.countIndustries.bind(this)

    const { industries, sectors, prefill } = props

    this.state = {
      open: false,
      orgName: '',
      errorText: '',
      orgNameInvalid: true,
      displayedIndustries: [],
      displayedSector: {},
      selectedSector: {},
      industries: industries || [],
      sectors: sectors || [],
      selectedIndustries: prefill ? prefill.industries : [],
      selectedSectors: prefill ? prefill.sectors : []
    }
  }

  getUpdatedIndustryState = industry => {
    new Promise(async (resolve, reject) => {
      try {
        await this.setState({
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
        })
        this.props.updateSectors(this.state.selectedSectors)
        this.props.updateIndustries(this.state.selectedIndustries)

        resolve()
      } catch (error) {
        reject(error)
      }
    })
  }

  getDeletedIndustryState(industry) {
    const nextIndustries = this.state.selectedIndustries.filter(
      e => e._id !== industry._id
    )
    new Promise(async (resolve, reject) => {
      try {
        await this.setState({
          selectedIndustries: nextIndustries
        })
        await this.setState({
          selectedSectors: this.props.sectors.filter(
            e =>
              e.industries.filter(x =>
                this.state.selectedIndustries.some(a => a._id === x._id)
              ).length > 0
          )
        })
        this.props.updateSectors(this.state.selectedSectors)
        this.props.updateIndustries(this.state.selectedIndustries)

        resolve()
      } catch (error) {
        reject(error)
      }
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

  toggleSector = sector => {
    if (this.isSectorChecked(sector._id)) {
      this.setState({
        selectedSectors: this.state.selectedSectors.filter(
          e => e._id !== sector._id
        )
      })
    } else {
      this.getUpdatedSectorState(sector)
    }
  }
  toggleIndustry(industry) {
    if (this.isIndustryChecked(industry._id)) {
      this.getDeletedIndustryState(industry)
    } else {
      this.getUpdatedIndustryState(industry)
    }
  }

  render() {
    const { classes, sectors } = this.props
    return (
      <div elevation={4} className={classes.paperContainer}>
        <div className={classes.listContainer}>
          <Paper elevation={10} className={classes.sectorsList}>
            {sectors.map(sector => (
              <div
                key={sector._id}
                className={classes.sectorsList__sector}
                style={
                  sector._id === this.state.selectedSector._id
                    ? stylesJs.sectorActive
                    : {}
                }
              >
                {this.countIndustries(sector) > 0 && (
                  <div className={classes.industriesCounter}>
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
                    this.isSectorChecked(sector) ? classes.colorLabel : ''
                  }
                />
              </div>
            ))}
          </Paper>
          {this.state.selectedSector.industries && (
            <div className={classes.industriesList}>
              <div className={classes.industriesList__name}>
                {this.state.selectedSector.name}
              </div>

              {this.state.selectedSector.industries.map(ind => (
                <ImpactiChip
                  key={ind._id}
                  isActive={(() => this.isIndustryChecked(ind._id))()}
                  onClick={() => this.toggleIndustry(ind)}
                  label={ind.name}
                  className={classes.industriesLabel}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    )
  }
}

ProfileSectorsDialog.defaultProps = {
  prefill: {
    sectors: [],
    industries: []
  },
  sectors: [],
  industries: []
}

ProfileSectorsDialog.propTypes = {
  prefill: PropTypes.shape({
    sectors: PropTypes.array,
    industries: PropTypes.array
  }),
  sectors: PropTypes.array,
  industries: PropTypes.array
}

export default withStyles(styles)(ProfileSectorsDialog)
