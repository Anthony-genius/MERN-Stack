import React from 'react'
import { findDOMNode } from 'react-dom'
import TextField from '@material-ui/core/TextField'
import { Button, Select } from '@material-ui/core'
import Chip from '@material-ui/core/Chip'
import Popover from '@material-ui/core/Popover'
import Grid from '@material-ui/core/Grid'
import IconAdd from '@material-ui/icons/Add'
import IconClose from '@material-ui/icons/Close'
import IconEdit from '@material-ui/icons/Edit'
import Avatar from '@material-ui/core/Avatar'
import FormControl from '@material-ui/core/FormControl'
import FormHelperText from '@material-ui/core/FormHelperText'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import Dialog from '@material-ui/core/Dialog'
import LoadingSpinner, { SPINNER_TYPES } from 'components/LoadingSpinner'
import EditSectorsModal from './editSectorsModal'
import styles from './styles.module.css'
import CountriesDialog from '../../CountriesDialog'
import TypesDialog from '../../TypesDialog'
import { defaultTextColor } from 'constants/inlineStyles'

const stylesJs = {
  chip: {
    backgroundColor: '#ff6d00',
    borderRadius: 5,
    color: 'rgba(255, 255, 255, 0.87)',
    margin: '5px 10px 5px 0',
    padding: 10,
    height: 30,
    fontWeight: 'bold',
    fontSize: 12
  },
  edit: {
    backgroundColor: '#ffffff',
    border: `1px solid ${defaultTextColor}`,
    borderRadius: 5,
    boxShadow: 'none',
    margin: '5px 10px 5px 0',
    padding: 10,
    height: 30,
    fontWeight: 'bold',
    fontSize: 12
  },
  closeIcon: {
    backgroundColor: 'transparent',
    cursor: 'pointer',
    order: 1,
    width: 17
  },
  addIcon: {
    backgroundColor: 'transparent',
    color: defaultTextColor,
    cursor: 'pointer',
    order: 1,
    width: 17,
    height: 17
  },
  smallButton: {
    height: 35,
    float: 'right',
    fontSize: 14,
    margin: '0 10px'
  }
}

