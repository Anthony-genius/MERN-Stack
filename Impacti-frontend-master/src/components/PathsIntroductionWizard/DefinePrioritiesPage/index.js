import React from 'react'
import { Paper } from '@material-ui/core'
import WithFade from '../../WithFade'

export default props => (
  <WithFade
    action={() => {
      props.history.push('/paths/define-roadmap')
    }}
    className="paper-container-wrapper"
  >
    <Paper
      elevation={24}
      className="paper-container paper-container--clickable"
      onClick={e => {
        e.preventDefault()
        props.history.push('/paths/define-roadmap')
      }}
    >
      <div>
        <div className="paper-container__text--big">
          Now that we have everyone gathered,
          <br />
          let&apos;s define the&nbsp;priorities for your journey.
        </div>
      </div>
    </Paper>
  </WithFade>
)
