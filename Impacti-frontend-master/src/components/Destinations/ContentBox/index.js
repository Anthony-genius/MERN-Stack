import React from 'react'
import { connect } from 'react-redux'
import { Grid, Button } from '@material-ui/core'
import styles from './style.module.css'
import SinglePath from './SinglePath'
import ConfirmPathRemoveDialog from '../ConfirmPathRemoveDialog'
import {
  openConfirmPathRemoveModal,
  selectPath,
  addPaths
} from 'actions/destinations'
import { nodeById } from 'selectors/organization'

import IcoArrowRight from 'assets/ico-arrow-right.svg'

class ContentBox extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      selectedPaths: []
    }
  }

  onPathClick(path) {
    if (this.isPathSelected(path)) {
      this.unselectPath(path)
      return
    }
    this.selectPath(path)
  }

  isPathSelected(path) {
    return this.props.selectedPaths.some(p => path._id === p)
  }

  unselectPath(path) {
    this.props.openConfirmPathRemoveModal(path)
  }

  selectPath(path) {
    this.props.selectPath(path)
  }

  submit() {
    this.props.submit(this.props.selectedPaths, this.props.selectedMember.id)
    this.props.onGoToPathsBoard()
  }

  render() {
    return (
      <div className={styles.contentBox}>
        <div className={styles.textContainer}>
          <h1 className={styles.header}>{this.props.selectedMember.name}</h1>
          <p>
            Below are potential paths for you to explore. Your selection will
            apply to all members, but you will be able to edit them later.
          </p>
        </div>
        <div
          className={styles.pathsContainer}
          style={{ borderImage: "url('/assets/border.png') 1 round" }}
        >
          <Grid container>
            {Array.isArray(this.props.paths) ? (
              this.props.paths.map(path => (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  key={path._id}
                  onClick={() => {
                    this.onPathClick(path)
                  }}
                >
                  <SinglePath
                    destinations={this.props.destinations}
                    path={path}
                    isSelected={(() => this.isPathSelected(path))()}
                  />
                </Grid>
              ))
            ) : (
              <div />
            )}
          </Grid>
        </div>
        <div className={styles.saveButtonContainer}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              this.submit()
            }}
          >
            SAVE AND PROCEED
            <img src={IcoArrowRight} alt="->" className="arrowRightIco" />
          </Button>
        </div>
        <ConfirmPathRemoveDialog />
      </div>
    )
  }
}

export default connect(
  state => ({
    destinations: state.dictionaries.destination,
    paths: state.dictionaries.path,
    selectedMember: nodeById(state.applicationContext.selectedMemberId, state)(
      state.organization
    ),
    selectedPaths: state.destinations.selectedPaths
  }),
  dispatch => ({
    openConfirmPathRemoveModal: openConfirmPathRemoveModal(dispatch),
    selectPath: selectPath(dispatch),
    submit: addPaths(dispatch)
  })
)(ContentBox)
