import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'
import sinon from 'sinon'
import Component from './index'

describe('TypesDialog', () => {
  let wrapper

  const props = {
    companyName: 'Crazy Duck',
    types: [
      { _id: '989ss8a12j', name: 'Foundation' },
      { _id: 'a00cd8', name: 'City' }
    ],
    onSave() {},
    onBack() {}
  }

  beforeEach(() => {
    wrapper = shallow(
      <Component initial={props.initial} dictionaries={props.dictionaries} />
    )
  })

  it("displays organization type name that's been passed as a property", () => {
    wrapper = shallow(
      <Component companyName={props.companyName} types={props.types} />
    )
    expect(
      wrapper.find('.paper-container__text--large strong').text()
    ).to.equal('Crazy Duck')
  })

  it('selects prefill types', () => {
    const prefill = [props.types[1]]

    wrapper = shallow(
      <Component
        companyName={props.companyName}
        types={props.types}
        prefillTypes={prefill}
      />
    )
    expect(wrapper.state('selectedTypes')).to.deep.equal(prefill)
  })

  it('unselect type', () => {
    const prefill = [props.types[1]]

    wrapper = shallow(
      <Component
        companyName={props.companyName}
        types={props.types}
        prefillTypes={prefill}
      />
    )

    wrapper.find(`[label="${props.types[1].name}"]`).simulate('click')

    expect(wrapper.state('selectedTypes')).to.deep.equal([])
  })

  it('calls onSave on button click', () => {
    const prefill = [props.types[1]]
    const onSave = sinon.spy()
    wrapper = shallow(
      <Component
        companyName={props.companyName}
        types={props.types}
        onSave={onSave}
        prefillTypes={prefill}
      />
    )

    wrapper.find('[buttonType]').simulate('click')

    expect(onSave.called).to.equal(true)
  })
})
