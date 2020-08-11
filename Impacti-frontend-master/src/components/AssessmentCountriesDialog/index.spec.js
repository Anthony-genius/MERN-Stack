import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'
import sinon from 'sinon'
import Component from './index'

describe('AssessmentCountriesDialog', () => {
  let wrapper

  const props = {
    countries: [
      { _id: '31415926535', name: 'United Kingdom' },
      { _id: '12', name: 'Ireland' }
    ],
    onSave() {},
    onBack() {}
  }

  beforeEach(() => {
    wrapper = shallow(
      <Component initial={props.initial} dictionaries={props.dictionaries} />
    )
  })

  it('displays selected countries', () => {
    wrapper = shallow(<Component countries={props.countries} />)

    wrapper
      .find('[id="31415926535"]')
      .simulate('change', { target: { checked: true } })

    expect(wrapper.state('selectedCountries')).to.deep.equal([
      props.countries[0]
    ])
  })

  it('selects prefill countries', () => {
    const prefill = [props.countries[1]]

    wrapper = shallow(
      <Component countries={props.countries} prefillCountries={prefill} />
    )
    expect(wrapper.state('selectedCountries')).to.deep.equal(prefill)
  })

  it('unselects country', () => {
    const prefill = [props.countries[1]]

    wrapper = shallow(
      <Component countries={props.countries} prefillCountries={prefill} />
    )
    wrapper.find('.chip-default').simulate('click')

    expect(wrapper.state('selectedCountries')).to.deep.equal([])
  })

  it('calls onSave on button click', () => {
    const prefill = [props.countries[1]]
    const onSave = sinon.spy()
    wrapper = shallow(
      <Component
        countries={props.countries}
        onSave={onSave}
        prefillCountries={prefill}
      />
    )

    wrapper.find('[buttonType]').simulate('click')

    expect(onSave.called).to.equal(true)
  })

  it("should not select countries when they're just being filtered", () => {
    wrapper = shallow(<Component countries={props.countries} />)

    wrapper.find('#filterCountriesText').simulate('change', {
      target: {
        value: 'united kin'
      }
    })

    expect(wrapper.state('selectedCountries')).to.deep.equal([])
  })

  it('should filter visible countries based on filter text change', () => {
    wrapper = shallow(<Component countries={props.countries} />)

    wrapper.find('#filterCountriesText').simulate('change', {
      target: {
        value: 'united kin'
      }
    })

    expect(wrapper.state('visibleCountries')).to.deep.equal([
      props.countries[0]
    ])
  })

  it('should display filtered list (visible countries) instead of all available countries', () => {
    wrapper = shallow(<Component countries={props.countries} />)

    wrapper.find('#filterCountriesText').simulate('change', {
      target: {
        value: 'united kin'
      }
    })

    expect(wrapper.find('input[type="checkbox"]').length).to.deep.equal(1)
  })
})
