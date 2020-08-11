import React from 'react'
import classnames from 'classnames'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Paper from '@material-ui/core/Paper'
import Chip from '@material-ui/core/Chip'
import ButtonBase from '@material-ui/core/ButtonBase'
import EditIcon from '@material-ui/icons/Edit'
import CloseIcon from '@material-ui/icons/Close'
import Typography from '@material-ui/core/Typography'
import rankAndMergeSdgs from 'components/Assessment/rankAndMergeSdgs'
import SdgTab from '../../../../AssessmentSdgsAndImpactAreas/SdgTab'
import SdgChallenge from '../../../../AssessmentSdgsAndImpactAreas/SdgChallenge'
import SdgFocuses from '../../../../AssessmentSdgsAndImpactAreas/SdgFocuses'
import TabsAlertDialog from '../../../../AssessmentSdgsAndImpactAreas/TabsAlertDialog'
import RecommendationsSdgs from 'components/Assessment/AssessmentSdgRecommendations/RecommendationsSdgs'

const classes = theme => ({
  root: {
    width: '100%',
    position: 'relative',
    overflow: 'auto'
  },
  relevance: {
    marginTop: 40,
    color: 'var(--secondaryColor)',
    display: 'flex',
    justifyContent: 'space-evenly'
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  },
  actions: {
    marginTop: '75px',
    color: 'var(--secondaryColor)'
  },
  bar: {
    width: '65vw',
    maxWidth: '85vw',
    backgroundColor: '#fff',
    boxShadow: 'none',
    zIndex: 0,
    display: 'flex',
    flexDirection: 'row'
  },
  tabsBar: {
    marginTop: 40
  },
  barFit: {
    width: '100%'
  },
  leftTitle: {
    color: 'var(--secondaryColor)',
    display: 'flex',
    justifyContent: 'space-evenly'
  },
  editSdgs: {
    height: 110,
    width: 110,
    minWidth: 110,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    textAlign: 'center',
    alignItems: 'center',
    margin: '0 auto',
    '& p': {
      color: 'var(--secondaryColor)',
      whiteSpace: 'initial'
    },
    '& svg': {
      color: 'var(--primaryColor)',
      marginTop: theme.spacing.unit
    }
  },
  closeSdgs: {
    height: 110,
    width: 110,
    margin: '0 auto'
  },
  info: {
    margin: 0,
    display: 'flex',
    p: {
      fontWeight: 200
    }
  },
  operations: {
    margin: 0,
    display: 'flex',
    p: {
      fontWeight: 200
    }
  },
  operationsChips: {
    width: '85%',
    margin: '0 auto'
  },
  chip: {
    backgroundColor: '#ff6d00',
    borderRadius: '5px',
    boxShadow: 'rgba(0, 0, 0, 0.12) 0 1px 6px, rgba(0, 0, 0, 0.12) 0 1px 4px',
    color: 'rgba(255, 255, 255, 0.87)',
    margin: '25px 10px',
    padding: '10px',
    height: 35,
    fontWeight: 'bold',
    fontSize: 16
  },
  button: {
    width: 85,
    height: 85,
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    background: '#e1e1e1',
    textAlign: 'center',
    alignItems: 'center',
    '& div': {
      width: '90%',
      height: '80%',
      margin: '10px auto'
    },
    '& p': {
      color: 'var(--secondaryColor)',
      whiteSpace: 'initial'
    },
    '& svg': {
      color: 'var(--primaryColor)',
      marginTop: theme.spacing.unit
    }
  },
  sdgImage: {
    width: 100,
    height: 100
  },
  reasonIcons: {
    margin: '35px auto',
    width: '70%'
  },
  reasonIcon: {
    position: 'relative',
    fill: 'var(--primaryColor)',
    fontSize: '30px',
    margin: '0 7 %',
    '&:hover': {
      cursor: 'help'
    }
  },
  focusesflexContainer: {
    justifyContent: 'start',
    flexDirection: 'column',
    padding: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      padding: 0
    }
  },
  focusesTabsRoot: {
    width: '85vw'
  },
  tabsScroller: {
    whiteSpace: 'normal'
  },
  tabsIndicator: {
    height: 0
  },
  challengeTabsRoot: {
    padding: theme.spacing(2),
    width: '100%'
  },
  tabsIndicatorBold: {
    height: 10,
    zIndex: 2,
    top: 128
  },
  tabsContainer: {
    position: 'relative',
    '&:after': {
      position: 'absolute',
      border: '5px solid #f2f2f2',
      left: '0',
      top: '180px',
      width: '100%',
      content: "''"
    }
  },
  focusContainer: {
    position: 'relative'
  },
  card: {
    width: 315,
    minHeight: 410,
    margin: '10px 40px 10px 10px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  '@media screen and (max-width: 768px)': {
    h4: {
      margin: 0
    },
    relevance: {
      position: 'absolute',
      bottom: 98,
      margin: '0 auto',
      width: '95%'
    },
    actions: {
      position: 'absolute',
      bottom: 270,
      zIndex: 2
    },
    chip: {
      margin: 10
    },
    bar: {
      width: '100%'
    },
    tabsContainer: {
      '&:after': {
        top: 381
      }
    },
    focusContainer: {
      '&:after': {
        top: 190
      }
    }
  }
})

