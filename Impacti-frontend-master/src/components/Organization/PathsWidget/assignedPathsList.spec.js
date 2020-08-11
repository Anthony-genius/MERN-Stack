import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'
import sinon from 'sinon'
import Component from './assignedPathsList'

describe('AssignedPathsList', () => {
  let wrapper
  const props = {
    paths: [
      {
        _id: 1
      },
      {
        _id: 2
      }
    ],
    assignedPaths: [],
    onPathSelect: () => {},
    onPathDelete: () => {},
    highlightedPathId: '',
    getPathsToDisplay: () => []
  }
  beforeEach(() => {
    wrapper = shallow(
      <Component
        paths={props.paths}
        member={props.member}
        highlightedPathId={props.highlightedPathId}
        onPathSelect={props.onPathSelect}
        onPathDelete={props.onPathDelete}
        getPathsToDisplay={props.getPathsToDisplay}
      />
    )
  })

  it('delete path', () => {
    const spy = sinon.spy()
    wrapper = shallow(
      <Component
        paths={props.paths}
        highlightedPathId={1}
        onPathSelect={props.onPathSelect}
        onPathDelete={spy}
        getPathsToDisplay={props.getPathsToDisplay}
      />
    )
    wrapper.find('[role="button"]').simulate('click', { stopPropagation() {} })
    expect(spy.calledOnce).to.equal(true)
  })
})
