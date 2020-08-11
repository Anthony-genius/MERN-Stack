import React from 'react'
import { Route } from 'react-router-dom'

import StageProgress from 'components/StageProgress'
import AssessmentStep from '../Assessment/AssessmentStep'

import ScrollToTop from '../ScrollToTop'

export default function AssessmentStage({
  goBack,
  children,
  updateMember,
  updateState,
  onStart
}) {
  return (
    <>
      <ScrollToTop />
      <Route path="/assessment/:stage/:step" component={StageProgress} />
      <Route
        exact
        path="/"
        render={routeProps => (
          <AssessmentStep
            {...routeProps}
            updateMember={updateMember}
            updateState={updateState}
            onStart={onStart}
          />
        )}
      />
      <Route
        path="/assessment/:stage/:step?"
        render={routeProps => (
          <AssessmentStep
            {...routeProps}
            updateMember={updateMember}
            updateState={updateState}
            onStart={onStart}
            goBack={goBack}
          />
        )}
      />
    </>
  )
}
