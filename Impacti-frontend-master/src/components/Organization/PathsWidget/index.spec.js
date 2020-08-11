import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'
import sinon from 'sinon'
import { PathsWidgetComponent as Component } from './index'

describe('PathsWidget', () => {
  let wrapper
  const props = {
    member: {
      paths: [
        {
          _id: 1
        },
        {
          _id: 2
        }
      ]
    },
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
    highlightedPathId: '',
    getIntersection: () => () => {}
  }
  beforeEach(() => {
    wrapper = shallow(
      <Component
        paths={props.paths}
        member={props.member}
        highlightedPathId={props.highlightedPathId}
        onPathSelect={props.onPathSelect}
        getIntersection={props.getIntersection}
      />
    )
  })

  it('set highlighted state of a path on a click', () => {
    wrapper.instance().onPathSelect(1)
    expect(wrapper.state('highlightedPathId')).to.deep.equal(1)
  })

  it('remove highlighted state of a path on a click', () => {
    wrapper.setState({ highlightedPathId: 1 })
    wrapper.instance().onPathSelect(1)
    expect(wrapper.state('highlightedPathId')).to.deep.equal('')
  })

  it('set highlighted state of a path on a click when other path is highlighted', () => {
    wrapper.setState({ highlightedPathId: 1 })
    wrapper.instance().onPathSelect(2)
    expect(wrapper.state('highlightedPathId')).to.deep.equal(2)
  })

  it('run action on path delete with some proper id', () => {
    const spy = sinon.spy()
    const member = {
      id: 12
    }
    wrapper = shallow(
      <Component
        paths={props.paths}
        member={member}
        highlightedPathId={props.highlightedPathId}
        deletePath={spy}
        getIntersection={props.getIntersection}
      />
    )
    wrapper.instance().onPathDelete(props.paths[0])
    expect(spy.calledWith(props.paths[0], member.id))
  })
})
