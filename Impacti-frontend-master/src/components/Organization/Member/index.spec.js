import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'
import sinon from 'sinon'
import LoadingSpinner from '../../LoadingSpinner'
import { MemberComponent as Component } from './index'

describe('Member', () => {
  const props = {
    isRemovingMember: false
  }

  let wrapper

  beforeEach(() => {
    wrapper = shallow(
      <Component
        isRemovingMember={props.isRemovingMember}
        remove={props.remove}
      />
    )
  })

  it('displays loading state, while removing member', () => {
    const spy = sinon.spy()
    wrapper = shallow(<Component isRemovingMember remove={spy} />)
    expect(wrapper.find(LoadingSpinner).length).to.equal(1)
  })

  it('stops displaying the loader, when member is removed', () => {
    const spy = sinon.spy()
    wrapper = shallow(
      <Component isRemovingMember={props.isRemovingMember} remove={spy} />
    )
    expect(wrapper.find(LoadingSpinner).length).to.equal(0)
  })
})
