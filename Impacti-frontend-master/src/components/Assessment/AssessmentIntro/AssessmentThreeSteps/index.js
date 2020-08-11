import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import ImpactiButton, { BUTTON_TYPES } from 'components/ImpactiButton'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepButton from '@material-ui/core/StepButton'
import StepLabel from '@material-ui/core/StepLabel'
import LogoIcon from '../../../LogoIcon'

const styles = theme => ({
  assessmentContainer: {
    alignItems: 'center',
    background: '#ffffff',
    display: 'flex',
    justifyContent: 'center',
    margin: '0 auto',
    maxWidth: '1200px',
    minHeight: '512px',
    padding: '30px 0',
    position: 'relative',
    textAlign: 'center'
  },
  introMessage: {
    maxWidth: '95vw',
    '& h1': {
      margin: '0',
      color: '#00a0b2',
      fontWeight: '600'
    },
    '& p:last-child': {
      margin: '20px auto 25px'
    }
  },
  subTitle: {
    marginTop: '0',
    fontSize: '24px',
    lineHeight: '1.33',
    padding: '0 15px 15px'
  },
  step: {
    '& button': {
      margin: '-34px -16px',
      zIndex: '2'
    },
    '& div': {
      left: 'calc(-35% + 10px)',
      right: 'calc(65% + 10px)',
      '& span': {
        borderColor: 'var(--primaryColor)',
        borderTopWidth: '4px'
      }
    }
  },
  label: {
    '& span:last-child': {
      '& span': {
        color: '#000'
      }
    },
    '& svg': {
      height: '2em',
      width: '2em',
      fill: 'var(--primaryColor)',
      '& text': {
        fill: '#fff'
      }
    }
  },
  /* Responsive */
  '@media screen and (max-width: 2880px)': {
    'GoalsPopover-popover-207': {
      left: '70% !important'
    },
    step: {
      minWidth: '9vw'
    }
  },
  '@media screen and (max-width: 1920px)': {
    step: {
      minWidth: '12vw'
    }
  },
  '@media screen and (max-width: 1600px)': {
    'GoalsPopover-popover-207': {
      left: '70% !important'
    }
  },
  '@media screen and (max-width: 1366px)': {
    step: {
      minWidth: '13vw'
    }
  },
  '@media screen and (max-width: 1280px)': {
    step: {
      minWidth: '12vw'
    }
  },
  '@media screen and (max-width: 1024px)': {
    step: {
      minWidth: '15vw'
    }
  },
  '@media screen and (max-width: 960px)': {
    step: {
      minWidth: '13vw'
    }
  },
  '@media screen and (max-width: 768px)': {
    assessmentContainer: {
      padding: 0,
      margin: 0
    },
    introMessage: {
      '& h1': {
        fontSize: '26px'
      },
      '& p': {
        fontSize: '16px',
        padding: '5px'
      }
    },
    stepper: {
      flexDirection: 'column',
      alignItems: 'center'
    },
    step: {
      minWidth: '27vw',
      '& div': {
        '& span': {
          border: 'none'
        }
      },
      '& button': {
        padding: '40px 16px'
      }
    },
    bottomButton: {
      marginBottom: theme.spacing.unit * 10
    }
  }
})

const AssessmentThreeSteps = ({ nextStep, classes }) => (
  <div elevation={8} className={classes.assessmentContainer}>
    <div className="paper-container__text--big">
      <div className={classes.introMessage}>
        <h1 className="paper-container__text--big">
          Build your Sustainable Business Profile
        </h1>
        <p className={classes.subTitle}>
          by completing this FREE assessment in 3 easy steps!
        </p>
        <p className="paper-container__text--large">
          Interested in sustainability but not sure where to get started? Use
          this assessment to learn about the Sustainable Development Goals, and
          identify opportunities suited to your business to integrate
          sustainability into your operations and value chain.
        </p>
        <Stepper nonLinear alternativeLabel className={classes.stepper}>
          <Step className={classes.step} key={1}>
            <StepButton active={false} disabled={true}>
              <StepLabel className={classes.label}>
                Tell us about
                <br />
                <strong>Your Business</strong>
              </StepLabel>
            </StepButton>
          </Step>
          <Step className={classes.step} key={2}>
            <StepButton active={false} disabled={true}>
              <StepLabel className={classes.label}>
                Select
                <br />
                <strong>Sustainability Priorities</strong>
              </StepLabel>
            </StepButton>
          </Step>
          <Step className={classes.step} key={3} active={true}>
            <StepButton active={false} disabled={true}>
              <StepLabel className={classes.label}>
                Explore
                <br />
                <strong>Opportunities to Make Impact</strong>
              </StepLabel>
            </StepButton>
          </Step>
          <Step className={classes.step} key={4} active={true}>
            <StepButton active={false} disabled={true} icon={<LogoIcon />}>
              <StepLabel className={classes.label}>
                Receive your
                <br />
                <strong>Sustainable Business Profile</strong>
              </StepLabel>
            </StepButton>
          </Step>
        </Stepper>
        <p className="paper-container__text--small">
          Once your profile is complete, we’ll connect you with guidance and
          tools to keep you on top of the latest opportunities that business
          sustainability offers.
        </p>
      </div>
      <ImpactiButton
        onClick={() => nextStep()}
        variant="contained"
        buttonType={BUTTON_TYPES.NEXT}
        className={classes.bottomButton}
      />
    </div>
  </div>
)
export default withStyles(styles)(AssessmentThreeSteps)
