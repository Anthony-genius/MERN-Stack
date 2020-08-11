import React from 'react'
import { Paper } from '@material-ui/core'
import WithFade from '../WithFade'

export default props => (
  <WithFade
    className="paper-container-wrapper"
    action={() => {
      props.history.push('/dashboard')
    }}
  >
    <Paper
      elevation={24}
      className="paper-container paper-container--clickable"
      onClick={() => {
        props.history.push('/dashboard')
      }}
    >
      <div>
        <div className="paper-container__text--big">
          Congratulations!
          <br />
          You&apos;re all set to start the journey!
        </div>
      </div>
    </Paper>
  </WithFade>
)
