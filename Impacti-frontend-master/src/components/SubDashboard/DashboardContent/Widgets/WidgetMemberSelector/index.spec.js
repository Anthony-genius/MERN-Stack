import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'
import { Select } from '@material-ui/core'
import { WidgetMemberSelectorComponent as Component } from './index'

describe('WidgetMemberSelector', () => {
  let wrapper
  const ORGANIZATION_MOCKS = [
    {
      id: 1,
      name: 'First organization'
    },
    {
      id: 2,
      name: 'Second organization'
    }
  ]
  const props = {
    organization: ORGANIZATION_MOCKS[0],
    selectedMember: ORGANIZATION_MOCKS[0]
  }

  beforeEach(() => {
    wrapper = shallow(
      <Component
        organization={props.organization}
        selectedMember={props.selectedMember}
      />
    )
  })

  it('sets Select value to selected member id', () => {
    expect(wrapper.find(Select).props().value).to.equal(
      ORGANIZATION_MOCKS[0].id
    )
  })
})
