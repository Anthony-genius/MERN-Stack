import React from 'react'
import { connect } from 'react-redux'
import { widgetContextMemberId } from 'selectors/widgets/commitmentTracker'
import { impactiOrange } from 'constants/inlineStyles'
import { ROUTES } from 'constants/routes'
import DASHBOARD_WIDGETS from 'constants/dashboardWidgets'

import Widget from '../Widget'

export class CommitmentTrackerComponent extends React.Component {
  render() {
    return (
      <Widget
        widgetTexts={{
          mainTitle: 'Commitment tracker',
          subTitle: 'Progress on your commitments',
          buttonText: 'Commitment tracker'
        }}
        widgetFeatures={{
          hasMemberSelector: true,
          isEmpty: true
        }}
        widgetType={DASHBOARD_WIDGETS.COMMITMENT_TRACKER}
      >
        <div>
          It seems that you didn&apos;t define any commitments to your defined
          directions. First try to{' '}
          <a
            href={`/#${ROUTES.DASHBOARD}`}
            style={{ color: impactiOrange[500] }}
          >
            add more data
          </a>{' '}
          and prepare a report from your journey!
        </div>
      </Widget>
    )
  }
}

export default connect(
  state => ({
    selectedMemberId: widgetContextMemberId(state),
    selectedPathId: state.applicationContext.selectedPathId
  }),
  () => ({})
)(CommitmentTrackerComponent)
