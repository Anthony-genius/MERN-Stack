import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import SidebarToggler from './sidebarToggler'
import PathNavigation from './pathNavigation'
import { selectPath } from 'actions/applicationContext'
import { addPaths, addPathsWithoutCascade } from 'actions/destinations'
import { nodeById } from 'selectors/organization'
import styles from './style.module.css'

class ContextBar extends React.Component {
  render() {
    return (
      <div className={styles.contextBar}>
        <SidebarToggler
          selectedMemberName={this.props.selectedMember.name}
          toggleSidebar={this.props.toggleSidebar}
          isSidebarVisible={this.props.isSidebarVisible}
        />
        <PathNavigation
          paths={this.props.paths}
          onPathSelect={this.props.onPathSelect}
          visiblePaths={this.props.selectedMember.paths}
          selectedPathId={this.props.selectedPathId}
          selectedMember={this.props.selectedMember}
          addPath={this.props.addPath}
          addPathWithoutCascade={this.props.addPathWithoutCascade}
        />
      </div>
    )
  }
}

ContextBar.propTypes = {
  selectedMember: PropTypes.object,
  toggleSidebar: PropTypes.func,
  isSidebarVisible: PropTypes.bool,
  paths: PropTypes.array
}

ContextBar.defaultProps = {
  selectedMember: {},
  toggleSidebar: () => {},
  isSidebarVisible: true,
  paths: []
}

export default connect(
  state => ({
    selectedMember: nodeById(state.applicationContext.selectedMemberId, state)(
      state.organization
    ),
    selectedPathId: state.applicationContext.selectedPathId,
    paths: state.dictionaries.path
  }),
  dispatch => ({
    onPathSelect: selectPath(dispatch),
    addPath: addPaths(dispatch),
    addPathWithoutCascade: addPathsWithoutCascade(dispatch)
  })
)(ContextBar)
