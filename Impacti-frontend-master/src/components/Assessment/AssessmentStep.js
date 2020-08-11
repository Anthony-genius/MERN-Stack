import React from 'react'
import { connect } from 'react-redux'

import AssessmentConfig from 'components/Assessment/AssessmentConfig'

import ScrollToTop from '../ScrollToTop'

function AssessmentStep({
  history,
  goBack,
  match: { path, params },
  dictionaries,
  updateState,
  updateMember,
  onStart,
  organizationData
}) {
  function nextStep() {
    const stageIndex = AssessmentConfig.stages.findIndex(
      s => s.key === params.stage
    )

    const stage = AssessmentConfig.stages[stageIndex] || 0

    const stepIndex = stage.steps.findIndex(s => s.key === params.step)

    const nextStep = stage.steps[stepIndex + 1]

    if (nextStep) {
      updateState(stage.key, nextStep.key)
    } else {
      const nextStage = AssessmentConfig.stages[stageIndex + 1]

      updateState(nextStage.key, nextStage.steps[0].key)
    }
  }

  const stage =
    AssessmentConfig.stages.find(stage => stage.key === params.stage) ||
    AssessmentConfig.stages[0]

  const step =
    stage.steps.find(step => step.key === params.step) || stage.steps[0]

  const { component: Step } = step

  return (
    <>
      <ScrollToTop />
      <Step
        onStart={onStart}
        nextStep={nextStep}
        goBack={goBack}
        updateMember={updateMember}
        dictionaries={dictionaries}
        organizationData={organizationData}
      />
    </>
  )
}

export default connect(state => ({
  state,
  assessmentWizard: state.assessmentWizard,
  dictionaries: state.dictionaries,
  organization: state.organization,
  currentName: state.assessmentWizard.currentName,
  location: state.router.location,
  auth: state.auth
}))(AssessmentStep)
