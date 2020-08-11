import React from 'react'
import { connect } from 'react-redux'
import ContentBox from './ContentBox'
import DestinationsFirstSelectDialog from '../DestinationsSelectDialog/firstSelect'
import { openFirstDestinationSelectModal } from 'actions/destinations'
import SuggestedPathsDisclaimerDialog from '../SuggestedPathsDisclaimerDialog'
import WithDynamicData, { DYNAMIC_DATA_KEYS } from '../WithDynamicData'

class Paths extends React.Component {
  componentDidMount() {
    this.props.openModal()
  }

  onSubmit() {
    this.props.history.push('/board/paths')
  }

  render() {
    return (
      <WithDynamicData dataToFetch={[DYNAMIC_DATA_KEYS.ORGANIZATION]}>
        <ContentBox onGoToPathsBoard={() => this.onSubmit()} />
        <DestinationsFirstSelectDialog />
        <SuggestedPathsDisclaimerDialog />
      </WithDynamicData>
    )
  }
}

export default connect(
  () => ({}),
  dispatch => ({
    openModal: openFirstDestinationSelectModal(dispatch)
  })
)(Paths)
