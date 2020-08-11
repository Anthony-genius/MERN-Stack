import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'
import sinon from 'sinon'
import Component from './index'

describe('DefineRoadmapgsPage', () => {
  let wrapper

  const props = {
    history: {
      push: sinon.spy()
    }
  }

  beforeEach(() => {
    wrapper = shallow(<Component history={props.history} />)
  })

  it('goes to next step if one asks to go to next step', () => {
    wrapper.find('[buttonType]').simulate('click', { preventDefault() {} })

    expect(props.history.push.calledWith('/paths')).to.equal(true)
  })
})
