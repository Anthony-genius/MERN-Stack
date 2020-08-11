import React from 'react'
import { impactiOrange } from 'constants/inlineStyles'
import { ROUTES } from 'constants/routes'
import Widget from '../Widget'

export default class LatestAchievementsComponent extends React.Component {
  render() {
    return (
      <Widget
        widgetTexts={{
          mainTitle: 'Your latest achievements',
          subTitle: 'Thanks for your commitment',
          buttonText: 'See your achievements'
        }}
        widgetFeatures={{
          isHalfWidth: true,
          isEmpty: true
        }}
        widgetIco={require('assets/ico-prize.png')}
      >
        <div>
          It seems like you don&apos;t have any achievements yet.
          <a
            href={`/#${ROUTES.DASHBOARD}`}
            style={{ color: impactiOrange[500] }}
          >
            Add some data
          </a>
          and progress on your destinations, to open new commitment
          possibilities!
        </div>
      </Widget>
    )
  }
}
