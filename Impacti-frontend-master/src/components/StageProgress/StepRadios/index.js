import React from 'react'
import Radio from '@material-ui/core/Radio'

const StepRadios = ({ params, steps }) => {
  const currentStepIndex = steps.findIndex(step => step.key === params.step)

  return (
    <div>
      {steps.length !== 1
        ? steps.map((step, i) => (
            <Radio
              key={step.key}
              checked={i <= currentStepIndex ? true : false}
              color="primary"
            />
          ))
        : ''}
    </div>
  )
}
export default StepRadios
