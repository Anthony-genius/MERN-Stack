import React from 'react'
import { connect } from 'react-redux'

import AssignedPathsList from './assignedPathsList'
import AvailablePathsListPopup from '../../AvailablePathsListPopup'
import ImpactiAddIcon from 'components/ImpactiAddIcon'
import { nodeById } from 'selectors/organization'
import { pathAndMemberIntersection } from 'selectors/destinations'
import {
  addPaths,
  addPathsWithoutCascade,
  removePathOnTreeView
} from './../../../actions/destinations'
import style from './style.module.css'

export class PathsWidgetComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      popupIsOpen: false,
      highlightedPathId: ''
    }
    this.onPathSelect = this.onPathSelect.bind(this)
    this.onPathDelete = this.onPathDelete.bind(this)
  }

  onPathSelect(id) {
    return this.state.highlightedPathId === '' ||
      this.state.highlightedPathId !== id
      ? this.setState({ highlightedPathId: id })
      : this.setState({ highlightedPathId: '' })
  }
  onPathDelete(path) {
    this.props.deletePath(path, this.props.member.id)
  }

  openPopup() {
    this.setState({ popupIsOpen: true })
  }

  closePopup() {
    this.setState({ popupIsOpen: false })
  }

  withPopupClose(fn) {
    this.closePopup()
    fn()
  }

  render() {
    return (
      <div className={style.componentContainer}>
        <AssignedPathsList
          paths={this.props.member.paths}
          highlightedPathId={this.state.highlightedPathId}
          onPathSelect={this.onPathSelect}
          onPathDelete={this.onPathDelete}
          member={this.props.member}
          getPathsToDisplay={this.props.getIntersection(this.props.member)}
        />
        <div>
          <ImpactiAddIcon onClick={() => this.openPopup()} />
        </div>
        {this.state.popupIsOpen && (
          <AvailablePathsListPopup
            onAddPath={paths =>
              this.withPopupClose(() =>
                this.props.addPath(paths.map(p => p._id), this.props.member.id)
              )
            }
            onAddPathWithoutCascade={paths =>
              this.withPopupClose(() =>
                this.props.addPathWithoutCascade(
                  paths.map(p => p._id),
                  this.props.member.id
                )
              )
            }
            allPaths={this.props.paths}
            assignedPaths={this.props.member.paths}
            closePopup={() => this.closePopup()}
          />
        )}
      </div>
    )
  }
}

export default connect(
  (state, props) => ({
    member: nodeById(props.id, state)(state.organization),
    paths: state.dictionaries.path,
    getIntersection: pathAndMemberIntersection(state.dictionaries.destination)
  }),
  dispatch => ({
    addPath: addPaths(dispatch),
    addPathWithoutCascade: addPathsWithoutCascade(dispatch),
    deletePath: removePathOnTreeView(dispatch)
  })
)(PathsWidgetComponent)
