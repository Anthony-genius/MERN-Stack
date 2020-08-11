import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import ImpactiButton, { BUTTON_TYPES } from 'components/ImpactiButton'

const styles = theme => ({
  paperContainer: {
    padding: '30px 0',
    maxWidth: '1200px',
    alignItems: 'center',
    background: '#ffffff',
    display: 'flex',
    justifyContent: 'center',
    margin: '30px auto',
    minHeight: '512px',
    position: 'relative',
    textAlign: 'left',
    [theme.breakpoints.down('xs')]: {
      padding: 0
    }
  },
  introMessage: {
    maxWidth: '930px',
    '& h1': {
      color: 'var(--primaryColor)',
      fontSize: '55px',
      margin: '10px auto',
      [theme.breakpoints.down('xs')]: {
        fontSize: '1em'
      }
    },
    '& p': {
      fontSize: '25px',
      fontWeight: '400',
      marginBottom: '34px',
      margin: '10px auto'
    },
    '& button': {
      margin: '25px 15px'
    }
  }
})

class AssessmentMainIntro extends Component {
  render() {
    const { classes, onStart } = this.props
    return (
      <div className="paper-container-wrapper">
        <div elevation={24} className={classes.paperContainer}>
          <div className="paper-container__text--big">
            <div className={classes.introMessage}>
              <h1 className="paper-container__text--large">
                Make sustainability your business
              </h1>
              <p className="paper-container__text--large">
                The Sustainable Development Goals offer great business
                opportunities. But where can your business make the most impact?
                Find out here!
              </p>
              <ImpactiButton
                onClick={onStart}
                variant="contained"
                buttonType={BUTTON_TYPES.START}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}
AssessmentMainIntro.propTypes = {
  classes: PropTypes.object.isRequired
}
export default withStyles(styles)(AssessmentMainIntro)
