import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'
import sinon from 'sinon'
import Component from './index'

describe('PathsCompletionConfirmationPage', () => {
  let wrapper

  const props = {
    history: {
      push: sinon.spy()
    }
  }

  beforeEach(() => {
    wrapper = shallow(<Component history={props.history} />)
  })

  it('goes to dashboard if one asks to go there', () => {
    wrapper.find('[elevation]').simulate('click', { preventDefault() {} })

    expect(props.history.push.calledWith('/dashboard')).to.equal(true)
  })
})
