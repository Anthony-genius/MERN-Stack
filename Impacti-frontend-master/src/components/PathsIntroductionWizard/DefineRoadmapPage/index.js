import React from 'react'
import { Paper, Typography } from '@material-ui/core'
import ImpactiButton, { BUTTON_TYPES } from 'components/ImpactiButton'
import styles from './style.module.css'

export default props => (
  <div className="paper-container-wrapper">
    <Paper elevation={24} className="paper-container paper-container--short">
      <div>
        <img
          src={require('assets/panels.svg')}
          alt="->"
          className="arrowRightIco"
        />
        <div className={styles.content}>
          <Typography type="body1">
            The Impacti WebApp helps you determine your priorities based on
            desired outputs (destinations) and sustainability areas (paths).
            Based on your choices, the application will provide support along
            your journey with suggestions and guidance.
          </Typography>
        </div>

        <div>
          <ImpactiButton
            buttonType={{
              ...BUTTON_TYPES.SAVE_AND_PROCEED,
              label: 'DEFINE MY ROAD MAP'
            }}
            onClick={() => {
              props.history.push('/paths')
            }}
          />
        </div>
      </div>
    </Paper>
  </div>
)