class AssessmentSdgsAndImpactAreas extends React.Component {
  constructor(props, context) {
    super(props, context)

    this.state = {
      value: 0,
      open: false,
      currentSdg: {},
      editOpportunities: false,
      baseAssessmentAnswersState: this.props.baseAssessmentAnswers
        ? this.props.baseAssessmentAnswers
        : []
    }
  }

  handleChange = (event, value, sdg) => {
    this.setState({ value: value, currentSdg: sdg })
  }

  setCurrentSdg = () => {
    const { assessmentWizard, baseAssessmentAnswers } = this.props
    const allUserFocuses = assessmentWizard && baseAssessmentAnswers
    const currentSdg = { ...allUserFocuses.slice(0, 1) }
    const setCurrentSdg =
      allUserFocuses &&
      allUserFocuses.length !== 0 &&
      this.setState({ currentSdg: currentSdg[0].sdg })
    return setCurrentSdg
  }

  componentDidMount = () => {
    const { auth } = this.props
    if (
      auth.user &&
      auth.user.organization &&
      auth.user.organization.rootMember
    ) {
      this.setCurrentSdg()
    }
  }

  toggleEdit = () => {
    this.setState(({ open }) => ({
      open: !open
    }))
  }

  toggleEditOpportunities = () => {
    this.setState(({ editOpportunities }) => ({
      editOpportunities: !editOpportunities
    }))
  }

  getListItem = sdg => {
    const { assessmentWizard, baseAssessmentAnswers } = this.props
    const allUserFocuses = assessmentWizard && baseAssessmentAnswers

    const focus =
      allUserFocuses &&
      allUserFocuses.find(answer => sdg._id === answer.sdg._id)
    const display =
      focus && focus.customFocuses && focus.customFocuses.length !== 0
        ? focus.customFocuses
        : focus && focus.baseAssessmentFocuses.length !== 0
        ? focus.baseAssessmentFocuses
        : undefined
    return display
  }

  addOpportunity = answers => {
    this.setState({ baseAssessmentAnswers: answers })
  }

  saveFocuses = () => {
    const { baseAssessmentAnswersState } = this.state
    const { updateMember, member, deleteOpportunityInput } = this.props
    updateMember(member.id, {
      baseAssessmentAnswers: baseAssessmentAnswersState
    })
    this.toggleEditOpportunities()
    deleteOpportunityInput()
  }

