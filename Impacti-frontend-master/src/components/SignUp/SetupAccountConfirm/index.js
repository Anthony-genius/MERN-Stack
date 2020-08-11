import React, { PureComponent } from 'react'
import Paper from '@material-ui/core/Paper'

class SetupAccountConfirm extends PureComponent {
  render() {
    return (
      <div className="paper-container-wrapper">
        <Paper elevation={24} className="paper-container">
          <div className="paper-container__text--big">
            <img
              src={require('assets/mail-sent.svg')}
              alt="envelope illustration"
            />
            <div>
              That&apos;s it! Please check your email account for
              a&nbsp;verification link to continue.
            </div>
          </div>
        </Paper>
      </div>
    )
  }
}
export default SetupAccountConfirm
