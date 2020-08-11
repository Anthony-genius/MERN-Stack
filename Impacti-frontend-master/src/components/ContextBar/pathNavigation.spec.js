import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'
import sinon from 'sinon'
import Component from './pathNavigation'
import ImpactiAddIcon from 'components/ImpactiAddIcon'

describe('pathNavigation', () => {
  let wrapper

  const props = {
    paths: [
      { _id: '423v423432v', name: 'Sustainable Innovation' },
      { _id: '4432v42wr33', name: 'Community outreach' },
      { _id: '22sgsgsd3', name: 'Sustainable sourcing' },
      { _id: 'aaa2v42wr33', name: 'Governance & integrity' }
    ],
    visiblePaths: [
      { _id: '423v423432v', name: 'Sustainable Innovation' },
      { _id: '4432v42wr33', name: 'Community outreach' }
    ],
    selectedPathId: '423v423432v'
  }

  beforeEach(() => {
    wrapper = shallow(
      <Component paths={props.paths} visiblePaths={props.visiblePaths} />
    )
  })

  it('selects overall impact tab by default', () => {
    expect(wrapper.find('.pathIconActive').text()).to.equal('Overall Impact')
  })

  it('calls onPathSelect on path icon click', () => {
    const onPathSelect = sinon.spy()
    wrapper = shallow(
      <Component
        paths={props.paths}
        visiblePaths={props.visiblePaths}
        onPathSelect={onPathSelect}
      />
    )
    wrapper
      .find('a.pathIcon')
      .first()
      .simulate('click', { preventDefault() {} })
    expect(onPathSelect.called).to.equal(true)
  })

  it('selects given path and displays its name', () => {
    wrapper = shallow(
      <Component
        paths={props.paths}
        visiblePaths={props.visiblePaths}
        selectedPathId={props.selectedPathId}
      />
    )
    expect(wrapper.instance().isPathSelected(props.selectedPathId)).to.equal(
      true
    )
    expect(wrapper.find('.pathIconActive').text()).to.equal(
      props.paths.find(p => p._id === props.selectedPathId).name
    )
  })

  it('displays popup with paths on plus icon click', () => {
    wrapper.find(ImpactiAddIcon).simulate('click')
    expect(wrapper.state('pathsPopupIsOpen')).to.equal(true)
  })

  it('close popup on closePopup function run', () => {
    wrapper.setState({ pathsPopupIsOpen: true })
    wrapper.instance().closePopup()
    expect(wrapper.state('pathsPopupIsOpen')).to.equal(false)
  })

  it('close popup on withPopupClose function run', () => {
    wrapper.setState({ pathsPopupIsOpen: true })
    wrapper.instance().withPopupClose(() => {})
    expect(wrapper.state('pathsPopupIsOpen')).to.equal(false)
  })
})
