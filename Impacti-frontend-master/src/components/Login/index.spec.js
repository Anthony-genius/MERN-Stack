import React from 'react'
import sinon from 'sinon'
import { shallow } from 'enzyme'
import { expect } from 'chai'
import LoadingSpinner from 'components/LoadingSpinner'
import GenericErrorMessage from '../GenericErrorPanel'
import { LoginComponent as Component } from './index'

describe('LoginComponent', () => {
  let wrapper

  const props = {
    auth: {},
    login: () => sinon.stub().resolves({})
  }

  beforeEach(() => {
    wrapper = shallow(<Component auth={props.auth} login={props.login} />)
  })

  it('displays loading state, while submitting the login', () => {
    wrapper = shallow(
      <Component
        auth={{
          ...props.auth,
          isSubmittingLogin: true
        }}
        login={props.login}
      />
    )
    expect(wrapper.find(LoadingSpinner).length).to.equal(1)
  })

  it("stops displaying the loader, when it totally doesn't make sense", () => {
    wrapper = shallow(
      <Component
        auth={{
          ...props.auth,
          isSubmittingLogin: false
        }}
        login={props.login}
      />
    )
    expect(wrapper.find(LoadingSpinner).length).to.equal(0)
  })

  it('displays error message when server gently responses with some', () => {
    wrapper = shallow(
      <Component
        auth={{
          ...props.auth,
          hasLoginErrorOccurred: true,
          loginErrorMessage: 'Something bad happened'
        }}
        login={props.login}
      />
    )
    wrapper.setState({ isDirty: false })
    expect(wrapper.find(GenericErrorMessage).length).to.equal(1)
  })

  it("doesn't display mentioned error message, when form is dirty", () => {
    wrapper = shallow(
      <Component
        auth={{
          ...props.auth,
          hasLoginErrorOccurred: true,
          loginErrorMessage: 'Something bad happened'
        }}
        login={props.login}
      />
    )
    wrapper.setState({ isDirty: true })
    expect(wrapper.find(GenericErrorMessage).length).to.equal(0)
  })
})
