import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'
import sinon from 'sinon'
import LoadingSpinner from 'components/LoadingSpinner'
import Component from './index'

describe('MemberForm', () => {
  let wrapper

  const props = {
    dictionaries: {
      capacity: []
    },
    initial: {
      capacity: {}
    },
    isFetchingMember: false
  }

  beforeEach(() => {
    wrapper = shallow(
      <Component initial={props.initial} dictionaries={props.dictionaries} />
    )
  })

  it('sets new person email when responsible person changes', () => {
    const event = {
      target: {
        value: 'john@impacti.solutions',
        name: 'manager'
      }
    }
    wrapper.find('[id="responsible"]').simulate('change', event)

    expect(wrapper.state().organization.manager).to.equal(
      'john@impacti.solutions'
    )
  })

  it('sets new workersNumber when user inputs new value', () => {
    const event = {
      target: {
        value: '123',
        name: 'workersNumber'
      }
    }
    wrapper.find('[id="workersNumber"]').simulate('change', event)

    expect(wrapper.state().organization.workersNumber).to.equal('123')
  })

  it('saves changes when save button is clicked', () => {
    const spy = sinon.spy()
    wrapper = shallow(
      <Component
        save={spy}
        initial={props.initial}
        dictionaries={props.dictionaries}
      />
    )

    wrapper.find('.paper-container__footer [color="primary"]').simulate('click')

    expect(spy.calledOnce).to.equal(true)
  })

  it('displays loading state, while editing member', () => {
    const spy = sinon.spy()
    wrapper = shallow(
      <Component
        initial={props.initial}
        dictionaries={props.dictionaries}
        isFetchingMember
        save={spy}
      />
    )
    expect(wrapper.find(LoadingSpinner).length).to.equal(1)
  })

  it('stops displaying the loader, when member is saved', () => {
    const spy = sinon.spy()
    wrapper = shallow(
      <Component
        initial={props.initial}
        dictionaries={props.dictionaries}
        isFetchingMember={props.isFetchingMember}
        save={spy}
      />
    )
    expect(wrapper.find(LoadingSpinner).length).to.equal(0)
  })
})
