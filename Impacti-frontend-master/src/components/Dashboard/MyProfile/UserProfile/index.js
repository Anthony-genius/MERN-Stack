import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { withStyles } from '@material-ui/core/styles'

import { Link } from 'react-router-dom'
import Typography from '@material-ui/core/Typography'

import Button from '@material-ui/core/Button'
import Chip from '@material-ui/core/Chip'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import EditIcon from '@material-ui/icons/Edit'
import BuildIcon from '@material-ui/icons/Build'
import PdfIcon from '@material-ui/icons/PictureAsPdfRounded'
import PeopleIcon from '@material-ui/icons/People'
import grey from '@material-ui/core/colors/grey'

import AssessmentSdgsAndImpactAreas from '../../../AssessmentSdgsAndImpactAreas'
import ViewMore from 'components/ViewMore'
import LoadingSpinner from 'components/LoadingSpinner'

import { filterHomePage } from '../../../../actions/dashboard'
import { loadFollowedTags } from '../../../../actions/tag'
import { PDFLink, PDFButton } from '../../../PrintProfile'

const styles = theme => ({
  columns: {
    marginRight: 'auto',
    marginLeft: 'auto',
    padding: theme.spacing(4),
    maxWidth: '85vw',
    backgroundColor: grey[200],
    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacing(10),
      marginBottom: theme.spacing(10),
      maxWidth: '100vw'
    }
  },
  content: {
    backgroundColor: grey[200]
  },
  topContent: {
    marginBottom: theme.spacing(6)
  },
  profile: {
    zIndex: 100,
    marginTop: 250,
    display: 'flex'
  },
  countryIcon: {
    width: 80,
    margin: '0 auto'
  },
  sectorIcon: {
    width: 80,
    margin: '22px auto'
  },
  peopleIcon: {
    fontSize: 80,
    margin: '0 auto'
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
    fontSize: 16,
    minWidth: '90%',
    '& span': {
      whiteSpace: 'initial',
      padding: 0
    }
  },
  aboutPaper: {
    padding: theme.spacing(4),
    borderRadius: 15,
    whiteSpace: 'pre-line',
    '& div': {
      display: 'flex',
      flexDirection: 'column'
    }
  },
  factsPaper: {
    padding: theme.spacing(1),
    borderRadius: 15,
    height: 172,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    whiteSpace: 'pre-line',
    '& div': {
      display: 'flex',
      flexDirection: 'column'
    }
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
  impactText: {
    marginBottom: theme.spacing(4)
  },
  bottPaper: {
    padding: theme.spacing(4)
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
      marginRight: theme.spacing(1),
      marginLeft: theme.spacing(1)
    },
    '&:hover': {
      backgroundColor: '#fff'
    }
  },
  downloadButton: {
    marginLeft: theme.spacing.unit,
    '& a': {
      color: '#000000 !important'
    },
    '& svg': {
      color: '#fff',
      background: 'var(--secondaryColor)',
      borderRadius: '20%',
      marginRight: theme.spacing(1),
      marginLeft: theme.spacing(1)
    }
  }
})

const UserProfile = ({
  classes,
  auth,
  member,
  followedTags,
  filterHomePage,
  loadFollowedTags
}) => {
  const { sectors, countries, description, mission, customChallenges } = member

  React.useEffect(() => {
    try {
      loadFollowedTags(auth.user.organization._id)
    } catch (e) {}
  }, [auth, loadFollowedTags])

  if (!member.id) return <LoadingSpinner />

  return (
    <>
      <div className={classes.content}>
        <div className={classes.columns}>
          <div className={classes.profile}>
            <Button
              aria-label="Update my profile"
              component={Link}
              to="./profile/edit"
              variant="contained"
              color="primary"
              className={classes.editButton}
              about={description}
            >
              <EditIcon /> Update my profile
            </Button>
            <PDFButton
              btnClass={classnames([
                classes.editButton,
                classes.downloadButton
              ])}
            />
          </div>

          <Grid container spacing={3} className={classes.topContent}>
            <Grid item xs={12}>
              <Typography gutterBottom variant="h6">
                About
              </Typography>
              <Paper className={classes.aboutPaper}>
                {description ? (
                  <ViewMore
                    text={description}
                    charLimit={250}
                    viewMoreText=" view more"
                    viewLessText=" view less"
                  />
                ) : (
                  <Typography gutterBottom>Fill in your About here!</Typography>
                )}
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Typography gutterBottom variant="h6">
                Mission Statement
              </Typography>
              <Paper className={classes.aboutPaper}>
                {mission ? (
                  <ViewMore
                    text={mission}
                    charLimit={250}
                    viewMoreText=" view more"
                    viewLessText=" view less"
                  />
                ) : (
                  <Typography gutterBottom>
                    What's your sustainability mission statement?
                  </Typography>
                )}
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Typography gutterBottom variant="h6">
                Key Facts
              </Typography>
            </Grid>
            {countries.map(country => (
              <Grid key={country._id} item xs={12} sm={2}>
                <Paper className={classes.factsPaper}>
                  <div key={country._id}>
                    <img
                      src={require(`assets/countries/${country.name.toLowerCase()}.png`)}
                      alt={country.name}
                      className={classes.countryIcon}
                    />
                    <Chip className={classes.chip} label={country.name} />
                  </div>
                </Paper>
              </Grid>
            ))}
            {sectors.map(sector => (
              <Grid key={sector._id} item xs={12} sm={2}>
                <Paper className={classes.factsPaper}>
                  <div key={sector._id}>
                    <BuildIcon
                      fontSize="large"
                      className={classes.sectorIcon}
                    />
                    <Chip className={classes.chip} label={sector.name} />
                  </div>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </div>
      </div>
      <div className={classes.bottContent}>
        <div className={classes.bottContainer}>
          <Typography variant="h6" className={classes.impactText}>
            Where we make impact
          </Typography>

          <Paper className={classes.bottPaper}>
            <AssessmentSdgsAndImpactAreas
              hideCountriesAndSdgs
              fitToWidth
              customChallenges={customChallenges}
            />
          </Paper>
        </div>
      </div>
    </>
  )
}
UserProfile.proptTypes = {
  auth: PropTypes.object.isRequired
}

const UserProfileWithStyles = withStyles(styles)(UserProfile)

export default connect(
  state => ({
    auth: state.auth,
    member: state.assessmentWizard,
    followedTags: state.tags.followedTags
  }),
  dispatch => ({
    filterHomePage: filterHomePage(dispatch),
    loadFollowedTags: loadFollowedTags(dispatch)
  })
)(UserProfileWithStyles)
