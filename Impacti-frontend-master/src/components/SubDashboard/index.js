import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import ContextBar from '../ContextBar'
import Sidebar, { SIDEBAR_TYPES } from 'components/Sidebar'
import { rememberUri } from 'actions/session'
import WithDynamicData, { DYNAMIC_DATA_KEYS } from '../WithDynamicData'
import { selectPath, selectMemberByItsId } from 'actions/applicationContext'
import DashboardContent from './DashboardContent'
import style from './style.module.css'

class Dashboard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isSidebarVisible: true
    }
    this.toggleSidebar = this.toggleSidebar.bind(this)
  }

  onFetchFinish() {
    const { memberId, pathId } = this.props.match.params
    const { selectedMemberId, selectedPathId } = this.props

    this.props.rememberUri('/dashboard')
    this.props.onMemberSelect(memberId || selectedMemberId)
    this.props.onPathSelect(pathId || selectedPathId || null)

    const urlToPush = `/dashboard/${memberId || selectedMemberId}/${pathId ||
      selectedPathId ||
      ''}`
    if (this.props.history.location.pathname !== urlToPush) {
      this.props.history.push(urlToPush)
    }
  }

  toggleSidebar() {
    this.setState({ isSidebarVisible: !this.state.isSidebarVisible })
  }

  render() {
    return (
      <WithDynamicData
        dataToFetch={[
          DYNAMIC_DATA_KEYS.ORGANIZATION,
          DYNAMIC_DATA_KEYS.TAB_DEFINITIONS
        ]}
        onFetchFinish={() => this.onFetchFinish()}
      >
        <ContextBar
          toggleSidebar={this.toggleSidebar}
          isSidebarVisible={this.state.isSidebarVisible}
        />
        <div className={style.componentWrapper}>
          {this.state.isSidebarVisible && (
            <Sidebar sidebarType={SIDEBAR_TYPES.ON_DASHBOARD} />
          )}
          <DashboardContent />
        </div>
      </WithDynamicData>
    )
  }
}

Dashboard.propTypes = {
  rememberUri: PropTypes.func
}

Dashboard.defaultProps = {
  onPathSelect: () => {},
  rememberUri: () => {},
  onMemberSelect: () => {}
}

export default connect(
  state => ({
    organization: state.organization,
    selectedMemberId: state.applicationContext.selectedMemberId,
    selectedPathId: state.applicationContext.selectedPathId
  }),

  dispatch => ({
    rememberUri: rememberUri(dispatch),
    onPathSelect: selectPath(dispatch),
    onMemberSelect: selectMemberByItsId(dispatch)
  })
)(Dashboard)