  render() {
    const {
      classes,
      member,
      assessmentWizard,
      baseAssessmentFocuses,
      countryToSdgs,
      allSdgs,
      hideCountriesAndSdgs,
      fitToWidth,
      input,
      dirty,
      removeInput,
      addFocusInput,
      focusInput,
      prefill,
      allInputs,
      hightlightDirty,
      customChallenges
    } = this.props
    const {
      open,
      currentSdg,
      value,
      editOpportunities,
      baseAssessmentAnswersState
    } = this.state

    const {
      countries,
      sectors,
      baseAssessmentAnswers,
      sdgs
    } = this.props.member

    const challenge = customChallenges
    const customChallenge = customChallenges

    const sortedSdgs = rankAndMergeSdgs({
      countryToSdgs,
      countries,
      sectors,
      allSdgs,
      sdgs
    })

    const challengeSdg =
      challenge &&
      challenge.map(c => Object.assign({}, c.sdg, { text: c.text }))

    const sdgsChallenge = [
      ...challengeSdg
        .concat(sortedSdgs)
        .reduce((r, o) => {
          r.has(o._id) || r.set(o._id, {})

          const item = r.get(o._id)

          Object.entries(o).forEach(
            ([k, v]) =>
              (item[k] = Array.isArray(item[k])
                ? [...new Set([...item[k], ...v])]
                : v)
          )

          return r
        }, new Map())
        .values()
    ]

    return sortedSdgs && sortedSdgs.length > 0 ? (
      <>
        <Grid container spacing={3}>
          {!hideCountriesAndSdgs && (
            <>
              <Grid item xs={12} sm={2}>
                <h4 className={classes.leftTitle}>
                  Your business operates in:
                </h4>
              </Grid>
              <Grid item xs={12} sm={10} className={classes.operations}>
                <div className={classes.operationsChips}>
                  {assessmentWizard.countries.map(c => (
                    <Chip className={classes.chip} key={c._id} label={c.name} />
                  ))}
                  {assessmentWizard.sectors.map(s => (
                    <Chip className={classes.chip} key={s._id} label={s.name} />
                  ))}
                </div>
              </Grid>
            </>
          )}
        </Grid>
        <Grid container spacing={3} className={classes.tabsContainer}>
          <Grid item xs={12} sm={2}>
            <h4 className={classes.leftTitle}>Our priority SDGs</h4>
            <h4 className={classes.relevance}>Why it matters</h4>
          </Grid>
          <Grid item xs={12} sm={10}>
            <AppBar
              position="static"
              color="default"
              className={classnames(
                classes.bar,
                classes.tabsBar,
                fitToWidth && classes.barFit
              )}
            >
              <Tabs
                variant="scrollable"
                scrollButtons="auto"
                indicatorColor="primary"
                textColor="primary"
                value={value}
                classes={{
                  indicator: classes.tabsIndicatorBold
                }}
              >
                {sortedSdgs &&
                  sortedSdgs
                    .filter(sdg => sdg.selected)
                    .sort((a, b) => b.rank - a.rank)
                    .map(sdg =>
                      allInputs &&
                      allInputs.some(i => i === 'challenge' || 'focus') ? (
                        <TabsAlertDialog
                          input={allInputs}
                          dirty={hightlightDirty}
                          sdg={sdg}
                          key={sdg._id}
                          onClick={this.handleChange}
                          onChange={this.handleChange}
                          removeInput={removeInput}
                        />
                      ) : (
                        <SdgTab
                          sdg={sdg}
                          key={sdg._id}
                          onClick={this.handleChange}
                          onChange={this.handleChange}
                        />
                      )
                    )}
              </Tabs>
            </AppBar>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={2}>
            <h4 className={classes.leftTitle}>Our challenge</h4>
          </Grid>
          <Grid item xs={12} sm={10} className={classes.info}>
            <AppBar
              position="static"
              color="default"
              className={classnames(classes.bar, fitToWidth && classes.barFit)}
            >
              <Tabs
                variant="fullWidth"
                className={classes.challenge}
                indicatorColor="primary"
                textColor="primary"
                value={value}
                classes={{
                  scroller: classes.tabsScroller,
                  indicator: classes.tabsIndicator,
                  root: classes.challengeTabsRoot
                }}
              >
                {sdgsChallenge &&
                  sdgsChallenge
                    .filter(sdg => sdg.selected)
                    .sort((a, b) => b.rank - a.rank)
                    .map(sdg => (
                      <SdgChallenge
                        sdg={sdg}
                        key={sdg._id}
                        challenge={customChallenge}
                        onChange={this.handleChange}
                        prefill={prefill}
                        //handleChallengeChange={handleChallengeChange}
                        input={input}
                        removeInput={removeInput}
                        member={member}
                        //updateMember={updateMember}
                        //deleteChange={deleteChange}
                        //saveChange={saveChange}
                        dirty={dirty}
                      />
                    ))}
              </Tabs>
            </AppBar>
          </Grid>
        </Grid>
        <Grid container spacing={3} className={classes.focusContainer}>
          <Grid item xs={12} sm={2}>
            <h4 className={classes.leftTitle}>Our Impact Areas</h4>
          </Grid>
          <Grid item xs={12} sm={10} className={classes.info}>
            <AppBar
              position="static"
              color="default"
              className={classnames(classes.bar, fitToWidth && classes.barFit)}
            >
              <Tabs
                variant="fullWidth"
                indicatorColor="primary"
                textColor="primary"
                value={value}
                classes={{
                  flexContainer: classes.focusesflexContainer,
                  scroller: classes.tabsScroller,
                  indicator: classes.tabsIndicator,
                  root: classes.focusesTabsRoot,
                  scrollButtons: classes.tabsScrollButtons
                }}
              >
                {sortedSdgs &&
                  sortedSdgs
                    .filter(sdg => sdg.selected)
                    .sort((a, b) => b.rank - a.rank)
                    .map(sdg => (
                      <SdgFocuses
                        sdg={sdg}
                        key={sdg._id}
                        currentSdg={currentSdg}
                        baseAssessmentFocuses={baseAssessmentFocuses}
                        baseAssessmentAnswers={baseAssessmentAnswersState}
                        prevBaseAssessmentAnswers={baseAssessmentAnswers}
                        focuses={this.getListItem(sdg)}
                        onChange={this.handleChange}
                        editMode={false}
                        member={member}
                        //updateMember={updateMember}
                        input={focusInput}
                        addFocusInput={addFocusInput}
                        removeInput={removeInput}
                        dirty={dirty}
                        editOpportunities={editOpportunities}
                        toggleEditOpportunities={this.toggleEditOpportunities}
                        //addOpportunityInput={addOpportunityInput}
                        //deleteOpportunityInput={deleteOpportunityInput}
                        addOpportunity={this.addOpportunity}
                      />
                    ))}
              </Tabs>
            </AppBar>
          </Grid>
        </Grid>
      </>
    ) : (
      <Paper className={classes.root}>None</Paper>
    )
  }
}

AssessmentSdgsAndImpactAreas.propTypes = {
  classes: PropTypes.object.isRequired,
  hideCountriesAndSdgs: PropTypes.bool,
  fitToWidth: PropTypes.bool,
  dashboardMode: PropTypes.bool
}

export default connect(
  state => ({
    auth: state.auth,
    allSdgs: state.dictionaries.sdg,
    countryToSdgs: state.dictionaries.countrySdg,
    baseAssessmentFocuses: state.dictionaries.baseAssessmentFocus,
    allSectors: state.dictionaries.sector
  }),
  dispatch => ({})
)(withStyles(classes)(AssessmentSdgsAndImpactAreas))
