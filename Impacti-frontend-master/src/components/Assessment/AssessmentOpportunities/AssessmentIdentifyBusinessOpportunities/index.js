import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Popover from '@material-ui/core/Popover'
import Typography from '@material-ui/core/Typography'
import ImpactiButton, { BUTTON_TYPES } from 'components/ImpactiButton'
import AssessmentFocusCard from './AssessmentFocusCard'
import OppoUgandaNdcsDialog from './OppoUgandaNdcsDialog'
import InstructionalOverlay from '../../InstructionalOverlay'
import OpportunitiesSdgTab from './OpportunitiesSdgTab'
import ScrollToTop from '../../../ScrollToTop'
import ugandaNdcs from '../../ugandaNdcs.js'

const style = theme => ({
  paperContainerWrapper: {
    padding: '10px 0 0',
    maxWidth: 1440,
    margin: '0 auto'
  },
  paperContainer: {
    padding: '10px 0 95px',
    maxWidth: '95%',
    alignItems: 'center',
    background: '#ffffff',
    display: 'flex',
    webkitBoxOrient: 'vertical',
    webkitBoxDirection: 'normal',
    msFlexDirection: 'column',
    flexDirection: 'column',
    webkitBoxPack: 'center',
    msFlexPack: 'center',
    justifyContent: 'center',
    margin: '0 auto',
    minHeight: '512px',
    position: 'relative',
    textAlign: 'center'
  },
  focusIntroMessage: {
    maxWidth: '100vw',
    '& section': {
      margin: '0 auto'
    },
    '& h1': {
      padding: 0,
      margin: '5px 0'
    },
    '& p': {
      margin: '10px auto'
    }
  },
  focusSdgs: {
    minHeight: 250,
    padding: '40px 0',
    display: 'flex',
    flexDirection: 'column',
    width: '90%',
    margin: '0 auto',
    position: 'relative',
    '& h4': {
      textAlign: 'right',
      color: 'var(--secondaryColor)'
    }
  },
  focusIntro: {
    margin: '0 auto',
    textAlign: 'center',
    '& h1': {
      padding: 0,
      margin: '5px 0 50px'
    }
  },
  focusCardContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    maxWidth: 1040,
    margin: '0 auto'
  },
  tabsContainer: {
    position: 'relative',
    display: 'flex',
    '&:after': {
      position: 'absolute',
      border: '5px solid #eee',
      right: '0',
      top: 120,
      width: '85%',
      content: "''"
    }
  },
  tabsContainerText: {
    width: '15%'
  },
  h4: {
    color: 'var(--secondaryColor)'
  },
  tabsSubContainer: {
    width: '85%'
  },
  bar: {
    width: '65vw',
    height: 130,
    maxWidth: 935,
    backgroundColor: '#fff',
    boxShadow: 'none',
    zIndex: 0
  },
  tabsIndicatorBold: {
    height: 10,
    zIndex: 2
  },
  paper: {
    padding: '20px',
    width: '28vw'
  },
  popover: {
    pointerEvents: 'none'
  }
})
class AssessmentIdentifyBusinessOpportunities extends Component {
  state = {
    anchorEl: null,
    open: true,
    buttonPopoverOpen: false,
    currentMemberSdgIndex: 0,
    visitedSdgs: [0]
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  handleChange = (event, currentMemberSdgIndex) => {
    this.setState({
      currentMemberSdgIndex: currentMemberSdgIndex,
      visitedSdgs: this.state.visitedSdgs.includes(currentMemberSdgIndex)
        ? this.state.visitedSdgs
        : [...this.state.visitedSdgs, currentMemberSdgIndex]
    })
  }

  toggleFocus = (e, focus) => {
    e.stopPropagation()

    const { currentMemberSdgIndex } = this.state
    const { baseAssessmentAnswers } = this.props.member

    const currentMemberSdg = this.props.member.sdgs[currentMemberSdgIndex]

    const existingAnswerIndex = baseAssessmentAnswers.findIndex(
      e => e.sdg.shortName === currentMemberSdg.shortName
    )

    let newBaseAssessmentAnswers = [...baseAssessmentAnswers]

    if (existingAnswerIndex === -1) {
      // if the sdg doesn't already exist in the answers array
      newBaseAssessmentAnswers.push({
        sdg: currentMemberSdg,
        baseAssessmentFocuses: [focus]
      })
    } else {
      const newBaseAssessmentAnswersFocuses =
        newBaseAssessmentAnswers[existingAnswerIndex].baseAssessmentFocuses

      if (newBaseAssessmentAnswersFocuses.some(e => e._id === focus._id)) {
        // this sdg/focus already exists, so remove it
        newBaseAssessmentAnswers[
          existingAnswerIndex
        ].baseAssessmentFocuses = newBaseAssessmentAnswersFocuses.filter(
          e => e._id !== focus._id
        )
      } else {
        // this sdg/focus doesn't exist, so add it
        newBaseAssessmentAnswers[
          existingAnswerIndex
        ].baseAssessmentFocuses.push(focus)
      }
    }

    this.props.updateMember({
      baseAssessmentAnswers: newBaseAssessmentAnswers
    })
  }

  handlePopoverOpen = event => {
    this.setState({ anchorEl: event.currentTarget, buttonPopoverOpen: true })
  }

  handlePopoverClose = () => {
    this.setState({ anchorEl: null, buttonPopoverOpen: false })
  }
  hasUganda = () => {
    const { member } = this.props
    const ugandaCheck = member.countries.some(
      country => country && country.name === 'Uganda'
    )
    return ugandaCheck
  }

  render() {
    const {
      baseAssessmentFocuses,
      classes,
      nextStep,
      goBack,
      member
    } = this.props

    const { baseAssessmentAnswers } = this.props.member

    const {
      currentMemberSdgIndex,
      visitedSdgs,
      open,
      buttonPopoverOpen,
      anchorEl
    } = this.state

    const currentMemberSdg = member.sdgs[currentMemberSdgIndex]

    const filteredFocuses = baseAssessmentFocuses.filter(focus => {
      const focusesSdgs = focus.sdgs.map(({ shortName }) => shortName)

      return focusesSdgs.some(e => e === currentMemberSdg.shortName)
    })

    const currentBaseAssessmentAnswer =
      baseAssessmentAnswers &&
      baseAssessmentAnswers.find(
        e => e && e.sdg && e.sdg.shortName === currentMemberSdg.shortName
      )

    const showNdcs = ugandaNdcs.some(s => s.logo === currentMemberSdg.shortName)

    return (
      <div className={classes.paperContainerWrapper} onClick={this.handleClose}>
        <ScrollToTop />
        <div elevation={24} className={classes.paperContainer}>
          <InstructionalOverlay
            open={open}
            handleClose={event => {
              this.handleClose()
              window.scrollTo(0, 0)
            }}
            mobile={270}
          />
          <div>
            <form
              onSubmit={e => {
                e.preventDefault()
                nextStep()
              }}
            >
              <div className={classes.focusIntroMessage}>
                <div>
                  <div className={classes.focusSdgs}>
                    <section className="paper-container__text">
                      <div className={classes.focusIntro}>
                        <h1>
                          For this SDG, which opportunities to make impact are
                          best suited to your business?
                        </h1>
                      </div>
                    </section>
                    <div className={classes.tabsContainer}>
                      <div className={classes.tabsContainerText}>
                        <h4>Our Priority SDGs</h4>
                      </div>
                      <div className={classes.tabsSubContainer}>
                        <AppBar
                          position="static"
                          color="default"
                          className={classes.bar}
                        >
                          <Tabs
                            variant="scrollable"
                            scrollButtons="auto"
                            indicatorColor="primary"
                            textColor="primary"
                            value={currentMemberSdgIndex}
                            classes={{
                              indicator: classes.tabsIndicatorBold
                            }}
                          >
                            {member.sdgs &&
                              member.sdgs.map((sdg, i) => (
                                <OpportunitiesSdgTab
                                  sdg={sdg}
                                  onClick={this.handleChange}
                                  onchange={this.updateIndex}
                                  sdgIndex={currentMemberSdgIndex}
                                  index={i}
                                  key={i}
                                  open={open}
                                  visitedSdgs={visitedSdgs}
                                />
                              ))}
                          </Tabs>
                        </AppBar>
                      </div>
                    </div>
                  </div>
                </div>
                {this.hasUganda() && showNdcs && (
                  <OppoUgandaNdcsDialog
                    ugandaNdcs={ugandaNdcs}
                    currentSdg={currentMemberSdg.shortName}
                    key={currentMemberSdg.shortName}
                  />
                )}
                <div className={classes.focusCardContainer}>
                  {filteredFocuses.map((focus, i) => (
                    <AssessmentFocusCard
                      focus={focus}
                      index={i}
                      sdgIndex={currentMemberSdgIndex}
                      open={open}
                      key={focus._id}
                      toggleFocus={e => this.toggleFocus(e, focus)}
                      isFocusSelected={
                        currentBaseAssessmentAnswer &&
                        currentBaseAssessmentAnswer.baseAssessmentFocuses &&
                        currentBaseAssessmentAnswer.baseAssessmentFocuses.some(
                          e => e._id === focus._id
                        )
                      }
                    />
                  ))}
                </div>
              </div>
              <div className="materiality-buttons">
                <div
                  aria-owns={
                    buttonPopoverOpen ? 'mouse-over-popover' : undefined
                  }
                  aria-haspopup="true"
                  onMouseEnter={
                    visitedSdgs &&
                    visitedSdgs.length <= member.sdgs.length - 1 &&
                    this.handlePopoverOpen
                  }
                  onMouseLeave={this.handlePopoverClose}
                >
                  <br />
                  <ImpactiButton
                    type="submit"
                    variant="contained"
                    buttonType={BUTTON_TYPES.FINISHED_SDG}
                    disabled={visitedSdgs.length <= member.sdgs.length - 1}
                  />
                  <Popover
                    id="mouse-over-popover"
                    className={classes.popover}
                    classes={{
                      paper: classes.paper
                    }}
                    open={buttonPopoverOpen}
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'center'
                    }}
                    transformOrigin={{
                      vertical: 'bottom',
                      horizontal: 'center'
                    }}
                    onClose={this.handlePopoverClose}
                    disableRestoreFocus
                  >
                    <Typography>
                      Please explore all SDGs before going forward
                    </Typography>
                  </Popover>
                </div>
                <div
                  className="paper-container__backbutton"
                  onClick={() => goBack()}
                  role="link"
                  tabIndex="0"
                >
                  GO BACK
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

AssessmentIdentifyBusinessOpportunities.propTypes = {
  classes: PropTypes.object.isRequired
}

export default connect(state => ({
  member: state.assessmentWizard,
  baseAssessmentFocuses: state.dictionaries.baseAssessmentFocus
}))(withStyles(style)(AssessmentIdentifyBusinessOpportunities))
