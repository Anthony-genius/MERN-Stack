import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Popover from '@material-ui/core/Popover'
import Typography from '@material-ui/core/Typography'
import styles from '../style.module.css'
import style from './style.module.css'
import ImpactiButton, { BUTTON_TYPES } from 'components/ImpactiButton'
import UgandaNdcsDialog from './UgandaNdcsDialog'
import InstructionalOverlay from '../InstructionalOverlay'
import RecommendationsSdgs from './RecommendationsSdgs'
import ScrollToTop from '../../ScrollToTop'

const stylesPopover = theme => ({
  paper: {
    padding: '20px',
    width: '14vw',
    position: 'fixed'
  },
  popover: {
    pointerEvents: 'none'
  }
})

class AssessmentSdgRecommendations extends Component {
  state = {
    open: true,
    selectedSdgCount: 3,
    anchorEl: null
  }

  handleClose = () => {
    this.setState({ open: false })
    window.scrollTo(0, 0)
  }

  hasUganda = () => {
    const { countries } = this.props
    const ugandaCheck = countries.some(
      country => country && country.name === 'Uganda'
    )
    return ugandaCheck
  }

  handlePopoverOpen = event => {
    this.setState({ anchorEl: event.currentTarget })
  }

  handlePopoverClose = () => {
    this.setState({ anchorEl: null })
  }

  setSelectedSdgCount = count => {
    this.setState({ selectedSdgCount: count })
  }

  render() {
    const { classes, nextStep, goBack, updateMember } = this.props

    const { open, selectedSdgCount, anchorEl } = this.state
    const openPopover = Boolean(anchorEl)

    return (
      <div className={styles.paperContainerWrapper}>
        <ScrollToTop />
        <Paper elevation={0} className={style.paperContainer}>
          <InstructionalOverlay
            open={open}
            handleClose={this.handleClose}
            mobile={window.innerWidth < 365 ? 700 : 580}
            mobileSm={1500}
          />
          <div className="paper-container__text">
            <div className={styles.introMessage}>
              <section className={style.introText}>
                <h1>Which SDGs do you want to prioritize for your business?</h1>
                <p className="paper-container__text">
                  It’s best to focus on a few SDGs where your business can make
                  meaningful impact.
                  <br /> Here are our top 3 recommended SDGs for your business
                  to help you get started.
                  <br /> Feel free to explore more SDGs and choose the ones
                  you'd like to prioritize.
                </p>
              </section>
              {this.hasUganda() && <UgandaNdcsDialog />}
              <section className={style.cardContainer}>
                <RecommendationsSdgs
                  updateMember={updateMember}
                  open={open}
                  setSelectedSdgCount={this.setSelectedSdgCount}
                />
              </section>
            </div>
          </div>
          <div className="materiality-buttons">
            <div
              aria-owns={open ? 'mouse-over-popover' : undefined}
              aria-haspopup="true"
              onMouseEnter={
                selectedSdgCount === 0 ? this.handlePopoverOpen : null
              }
              onMouseLeave={this.handlePopoverClose}
            >
              <br />
              <ImpactiButton
                variant="contained"
                onClick={nextStep}
                buttonType={BUTTON_TYPES.NEXT}
                disabled={selectedSdgCount == 0}
              />
              <Popover
                id="mouse-over-popover"
                className={classes.popover}
                classes={{
                  paper: classes.paper
                }}
                open={openPopover}
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
                <Typography>Please choose at least one SDG</Typography>
              </Popover>
            </div>
            <div
              className="paper-container__backbutton"
              onClick={goBack}
              role="link"
              tabIndex="0"
            >
              GO BACK
            </div>
          </div>
        </Paper>
      </div>
    )
  }
}
export default connect(state => ({
  countries: state.assessmentWizard.countries
}))(withStyles(stylesPopover)(AssessmentSdgRecommendations))
