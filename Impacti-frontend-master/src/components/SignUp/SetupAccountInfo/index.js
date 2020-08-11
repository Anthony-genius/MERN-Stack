import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Paper from '@material-ui/core/Paper'
import WithFade from '../../WithFade'

class SetupAccountInfo extends Component {
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
      <WithFade
        action={() => this.props.nextStep()}
        className="paper-container-wrapper"
      >
        <Paper
          elevation={24}
          className="paper-container paper-container--clickable"
          onClick={this.nextStep}
        >
          <div>
            <div className="paper-container__text--big">
              First, let&apos;s setup your account.
            </div>
          </div>
          <div className="paper-container__footer">
            Already have an account?{' '}
            <Link className="linkColoured" to="/login">
              Log in here.
            </Link>
          </div>
        </Paper>
      </WithFade>
    )
  }
}
export default SetupAccountInfo
