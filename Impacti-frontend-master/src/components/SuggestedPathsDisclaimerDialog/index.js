import React from 'react'
import { Paper, Dialog, Grid } from '@material-ui/core'
import { connect } from 'react-redux'
import { closeSuggestedPathsDisclaimerModal } from 'actions/destinations'
import ImpactiButton, { BUTTON_TYPES } from 'components/ImpactiButton'
import style from './style.module.css'

class SuggestedPathsDisclaimerDialog extends React.Component {
  render() {
    return (
      <Dialog
        open={this.props.isOpen}
        maxWidth="md"
        className="paper-container-wrapper"
        onRequestClose={() => this.props.closeModal()}
      >
        <Paper elevation={4} className="paper-container paper-container--short">
          <Grid container>
            <Grid item xs={12}>
              <img
                className={style.image}
                src={require('assets/panels.svg')}
                alt="panels"
              />
            </Grid>
            <Grid item xs={12}>
              <div className={style.content}>
                Based on your destinations, sector and locations, we have
                prepared some suggested paths for you. To understake a
                comprehensive analysis of what you and your stakeholders
                idenitfy as the priorities for your journey, you would have to
                upgrade your plan to a premium and proceed with materiality
                assessment.
              </div>
            </Grid>
            <Grid item xs={12}>
              <ImpactiButton
                buttonType={{
                  ...BUTTON_TYPES.SAVE_AND_PROCEED,
                  label: 'Review suggested paths'
                }}
                onClick={() => this.props.closeModal()}
              />
            </Grid>
          </Grid>
        </Paper>
      </Dialog>
    )
  }
}

export default connect(
  state => ({
    isOpen: state.destinations.isSuggestedPathsDisclaimerModalOpen
  }),
  dispatch => ({
    closeModal: closeSuggestedPathsDisclaimerModal(dispatch)
  })
)(SuggestedPathsDisclaimerDialog)