export default class MemberForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      organization: {
        /* capacity: props.initial.capacity._id, */
        name: props.initial.name ? props.initial.name : '',
        workersNumber: props.initial.workersNumber
          ? props.initial.workersNumber
          : '',
        manager: props.initial.manager
          ? props.initial.manager
          : this.props.manager,
        sectors: props.initial.sectors ? props.initial.sectors : [],
        industries: props.initial.industries ? props.initial.industries : [],
        types: props.initial.types ? props.initial.types : [],
        countries: props.initial.countries ? props.initial.countries : [],
        currency: props.initial.currency ? props.initial.currency : '',
        parent: props.initial.parent
      },
      invalidWorkersNumber: false,
      anchorEl: null,
      popoverOpen: {},
      // modals state
      isEditSectorsModalOpen: false,
      isCountriesModalOpen: false,
      isTypesModalOpen: false
    }

    this.countIndustries = this.countIndustries.bind(this)
    this.updateField = this.updateField.bind(this)
  }

  handleSectorOpen(event, id) {
    this.setState({
      popoverOpen: {
        [id]: true
      },
      anchorEl: findDOMNode(event.target)
    })
  }

  handleSectorClose(id) {
    this.setState({
      popoverOpen: {
        [id]: false
      },
      anchorEl: null
    })
  }

  countIndustries(sector = []) {
    if (!Array.isArray(sector.industries)) {
      return 0
    }

    return sector.industries.reduce(
      (acc, industry) =>
        this.state.organization.industries.some(
          e => industry._id === e._id || e._id === industry
        )
          ? acc + 1
          : acc,
      0
    )
  }

  updateField(event) {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name
    this.setState({
      organization: {
        ...this.state.organization,
        [name]: value
      },
      invalidWorkersNumber: this.state.organization.workersNumber < 0
    })
  }

  render() {
    return (
      <div className={styles.content}>
        <div className={styles.contentPadding}>
          <TextField
            id="name"
            label="Member name:"
            className={styles.nameField}
            value={this.state.organization.name}
            onChange={this.updateField}
            InputLabelProps={{
              shrink: true
            }}
            name="name"
            fullWidth
          />
          <Grid container>
            <Grid item xs={12} sm={4}>
              <TextField
                id="responsible"
                label="Responsible person"
                className={styles.field}
                value={this.state.organization.manager}
                onChange={this.updateField}
                name="manager"
                margin="normal"
                InputLabelProps={{
                  shrink: true
                }}
                fullWidth
                disabled
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl
                error={this.state.invalidWorkersNumber}
                margin="normal"
                fullWidth
              >
                <InputLabel htmlFor="workersNumber" shrink>
                  Number of personnel
                </InputLabel>
                <Input
                  id="workersNumber"
                  name="workersNumber"
                  value={this.state.organization.workersNumber}
                  onChange={this.updateField}
                  type="number"
                />
                {this.state.invalidWorkersNumber && (
                  <FormHelperText>Invalid value</FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth margin="normal">
                <InputLabel htmlFor="age-helper">Capacity</InputLabel>
                <Select
                  onChange={event => {
                    this.setState({
                      organization: {
                        ...this.state.organization,
                        capacity: event.target.value
                      }
                    })
                  }}
                  value={
                    this.state.organization.capacity
                      ? this.state.organization.capacity
                      : 0
                  }
                  input={<Input id="age-helper" />}
                >
                  {this.props.dictionaries.capacity.map(e => (
                    <MenuItem key={e._id} value={e._id}>
                      {e.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          <div className={styles.row}>
            <span className={styles.fieldLabel}>
              {' '}
              Operation sectors and industries:{' '}
            </span>
            {this.state.organization.sectors.map(e => (
              <div key={e._id} className={styles.fieldSectorName}>
                {this.countIndustries(e) > 0 && (
                  <span
                    onClick={event => this.handleSectorOpen(event, e._id)}
                    role="button"
                    tabIndex={0}
                  >
                    {' '}
                    {e.name}
                    <div className={styles.industriesCounter}>
                      {this.countIndustries(e)}
                    </div>
                  </span>
                )}
                <Popover
                  open={this.state.popoverOpen[e._id]}
                  anchorEl={this.state.anchorEl}
                  onRequestClose={() => this.handleSectorClose(e._id)}
                  anchorOrigin={{
                    vertical: 'center',
                    horizontal: 'right'
                  }}
                  transformOrigin={{
                    vertical: 'center',
                    horizontal: 'left'
                  }}
                >
                  {this.state.organization.industries
                    .filter(x =>
                      e.industries.some(
                        ind => x._id === ind._id || ind === x._id
                      )
                    )
                    .map(x => (
                      <div className={styles.popover__industry} key={x._id}>
                        {x.name}
                      </div>
                    ))}
                  <IconClose
                    className={styles.popover__close}
                    onClick={() => this.handleSectorClose(e._id)}
                  />
                </Popover>
              </div>
            ))}
            <Chip
              label="Edit Sectors and Industries"
              style={stylesJs.edit}
              onClick={() =>
                this.setState({
                  isEditSectorsModalOpen: true
                })
              }
              avatar={
                <Avatar style={stylesJs.addIcon}>
                  <IconEdit />
                </Avatar>
              }
            />

            <EditSectorsModal
              isStandalone
              open={this.state.isEditSectorsModalOpen}
              onRequestClose={() =>
                this.setState({
                  isEditSectorsModalOpen: false
                })
              }
              onSave={(sectors, industries) => {
                this.setState({
                  organization: {
                    ...this.state.organization,
                    sectors: sectors.map(sector =>
                      Object.assign({}, sector, {
                        industries:
                          typeof sector.industries[0] === 'string'
                            ? sector.industries
                            : sector.industries.map(s => s._id)
                      })
                    ),
                    industries
                  },
                  isEditSectorsModalOpen: false
                })
              }}
              maxWidth="md"
              fullWidth
              className="paper-container-wrapper"
              industries={this.props.dictionaries.industry}
              sectors={this.props.dictionaries.sector}
              prefill={{
                industries: this.state.organization.industries,
                sectors: this.state.organization.sectors
              }}
            />
          </div>

          <div className={styles.row}>
            <div className={styles.fieldLabel}>Description</div>
            <div className={styles.row}>
              {this.state.organization.types.map(e => (
                <Chip
                  key={e._id}
                  label={e.name}
                  style={stylesJs.chip}
                  className="chip-default"
                  avatar={
                    <Avatar style={stylesJs.closeIcon}>
                      <IconClose
                        onClick={() => {
                          this.setState({
                            organization: {
                              ...this.state.organization,
                              types: this.state.organization.types.filter(
                                a => a._id !== e._id
                              )
                            }
                          })
                        }}
                      />
                    </Avatar>
                  }
                />
              ))}
              <Chip
                label="Add"
                style={stylesJs.edit}
                className="chip-default"
                onClick={() => {
                  this.setState({ isTypesModalOpen: true })
                }}
                avatar={
                  <Avatar style={stylesJs.addIcon}>
                    <IconAdd />
                  </Avatar>
                }
              />
            </div>
            <Dialog
              open={this.state.isTypesModalOpen}
              onRequestClose={() =>
                this.setState({
                  isTypesModalOpen: false
                })
              }
              maxWidth="md"
              fullWidth
              className="paper-container-wrapper"
            >
              <TypesDialog
                isStandalone
                companyName={this.state.organization.name}
                onSave={data =>
                  this.setState({
                    organization: {
                      ...this.state.organization,
                      types: data
                    },
                    isTypesModalOpen: false
                  })
                }
                onBack={() =>
                  this.setState({
                    isTypesModalOpen: false
                  })
                }
                hasWizardNavigation={false}
                prefillTypes={this.state.organization.types}
                types={this.props.dictionaries.organizationType}
              />
            </Dialog>
            <div className="clear" />
          </div>

          <div className={styles.row}>
            <div className={styles.fieldLabel}>Countries of operation</div>
            <div className={styles.row}>
              {this.state.organization.countries.map(e => (
                <Chip
                  key={e._id}
                  label={e.name}
                  style={stylesJs.chip}
                  className="chip-default"
                  avatar={
                    <Avatar style={stylesJs.closeIcon}>
                      <IconClose
                        onClick={() => {
                          this.setState({
                            organization: {
                              ...this.state.organization,
                              countries: this.state.organization.countries.filter(
                                a => a._id !== e._id
                              )
                            }
                          })
                        }}
                      />
                    </Avatar>
                  }
                />
              ))}
              <Chip
                label="Add"
                style={stylesJs.edit}
                className="chip-default"
                onClick={() => {
                  this.setState({ isCountriesModalOpen: true })
                }}
                avatar={
                  <Avatar style={stylesJs.addIcon}>
                    <IconAdd />
                  </Avatar>
                }
              />
            </div>
            <Dialog
              open={this.state.isCountriesModalOpen}
              onRequestClose={() =>
                this.setState({
                  isCountriesModalOpen: false
                })
              }
              maxWidth="md"
              fullWidth
              className="paper-container-wrapper"
            >
              <CountriesDialog
                isStandalone
                companyName={this.state.organization.name}
                onSave={data =>
                  this.setState({
                    organization: {
                      ...this.state.organization,
                      countries: data
                    },
                    isCountriesModalOpen: false
                  })
                }
                onBack={() =>
                  this.setState({
                    isCountriesModalOpen: false
                  })
                }
                hasWizardNavigation={false}
                prefillCountries={this.state.organization.countries}
                countries={this.props.dictionaries.country}
              />
            </Dialog>
            <div className="clear" />
          </div>
          {this.props.isFetchingMember && (
            <LoadingSpinner spinnerType={SPINNER_TYPES.ABSOLUTE} />
          )}
        </div>
        <div className="paper-container__footer">
          <Button
            variant="contained"
            onClick={() =>
              this.props.save({
                organization: this.state.organization,
                id: this.props.initial.id
              })
            }
            disabled={
              !this.state.organization.name || this.state.invalidWorkersNumber
            }
            color="primary"
            style={stylesJs.smallButton}
          >
            SAVE
          </Button>
          <Button
            onClick={() => this.props.removeEdited(this.props.initial.id)}
            style={stylesJs.smallButton}
          >
            CANCEL
          </Button>
        </div>
      </div>
    )
  }
}
