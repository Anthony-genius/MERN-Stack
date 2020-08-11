import React from 'react'
import PropTypes from 'prop-types'
import API_CONSTANTS from 'constants/api'
import styles from './style.module.css'
import { impactiOrange } from 'constants/inlineStyles'
import ImpactiAddIcon from 'components/ImpactiAddIcon'
import AvailablePathsListPopup from 'components/AvailablePathsListPopup'

class PathNavigation extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isPathsPopupOpen: false
    }
  }
  isPathSelected(pathId) {
    return pathId === this.props.selectedPathId
  }

  closePopup() {
    this.setState({ pathsPopupIsOpen: false })
  }

  withPopupClose(fn) {
    this.closePopup()
    fn()
  }

  render() {
    return (
      <div className={styles.pathsList}>
        <div
          className={
            this.isPathSelected(null) ? styles.pathIconActive : styles.pathIcon
          }
          style={{
            cursor: 'pointer',
            background: this.isPathSelected(null)
              ? impactiOrange[500]
              : 'inherit',
            borderTopColor: impactiOrange[500]
          }}
          onClick={e => {
            e.preventDefault()
            this.props.onPathSelect(null)
          }}
        >
          <img
            src={require('assets/impacti-logo-without-text.png')}
            alt=""
            className={styles.pathIconImage}
            style={{
              background: impactiOrange[500]
            }}
          />
          {this.isPathSelected(null) && (
            <span className={styles.pathName}>Overall Impact</span>
          )}
        </div>
        {this.props.paths
          .filter(path => this.props.visiblePaths.some(p => path._id === p._id))
          .map(path => (
            <div
              key={path._id}
              className={
                this.isPathSelected(path._id)
                  ? styles.pathIconActive
                  : styles.pathIcon
              }
              style={{
                cursor: 'pointer',
                background: this.isPathSelected(path._id)
                  ? path.displayColor
                  : 'inherit',
                borderTopColor: path.displayColor
              }}
              onClick={e => {
                e.preventDefault()
                this.props.onPathSelect(path._id)
              }}
            >
              <img
                src={`${API_CONSTANTS.BASE_URL}${path.iconLocation}`}
                alt=""
                className={styles.pathIconImage}
                style={{
                  background: path.displayColor
                }}
              />
              {this.isPathSelected(path._id) && (
                <span className={styles.pathName}>{path.name}</span>
              )}
            </div>
          ))}
        <div className={styles.addPathWrapper}>
          <ImpactiAddIcon
            onClick={() => {
              this.setState({ pathsPopupIsOpen: true })
            }}
          />
          {this.state.pathsPopupIsOpen && (
            <AvailablePathsListPopup
              onAddPath={paths =>
                this.withPopupClose(() =>
                  this.props.addPath(
                    paths.map(p => p._id),
                    this.props.selectedMember.id
                  )
                )
              }
              onAddPathWithoutCascade={paths =>
                this.withPopupClose(() =>
                  this.props.addPathWithoutCascade(
                    paths.map(p => p._id),
                    this.props.selectedMember.id
                  )
                )
              }
              allPaths={this.props.paths}
              assignedPaths={this.props.selectedMember.paths}
              closePopup={() => this.closePopup()}
            />
          )}
        </div>
      </div>
    )
  }
}

PathNavigation.propTypes = {
  paths: PropTypes.array,
  onPathSelect: PropTypes.func,
  visiblePaths: PropTypes.array,
  selectedPathId: PropTypes.string,
  selectedMember: PropTypes.object,
  addPathWithoutCascade: PropTypes.func,
  addPath: PropTypes.func
}

PathNavigation.defaultProps = {
  paths: [],
  onPathSelect: () => {},
  visiblePaths: [],
  selectedPathId: null,
  selectedMember: {},
  addPathWithoutCascade: () => {},
  addPath: () => {}
}

export default PathNavigation
