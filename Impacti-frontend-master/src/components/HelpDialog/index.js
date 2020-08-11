import React from 'react'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import { Paper, Grid, Dialog } from '@material-ui/core'
import style from './style.module.css'
import HELP_DIALOG_CONTENT from './../../constants/helpDialog'

class HelpDialog extends React.Component {
  static stripHash(hashUrl) {
    return hashUrl.split('/')[1]
  }
  render() {
    return (
      <Dialog
        open={this.props.isHelpDialogOpen}
        maxWidth="md"
        className="paper-container-wrapper"
        onRequestClose={this.props.closeHelpDialog}
      >
        <Paper elevation={4} className="paper-container paper-container--short">
          <Grid container>
            <Grid item xs={12}>
              <Typography type="headline">ImpactI Help</Typography>
              <p className={style.content}>
                {HELP_DIALOG_CONTENT[
                  HelpDialog.stripHash(window.location.hash)
                ] || HELP_DIALOG_CONTENT.default}
              </p>
            </Grid>
            <Grid item xs={12}>
              <div
                style={{ cursor: 'pointer' }}
                className={`paper-container__backbutton ${style.skipButton}`}
                onClick={this.props.closeHelpDialog}
                role="link"
                tabIndex={0}
              >
                Close
              </div>
            </Grid>
          </Grid>
        </Paper>
      </Dialog>
    )
  }
}
HelpDialog.defaultProps = {
  closeHelpDialog: () => {},
  isHelpDialogOpen: false
}

HelpDialog.propTypes = {
  closeHelpDialog: PropTypes.func,
  isHelpDialogOpen: PropTypes.bool
}

export default HelpDialog
