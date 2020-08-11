import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'
import { Header } from './index'

describe('Header', () => {
  let wrapper
  const props = {
    isHelpDialogOpen: false,
    isLoggedIn: true
  }
  beforeEach(() => {
    wrapper = shallow(
      <Header
        isHelpDialogOpen={props.isHelpDialogOpen}
        isLoggedIn={props.isLoggedIn}
      />
    )
  })

  it('Displays help dialog on HELP click', () => {
    wrapper.find('.helpLink').simulate('click', { preventDefault() {} })
    expect(wrapper.state().isHelpDialogOpen).to.equal(true)
  })

  it("Doesn't display loggedInContainer if user is not logged in", () => {
    wrapper = shallow(
      <Header isHelpDialogOpen={props.isHelpDialogOpen} isLoggedIn={false} />
    )
    expect(wrapper.find('.loggedInContainer')).to.have.length(0)
  })

  it("Doesn't display loggedInContainer if emptyuser is logged in in assessment", () => {
    wrapper = shallow(
      <Header
        isHelpDialogOpen={props.isHelpDialogOpen}
        isLoggedIn={props.isLoggedIn}
      />
    )
    expect(wrapper.find('.loggedInContainer')).to.have.length(0)
  })
})
