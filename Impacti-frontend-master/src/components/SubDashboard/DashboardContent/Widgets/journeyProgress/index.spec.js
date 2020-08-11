import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'
import LoadingSpinner from 'components/LoadingSpinner'
import { JourneyProgressComponent as Component } from './index'

describe('JourneyProgress', () => {
  let wrapper

  const props = {
    loadProgressJourneyData: () => {}
  }

  beforeEach(() => {
    wrapper = shallow(
      <Component
        isLoadingData={props.isLoadingData}
        loadProgressJourneyData={props.loadProgressJourneyData}
      />
    )
  })

  it('displays loading state, while loading widget boxes data', () => {
    wrapper = shallow(
      <Component
        isLoadingData
        loadProgressJourneyData={props.loadProgressJourneyData}
      />
    )
    expect(wrapper.find(LoadingSpinner).length).to.equal(1)
  })

  it('stops displaying the loader, when it is not needed', () => {
    wrapper = shallow(
      <Component
        isLoadingData={props.isLoadingData}
        loadProgressJourneyData={props.loadProgressJourneyData}
      />
    )
    expect(wrapper.find(LoadingSpinner).length).to.equal(0)
  })
})
