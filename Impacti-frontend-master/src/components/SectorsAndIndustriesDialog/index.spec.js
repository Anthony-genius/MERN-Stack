import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'
import sinon from 'sinon'
import Component from './index'

describe('SectorsAndIndustriesDialog', () => {
  let wrapper

  const props = {
    companyName: 'Cat Planner',
    sectors: [
      {
        _id: '2j4bfk',
        name: 'Services',
        industries: [
          {
            _id: '13g54gr',
            name: 'Education'
          },
          {
            _id: '45gr545r',
            name: 'Casinos & Gaming'
          }
        ]
      },
      {
        _id: 'es9cs0435k534l543',
        name: 'Consumption',
        industries: [
          {
            _id: '5325f4gr',
            name: 'Tobacco'
          },
          {
            _id: '45g345445r',
            name: 'Toys and Sporting Goods'
          }
        ]
      }
    ],
    industries: [
      { _id: '13g54gr', name: 'Education' },
      { _id: '45gr545r', name: 'Casinos & Gaming' },
      { _id: '5325f4gr', name: 'Tobacco' },
      { _id: '45g345445r', name: 'Toys and Sporting Goods' }
    ],
    onSave() {},
    onBack() {}
  }

  beforeEach(() => {
    wrapper = shallow(
      <Component initial={props.initial} dictionaries={props.dictionaries} />
    )
  })

  it("displays company name that's been passed as a property", () => {
    wrapper = shallow(
      <Component
        companyName={props.companyName}
        sectors={props.sectors}
        industries={props.industries}
      />
    )

    expect(
      wrapper.find('.paper-container__text--large strong').text()
    ).to.equal('Cat Planner')
  })

  describe('Selected sector', () => {
    beforeEach(() => {
      wrapper = shallow(
        <Component sectors={props.sectors} industries={props.industries} />
      )
      wrapper.setState({ selectedSector: props.sectors[0] })
    })

    it('highlights selected industry', () => {
      wrapper
        .find(`[label="${props.sectors[0].industries[0].name}"]`)
        .simulate('click')
      expect(wrapper.state('selectedIndustries')).to.deep.equal([
        props.sectors[0].industries[0]
      ])
    })

    it('highlights sector and displays counter when an industry is being selected', () => {
      wrapper.find(`[label="${props.industries[0].name}"]`).simulate('click')

      expect(wrapper.find('.industriesCounter').text()).to.equal('1')
    })

    it('unselects industry', () => {
      const prefill = { industries: [props.industries[0]], sectors: [] }
      wrapper = shallow(
        <Component
          sectors={props.sectors}
          industries={props.industries}
          prefill={prefill}
        />
      )
      wrapper.setState({ selectedSector: props.sectors[0] })

      wrapper.find(`[label="${props.industries[0].name}"]`).simulate('click')

      expect(wrapper.state('selectedIndustries')).to.deep.equal([])
    })

    it('calls onSave on button click', () => {
      const prefill = {
        industries: [props.industries[0]],
        sectors: [props.sectors[0]]
      }
      const onSave = sinon.spy()
      wrapper = shallow(
        <Component
          companyName={props.companyName}
          sectors={props.sectors}
          industries={props.industries}
          onSave={onSave}
          prefill={prefill}
        />
      )

      wrapper.find('[buttonType]').simulate('click')

      expect(onSave.called).to.equal(true)
    })
  })
})
