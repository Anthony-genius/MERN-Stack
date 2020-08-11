import React from 'react'
import PropTypes from 'prop-types'
import ArrowUp from '@material-ui/icons/KeyboardArrowUp'
import ArrowDown from '@material-ui/icons/KeyboardArrowDown'
import styles from './style.module.css'

class SidebarToggler extends React.Component {
  render() {
    return (
      <button
        className={styles.sidebarToggler}
        onClick={this.props.toggleSidebar}
      >
        <div className={styles.sidebarTogglerContent}>
          {this.props.isSidebarVisible ? (
            <ArrowUp className={styles.arrow} />
          ) : (
            <ArrowDown className={styles.arrow} />
          )}
          {this.props.selectedMemberName}
        </div>
      </button>
    )
  }
}

SidebarToggler.propTypes = {
  selectedMemberName: PropTypes.string,
  toggleSidebar: PropTypes.func,
  isSidebarVisible: PropTypes.bool
}

SidebarToggler.defaultProps = {
  selectedMemberName: null,
  toggleSidebar: () => {},
  isSidebarVisible: true
}

export default SidebarToggler
