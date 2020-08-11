import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'
import sinon from 'sinon'
import Component from './index'

describe('DashboardTabs', () => {
  let wrapper

  const TAB_MOCKS = [
    { id: 1, name: 'Some tab name' },
    { id: 2, name: 'Some other tab name' }
  ]

  const props = {
    selectedTab: TAB_MOCKS[0],
    tabs: TAB_MOCKS,
    onTabSelect: sinon.spy()
  }

  beforeEach(() => {
    wrapper = shallow(
      <Component
        selectTab={props.selectedTab}
        tabs={props.tabs}
        onTabSelect={props.onTabSelect}
      />
    )
  })

  it('displays selected tab name', () => {
    expect(
      wrapper
        .find('div > div a')
        .first()
        .text()
    ).to.equal('Some tab name')
  })

  it('selects tab', () => {
    wrapper
      .find('div > div a')
      .at(1)
      .simulate('click', { preventDefault() {} })
    expect(props.onTabSelect.called).to.equal(true)
  })
})
