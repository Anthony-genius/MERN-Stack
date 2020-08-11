import React from 'react'
import { Popover } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import EditIcon from '@material-ui/icons/Edit'
import { findDOMNode } from 'react-dom'
import EditDestinationsDialog from '../../DestinationsSelectDialog/edit'

import API_CONSTANTS from 'constants/api'
import style from './style.module.css'
import ImpactiChip, { CHIP_TYPES } from 'components/ImpactiChip'

class AssignedPathsList extends React.Component {
  constructor(props, ctx) {
    super(props, ctx)
    this.state = {
      anchorEl: null
    }

    this.buttons = {}
  }

  isPathHighlighted(id) {
    return id === this.props.highlightedPathId
  }

  selectPath(e) {
    this.props.onPathSelect(e._id)
    this.setState({ anchorEl: findDOMNode(this.buttons[e._id]) })
  }

  render() {
    return (
      <div className={style.assignedPathsListContainer}>
        {this.props.paths.map(e => (
          <span key={e._id} className={style.pathIconWrapper}>
            <span
              style={{ cursor: 'pointer' }}
              onClick={() => this.selectPath(e)}
              className={style.pathAssigned}
              role="link"
              tabIndex={0}
              ref={node => {
                this.buttons[e._id] = node
              }}
            >
              <img
                className={style.pathIconAssigned}
                src={`${API_CONSTANTS.BASE_URL}${e.iconLocation}`}
                alt=""
                style={{
                  background: e.displayColor
                }}
              />
            </span>
            {this.isPathHighlighted(e._id) &&
              !this.state.isEditDestinationsDialogOpen && (
                <span
                  style={{ cursor: 'pointer' }}
                  className={style.removePath}
                  onClick={ev => {
                    ev.stopPropagation()
                    this.selectPath(e)
                    this.props.onPathDelete(e)
                  }}
                  role="button"
                  tabIndex={0}
                >
                  <img
                    src={require('assets/diagram-remove.png')}
                    alt="Remove"
                  />
                </span>
              )}

            <Popover
              open={this.isPathHighlighted(e._id)}
              className={style.somePopover}
              anchorEl={this.state.anchorEl}
              onRequestClose={() => this.selectPath(e)}
              anchorOrigin={{
                vertical: 'center',
                horizontal: 'center'
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'center'
              }}
            >
              <CloseIcon
                className={style.closePopoverIcon}
                onClick={() => this.selectPath(e)}
              />
              <span className={style.selectedDestinationsLabel}>
                Selected destinations:
              </span>
              <div className={style.destinationsContainer}>
                {this.props.getPathsToDisplay(e).map(destination => (
                  <ImpactiChip
                    key={destination._id}
                    label={destination.name}
                    chipType={CHIP_TYPES.SMALL}
                    isActive
                  />
                ))}
              </div>
              <div className={style.destinationsButton}>
                <div
                  style={{ cursor: 'pointer' }}
                  onClick={event => {
                    event.preventDefault()
                    this.setState({
                      isEditDestinationsDialogOpen: true
                    })
                  }}
                >
                  Edit destinations
                  <EditIcon className={style.editIcon} />
                </div>
              </div>
            </Popover>
          </span>
        ))}
        {this.state.isEditDestinationsDialogOpen && (
          <EditDestinationsDialog
            isOpen={this.state.isEditDestinationsDialogOpen}
            member={this.props.member}
            className={style.editDestinationsModal}
            closeModal={() =>
              this.setState({
                isEditDestinationsDialogOpen: false
              })
            }
          />
        )}
      </div>
    )
  }
}

export default AssignedPathsList
