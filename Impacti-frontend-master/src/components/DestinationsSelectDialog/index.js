import React from 'react'
import { Paper, Grid, Dialog } from '@material-ui/core'
import pull from 'lodash/pull'
import ImpactiChip from '../ImpactiChip/index'
import GenericErrorPanel from '../GenericErrorPanel'
import ACTION_KEYS from 'constants/actionKeys/destinations'
import style from './style.module.css'
import ImpactiButton, { BUTTON_TYPES } from 'components/ImpactiButton'

class DestinationsSelectDialog extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      selectedDestinations: Array.isArray(this.props.member.destinations)
        ? this.props.member.destinations.map(d =>
            this.props.destinations.list.find(dest => dest._id === d._id)
          )
        : []
    }
  }

  toggleDestination(destination) {
    this.setState({
      selectedDestinations: this.state.selectedDestinations.includes(
        destination
      )
        ? pull(this.state.selectedDestinations, destination)
        : this.state.selectedDestinations.concat(destination)
    })
  }

  submit() {
    this.props
      .submitDestinations(this.state.selectedDestinations, this.props.member)
      .then(res => {
        if (res.type !== ACTION_KEYS.ON_DESTINATIONS_LIST_SUBMIT_FAILURE) {
          this.props.closeModal()
        }
      })
  }

  render() {
    return (
      <Dialog
        open={this.props.isOpen}
        maxWidth="md"
        className="paper-container-wrapper"
      >
        <Paper elevation={4} className="paper-container paper-container--short">
          <Grid container>
            <Grid item xs={12}>
              <h4 className={style.header}>
                Does
                <strong>
                  {' '}
                  {this.props.member ? this.props.member.name : ''}
                </strong>
                &nbsp;have any specific destinations for this journey?
              </h4>

              <p className={style.subheader}>
                Select all that apply. Remember you can return to add / remove
                these at any time.
              </p>
            </Grid>

            <Grid item xs={12}>
              {this.props.destinations.failedSubmittingDestinations ? (
                <GenericErrorPanel />
              ) : (
                <div />
              )}
            </Grid>

            <Grid item xs={12} className={style.chipsContainer}>
              {this.props.destinations.list ? (
                this.props.destinations.list.map(destination => (
                  <ImpactiChip
                    id={`destination_${destination._id}`}
                    key={destination._id}
                    isActive={(() =>
                      this.state.selectedDestinations.includes(destination))()}
                    onClick={() => {
                      this.toggleDestination(destination)
                    }}
                    label={destination.name}
                  />
                ))
              ) : (
                <div />
              )}
            </Grid>
            <Grid item xs={12}>
              <ImpactiButton
                onClick={() => this.submit()}
                disabled={this.state.selectedDestinations.length === 0}
                buttonType={
                  this.props.buttonType || BUTTON_TYPES.SAVE_AND_PROCEED
                }
              />
              <br />
              <div
                style={{ cursor: 'pointer' }}
                className={`paper-container__backbutton ${style.skipButton}`}
                onClick={() => this.props.closeModal()}
                role="link"
                tabIndex={0}
              >
                Skip this step
              </div>
            </Grid>
          </Grid>
        </Paper>
      </Dialog>
    )
  }
}

export default DestinationsSelectDialog
