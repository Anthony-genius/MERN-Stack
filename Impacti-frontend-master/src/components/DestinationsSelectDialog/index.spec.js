import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'
import Component from './index'

describe('DestinationsSelectDialog', () => {
  let wrapper
  const props = {
    member: {
      name: 'Member Name'
    },
    destinations: {
      list: [
        { _id: '123', name: 'Whatever' },
        { _id: '456', name: 'Some other whatever' }
      ]
    }
  }
  beforeEach(() => {
    wrapper = shallow(
      <Component member={props.member} destinations={props.destinations} />
    )
  })

  it("displays company name that's been passed as a property", () => {
    expect(wrapper.find('strong').text()).to.equal(` ${props.member.name}`)
  })

  it('displays destination list', () => {
    expect(
      wrapper.find(`#destination_${props.destinations.list[0]._id}`).length
    ).to.equal(1)

    expect(
      wrapper.find(`#destination_${props.destinations.list[1]._id}`).length
    ).to.equal(1)
  })

  it('selects destination', () => {
    wrapper
      .find(`#destination_${props.destinations.list[0]._id}`)
      .simulate('click')

    expect(wrapper.state().selectedDestinations.length).to.equal(1)
  })

  it('unselects destination', () => {
    wrapper
      .find(`#destination_${props.destinations.list[0]._id}`)
      .simulate('click')

    wrapper
      .find(`#destination_${props.destinations.list[0]._id}`)
      .simulate('click')

    expect(wrapper.state().selectedDestinations.length).to.equal(0)
  })
})
