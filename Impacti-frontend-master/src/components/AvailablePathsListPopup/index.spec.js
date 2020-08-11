import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'
import Component from './index'

describe('AvailablePathsListPopup', () => {
  let wrapper
  const props = {
    allPaths: [
      {
        _id: 1
      }
    ],
    assignedPaths: []
  }
  beforeEach(() => {
    wrapper = shallow(
      <Component
        allPaths={props.allPaths}
        assignedPaths={props.assignedPaths}
      />
    )
  })

  it('initializes state with hidden confirmation modal', () => {
    expect(wrapper.state()).to.deep.equal({ isConfirmationModalVisible: false })
  })

  it('opens modal on path click', () => {
    wrapper.find('[role="link"]').simulate('click')
    expect(wrapper.state('isConfirmationModalVisible')).to.equal(true)
  })

  it('sets selectedPath on path click', () => {
    wrapper.find('[role="link"]').simulate('click')
    expect(wrapper.state('selectedPath')).to.deep.equal(props.allPaths[0])
  })

  it("doesn't show any paths if they are all selected", () => {
    wrapper = shallow(
      <Component allPaths={props.allPaths} assignedPaths={props.allPaths} />
    )

    expect(wrapper.find('[role="link"]').length).to.equal(0)
  })
})
