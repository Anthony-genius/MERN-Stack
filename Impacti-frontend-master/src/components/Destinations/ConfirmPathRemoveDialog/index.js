import React from 'react'
import { Paper, Button, Grid, Dialog } from '@material-ui/core'
import { connect } from 'react-redux'
import { closeConfirmPathRemoveModal, removePath } from 'actions/destinations'
import style from './style.module.css'
import { nodeById } from 'selectors/organization'
import LoadingSpinner from '../../LoadingSpinner'

import IcoArrowRight from 'assets/ico-arrow-right.svg'

export class ConfirmPathRemoveDialogComponent extends React.Component {
  render() {
    return (
      <Dialog
        open={this.props.isOpen}
        maxWidth="md"
        className="paper-container-wrapper"
      >
        <Paper elevation={4} className="paper-container paper-container--short">
          {this.props.isRemovingPath ? (
            <div className={style.spinnerContainer}>
              <LoadingSpinner />
            </div>
          ) : (
            <Grid container>
              <Grid item xs={12}>
                <h2 className={style.header}>Are you sure, to deselect it?</h2>
                <p className={style.subheader}>
                  This path is necessary to reach your selected destination(s).
                  If you deselect it, you will not be able to achieve:
                </p>
              </Grid>

              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    this.props.submit(
                      this.props.pathToRemove,
                      this.props.selectedMember.id
                    )
                  }}
                >
                  PROCEED
                  <img src={IcoArrowRight} alt="->" className="arrowRightIco" />
                </Button>
                <br />
                <div
                  style={{ cursor: 'pointer' }}
                  className={`paper-container__backbutton ${style.skipButton}`}
                  onClick={() => this.props.closeModal()}
                  role="link"
                  tabIndex={0}
                >
                  Cancel
                </div>
              </Grid>
            </Grid>
          )}
        </Paper>
      </Dialog>
    )
  }
}

export default connect(
  state => ({
    destinations: state.dictionaries.destination,
    isOpen: state.destinations.isConfirmPathRemoveDialogOpen,
    selectedMember: nodeById(state.applicationContext.selectedMemberId, state)(
      state.organization
    ),
    pathToRemove: state.destinations.pathToRemove,
    isRemovingPath: state.destinations.isRemovingPath
  }),
  dispatch => ({
    closeModal: closeConfirmPathRemoveModal(dispatch),
    submit: removePath(dispatch)
  })
)(ConfirmPathRemoveDialogComponent)
