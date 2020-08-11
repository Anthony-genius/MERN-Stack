import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'
import { ConfirmPathRemoveDialogComponent as Component } from './index'
import LoadingSpinner from '../../LoadingSpinner'

describe('ConfirmPathRemoveDialog', () => {
  let wrapper

  const props = {
    destinations: [],
    isOpen: true,
    selectedMember: {},
    pathToRemove: { _id: 1 },
    isRemovingPath: false,
    closeModal() {},
    submit() {}
  }

  beforeEach(() => {
    wrapper = shallow(<Component {...props} />)
  })

  it('does not display spinner while not loading', () => {
    expect(wrapper.find(LoadingSpinner).length).to.equal(0)
  })
  it('displays loading state, while deleting the path', () => {
    wrapper = shallow(
      <Component
        {...{
          ...props,
          isRemovingPath: true
        }}
      />
    )

    expect(wrapper.find(LoadingSpinner).length).to.equal(1)
  })
})
