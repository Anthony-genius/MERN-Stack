import React from 'react'
import { impactiOrange } from 'constants/inlineStyles'
import { ROUTES } from 'constants/routes'
import Widget from '../Widget'

export default class LatestJourneyReports extends React.Component {
  render() {
    return (
      <Widget
        widgetTexts={{
          mainTitle: 'Your latest journey reports',
          subTitle: 'Detailed analyses of your destinations',
          buttonText: 'See your reports'
        }}
        widgetFeatures={{
          isHalfWidth: true,
          isEmpty: true
        }}
        widgetIco={require('assets/ico-fies.png')}
      >
        <div>
          It seems like you don&apos;t have any reports yet.
          <br />
          <a
            href={`/#${ROUTES.DASHBOARD}`}
            style={{ color: impactiOrange[500] }}
          >
            Add some data
          </a>{' '}
          and progress on your destinations, to open new reporting
          possibilities!
        </div>
      </Widget>
    )
  }
}
