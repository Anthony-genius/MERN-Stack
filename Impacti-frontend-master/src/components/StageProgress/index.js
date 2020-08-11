import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepButton from '@material-ui/core/StepButton'
import StepLabel from '@material-ui/core/StepLabel'
import StepConnector from '@material-ui/core/StepConnector'
import AssessmentConfig from 'components/Assessment/AssessmentConfig'
import LogoIcon from '../LogoIcon'

const styles = theme => ({
  wrapper: {
    fontFamily: '"Roboto", sans-serif',
    maxWidth: 1350,
    margin: '2em auto 0'
  },
  stepper: {
    [theme.breakpoints.down('xs')]: {
      padding: '24px 5px'
    }
  },
  stepButton: {
    [theme.breakpoints.down('xs')]: {
      margin: '-26px -18px'
    }
  },
  buttons: {
    marginTop: 30
  },
  step: {
    zIndex: 0,
    '& button': {
      margin: '-26px -16px',
      zIndex: 2,
      [theme.breakpoints.down('xs')]: {
        margin: '-26px -18px',
        zIndex: 2
      }
    },
    '& div': {
      left: 'calc(50% + 50px)',
      right: 'calc(-50% + 50px)',
      [theme.breakpoints.down('xs')]: {
        display: 'none'
      },
      '& span': {
        borderTopWidth: 4
      }
    },
    '&:last-child': {
      '& div': {
        display: 'none'
      }
    }
  },
  active: {
    '&::before': {
      content: '""',
      display: 'inline-block',
      width: 15,
      height: 15,
      borderRadius: '50%',
      border: '4px solid var(--primaryColor)',
      backgroundColor: '#fff',
      position: 'absolute',
      top: '-9px',
      left: '45%',
      pointerEvents: 'none'
    }
  },
  label: {
    '& svg': {
      height: '1.5em',
      width: '1.5em',
      '& text': {
        fill: '#fff'
      }
    },
    '& span': {
      '& last-child': {
        '& span': {
          color: '#000'
        }
      }
    }
  },
  disabledLabel: {
    '& svg': {
      height: '1.5em',
      width: '1.5em',
      fill: '#fff',
      border: '4px solid #828282',
      borderRadius: '50%',
      '& text': {
        fill: '#828282'
      }
    }
  },
  logoIcon: {
    '& label': {
      '& svg': {
        fill: 'var(--primaryColor)'
      }
    }
  },

  connectorActive: {
    '& $connectorLine': {
      borderImage:
        'linear-gradient(to right, var(--primaryColor) 50%, #828282 50%) 5'
    }
  },
  connectorCompleted: {
    '& $connectorLine': {
      borderColor: 'var(--primaryColor)'
    }
  },
  connectorDisabled: {
    '& $connectorLine': {
      borderColor: '#828282'
    }
  },
  connectorLine: {
    transition: theme.transitions.create('border-color')
  }
})

const StageProgress = ({ match: { path, params }, classes }) => {
  const { stages } = AssessmentConfig
  let currentStageIndex = stages.findIndex(s => s.key === params.stage)

  return (
    <div className={classes.wrapper}>
      {currentStageIndex !== 1 ? (
        <Stepper
          alternativeLabel
          activeStep={currentStageIndex}
          className={classes.stepper}
        >
          {stages.map(
            (stage, i) =>
              stage.number && (
                <Step
                  className={classes.step}
                  key={i}
                  active={currentStageIndex === i ? true : false}
                  completed={currentStageIndex > i ? true : false}
                  disabled={currentStageIndex < i ? true : false}
                >
                  {stage.key !== 'sdg-profile' ? (
                    <StepButton className={classes.stepButton}>
                      <StepLabel
                        className={
                          currentStageIndex === i || currentStageIndex > i
                            ? classes.label
                            : classes.disabledLabel
                        }
                      >
                        {stage.title}
                      </StepLabel>
                    </StepButton>
                  ) : (
                    <StepButton
                      className={
                        currentStageIndex !== i ? '' : classes.logoIcon
                      }
                      icon={<LogoIcon />}
                    >
                      <StepLabel className={classes.label}>
                        {stage.title}
                      </StepLabel>
                    </StepButton>
                  )}
                  <StepConnector
                    classes={{
                      active: classes.connectorActive,
                      completed: classes.connectorCompleted,
                      disabled: classes.connectorDisabled,
                      line: classes.connectorLine
                    }}
                    className={currentStageIndex === i ? classes.active : ''}
                  />
                  >
                </Step>
              )
          )}
        </Stepper>
      ) : (
        ''
      )}
    </div>
  )
}

StageProgress.propTypes = {
  classes: PropTypes.object
}

export default withStyles(styles)(StageProgress)
