import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import styles from './style.module.css'
import { selectMember } from 'actions/applicationContext'
import { childrenVisible, nodeById } from 'selectors/organization'
import MemberRepresentation from './sidebarMemberRepresentation'
import { toggleChildrenVisibility } from 'actions/organization'

export const SIDEBAR_TYPES = {
  DEFAULT: {
    displayLink: false
  },
  WITH_SUMMARY: {
    displayLink: true,
    linkText: 'Summary',
    linkUrl: '/board/paths'
  },
  ON_DASHBOARD: {
    displayLink: true,
    linkText: 'Edit your structure',
    linkUrl: '/board/paths',
    inline: {
      height: 'auto'
    }
  }
}

class Sidebar extends React.Component {
  render() {
    return (
      <div className={styles.sidebar} style={this.props.sidebarType.inline}>
        <ul className={styles.treeUl}>
          <MemberRepresentation
            organization={this.props.organization}
            selectMember={this.props.selectMember}
            selectedMember={this.props.selectedMember.id}
            areChildrenVisible={this.props.areChildrenVisible}
            onToggleVisibility={this.props.toggleChildrenVisibility}
          />
        </ul>
        {this.props.sidebarType.displayLink && (
          <ul>
            <li>
              <a
                className={styles.sidebarBottomLink}
                href={this.props.sidebarType.linkUrl}
              >
                {this.props.sidebarType.linkText}
              </a>
            </li>
          </ul>
        )}
      </div>
    )
  }
}

Sidebar.defaultProps = {
  sidebarType: SIDEBAR_TYPES.DEFAULT
}

Sidebar.propTypes = {
  sidebarType: PropTypes.object
}

export default connect(
  state => ({
    organization: state.organization,
    selectedMember: nodeById(state.applicationContext.selectedMemberId, state)(
      state.organization
    ),
    areChildrenVisible: childrenVisible(state)
  }),
  dispatch => ({
    selectMember: selectMember(dispatch),
    toggleChildrenVisibility: toggleChildrenVisibility(dispatch)
  })
)(Sidebar)
