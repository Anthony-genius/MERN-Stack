import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { getMember, updateMember } from 'actions/assessmentWizard'
import { withStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import { Grid } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import EditIcon from '@material-ui/icons/Edit'
import grey from '@material-ui/core/colors/grey'

import ImpactiAvatar from 'components/ImpactiAvatar'
import ImpactiHero from 'components/ImpactiHero'

import ProfileCountriesDialog from './ProfileCountriesDialog'
import ProfileSectorsDialog from './ProfileSectorsDialog'
import ProfileMissionDialog from './ProfileMissionDialog'
import ProfileAboutDialog from './ProfileAboutDialog'
import AlertDialog from './AlertDialog'
import AssessmentSdgsAndImpactAreas from 'components/AssessmentSdgsAndImpactAreas'
import LoadingSpinner from 'components/LoadingSpinner'

const styles = theme => ({
  hero: {
    width: '100%',
    position: 'absolute',
    maxHeight: 300,
    overflow: 'hidden'
  },
  heroImage: {
    width: '100%'
  },
  profileImageContainer: {
    position: 'absolute',
    bottom: 0,
    display: 'flex',
    maxWidth: '80vw',
    margin: '0 auto',
    left: 0,
    right: 0
  },
  profileImage: {
    marginRight: theme.spacing(2),
    padding: theme.spacing(1),
    width: 120,
    height: 120,
    zIndex: 2,
    background: '#fff'
  },
  topContent: {
    marginBottom: theme.spacing(6)
  },
  columns: {
    marginRight: 'auto',
    marginLeft: 'auto',
    padding: theme.spacing(4),
    maxWidth: '85vw',
    backgroundColor: grey[200],
    [theme.breakpoints.down('sm')]: {
      maxWidth: '100vw',
      marginTop: theme.spacing(10),
      marginBottom: theme.spacing(10)
    }
  },
  profile: {
    zIndex: 100,
    marginTop: 250,
    display: 'flex'
  },
  title: {
    position: 'absolute',
    left: 130,
    bottom: 0,
    color: '#fff'
  },
  leftTitle: {
    color: 'var(--secondaryColor)'
  },
  alert: {
    marginLeft: 'auto'
  },
  editButton: {
    marginTop: theme.spacing(3),
    marginLeft: 'auto',
    backgroundColor: grey[200],
    color: '#000000 !important',
    textTransform: 'initial',
    boxShadow: 'none',
    '& svg': {
      color: '#fff',
      background: 'var(--secondaryColor)',
      borderRadius: '50%',
      marginLeft: theme.spacing.unit
    },
    '&:hover': {
      backgroundColor: '#fff'
    }
  },
  fieldPaper: {
    padding: theme.spacing(4),
    borderRadius: 15
  },
  content: {
    backgroundColor: grey[200]
  },
  bottContent: {
    backgroundColor: grey[200]
  },
  bottContainer: {
    padding: theme.spacing(4),
    marginLeft: 'auto',
    marginRight: 'auto',
    maxWidth: '85vw',
    [theme.breakpoints.down('md')]: {
      maxWidth: '100vw'
    }
  },
  bottPaper: {
    padding: theme.spacing(4, 1)
  },
  impactText: {
    marginBottom: theme.spacing(4)
  }
})

class UserEdit extends React.Component {
  state = {
    description: this.props.prefill ? this.props.prefill.description : '',
    mission: this.props.prefill ? this.props.prefill.mission : '',
    challenge: this.props.prefill ? this.props.prefill.challenge : [],
    descriptionEditMode: undefined,
    dirty: false,
    input: []
  }

  componentDidMount = () => {
    window.scrollTo(0, 0)
  }

  handleChange = name => event => {
    const { input } = this.state
    this.setState({
      [name]: event.target.value,
      input: [...new Set([...input, name])]
    })
  }
  handleChallengeChange = newChallenges => {
    const { input } = this.state
    this.setState({
      challenge: newChallenges,
      input: [...new Set([...input, 'challenge'])]
    })
  }

  removeInput = name => {
    const { input } = this.state
    const removeInput = input.filter(i => i !== name)
    this.setState({
      input: removeInput
    })
  }

  addFocusInput = () => {
    const { input } = this.state
    this.setState({
      input: [...new Set([...input, 'focus'])]
    })
  }

  addOpportunityInput = () => {
    const { input } = this.state
    this.setState({
      input: [...new Set([...input, 'impact areas'])]
    })
  }

  deleteOpportunityInput = () => {
    this.removeInput('impact areas')
  }

  saveChange = name => event => {
    const { member, updateMember } = this.props
    updateMember(member.id, { [name]: this.state[name] })
    this.removeInput(name)
  }

  deleteChallengeChange = () => {
    this.setState({ challenge: this.props.prefill.challenge })
    this.removeInput('challenge')
  }

  deleteChange = name => event => {
    this.setState({ [name]: this.props.prefill[name] })
    this.removeInput(name)
  }

  hasInput = name => event => {
    const { input } = this.state
    const inputCheck = input.length > 0 && input.some(i => i === name)
    return inputCheck
  }

  hightlightDirty = () => {
    this.setState({ dirty: true })
  }

  render() {
    const {
      classes,
      auth,
      member,
      updateMember,
      allCountries,
      allSectors,
      allIndustries,
      prefill
    } = this.props

    const { description, mission, challenge, input, dirty } = this.state
    if (!member.id) return <LoadingSpinner />

    return (
      <>
        <div className={classes.hero}>
          <div className={classes.profileImageContainer}>
            <div className={classes.profileImage}>
              <ImpactiAvatar editMode={true} square />
            </div>
            <Typography variant="h3" component="h3" className={classes.title}>
              {(auth && auth.user && auth.user.username) || 'My Profile'}
            </Typography>
          </div>
          <ImpactiHero editMode={true} />
        </div>
        <div className={classes.content}>
          <div className={classes.columns}>
            <div className={classes.profile}>
              {input.length > 0 ? (
                <AlertDialog
                  input={input}
                  className={classes.alert}
                  dirty={this.hightlightDirty}
                />
              ) : (
                <Button
                  component={Link}
                  to="../profile"
                  variant="contained"
                  color="primary"
                  aria-label="Save"
                  className={classes.editButton}
                >
                  Back to my profile <EditIcon />
                </Button>
              )}
            </div>

            <Grid container spacing={3} className={classes.topContent}>
              <ProfileAboutDialog
                prefill={prefill}
                description={description}
                input={this.hasInput('description') && input}
                saveChange={this.saveChange('description')}
                handleChange={this.handleChange('description')}
                deleteChange={this.deleteChange('description')}
                dirty={dirty}
              />
              <ProfileMissionDialog
                prefill={prefill}
                mission={mission}
                input={this.hasInput('mission') && input}
                saveChange={this.saveChange('mission')}
                handleChange={this.handleChange('mission')}
                deleteChange={this.deleteChange('mission')}
                dirty={dirty}
              />
              <Grid item xs={12}>
                <Typography gutterBottom variant="h6">
                  Key Facts
                </Typography>
              </Grid>
              <Grid item xs={12} md={4} xl={3}>
                <h4 className={classes.leftTitle}>Location(s)</h4>
                <ProfileCountriesDialog
                  countries={allCountries}
                  onSave={countries => updateMember(member.id, { countries })}
                  prefill={prefill}
                />
              </Grid>
              <Grid item xs={12} md={1} lg={1} xl={4} />
              <Grid item xs={12} md={7} lg={6} xl={5}>
                <h4 className={classes.leftTitle}>Sector(s)</h4>
                <ProfileSectorsDialog
                  sectors={allSectors}
                  industries={allIndustries}
                  updateSectors={sectors =>
                    updateMember(member.id, { sectors })
                  }
                  updateIndustries={industries =>
                    updateMember(member.id, { industries })
                  }
                  prefill={prefill}
                />
              </Grid>
            </Grid>
          </div>
        </div>
        <div className={classes.bottContent}>
          <div className={classes.bottContainer}>
            <Typography
              gutterBottom
              variant="h6"
              className={classes.impactText}
            >
              Where we make impact
            </Typography>
            <Paper className={classes.bottPaper}>
              <AssessmentSdgsAndImpactAreas
                hideCountriesAndSdgs
                fitToWidth
                editMode
                prefill={prefill}
                updateMember={updateMember}
                member={member}
                customChallenge={challenge}
                handleChallengeChange={this.handleChallengeChange}
                saveChange={this.saveChange('customChallenge')}
                deleteChange={this.deleteChallengeChange}
                removeInput={this.removeInput}
                input={this.hasInput('challenge') && input}
                focusInput={this.hasInput('challenge') && input}
                addFocusInput={this.addFocusInput}
                allInputs={input}
                dirty={dirty}
                hightlightDirty={this.hightlightDirty}
                addOpportunityInput={this.addOpportunityInput}
                deleteOpportunityInput={this.deleteOpportunityInput}
              />
            </Paper>
          </div>
        </div>
      </>
    )
  }
}

UserEdit.defaultProps = {
  updateMember: () => {}
}

UserEdit.propTypes = {
  updateMember: PropTypes.func
}

export default withStyles(styles)(
  connect(
    state => ({
      auth: state.auth,
      member: state.assessmentWizard,
      sectors: state.assessmentWizard.sectors,
      countries: state.assessmentWizard.countries,
      allCountries: state.dictionaries.country,
      allSectors: state.dictionaries.sector,
      allIndustries: state.dictionaries.industry,
      challenge: state.assessmentWizard.customChallenges,
      sdgs: state.assessmentWizard.sdgs,
      prefill: {
        description: state.assessmentWizard.description,
        mission: state.assessmentWizard.mission,
        countries: state.assessmentWizard.countries,
        sectors: state.assessmentWizard.sectors,
        industries: state.assessmentWizard.industries,
        challenge: state.assessmentWizard.customChallenges
      }
    }),
    dispatch => ({
      updateMember: updateMember(dispatch),
      getMember: getMember(dispatch)
    })
  )(UserEdit)
)
