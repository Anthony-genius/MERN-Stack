import React, { Component } from 'react'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import { Link } from 'react-router-dom'

class SetupAccountIntro extends Component {
  constructor(props, context) {
    super(props, context)
    this.nextStep = this.nextStep.bind(this)
  }
  nextStep(e) {
    e.preventDefault()
    this.props.nextStep()
  }
  render() {
    return (
      <div className="paper-container-wrapper">
        <Paper elevation={24} className="paper-container">
          <div>
            <div className="paper-container__text--big">
              Sustainability is a continuous journey.
              <br />
              The Impacti WebApp is your travel guide.
            </div>
            <div className="paper-container__text--small">
              Sustainability management is an ongoing process of setting
              targets, implementing actions and verifying achievements. The
              Impacti WebApp leads you through this journey step-by-step.
            </div>
            <div>
              <Button
                variant="contained"
                color="primary"
                className="paper-container__button"
                onClick={this.nextStep}
              >
                OK, LET&apos;S GO!
              </Button>
            </div>
          </div>
          <div className="paper-container__footer">
            Already have an account?{' '}
            <Link className="linkColoured" to="/login">
              Log in here.
            </Link>
          </div>
        </Paper>
      </div>
    )
  }
}
export default SetupAccountIntro
