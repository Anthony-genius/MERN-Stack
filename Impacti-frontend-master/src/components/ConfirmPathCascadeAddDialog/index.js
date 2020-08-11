import React from 'react'
import { Paper, Grid, Dialog } from '@material-ui/core'
import PropTypes from 'prop-types'
import style from './style.module.css'
import ImpactiButton, { BUTTON_TYPES } from 'components/ImpactiButton'

class ConfirmPathCascadeAddDialog extends React.Component {
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
              <h2 className={style.header}>
                Do you want to apply this path to the other members of this
                branch?
              </h2>
            </Grid>

            <Grid item xs={12}>
              <ImpactiButton
                className={style.button}
                onClick={() => this.props.onYes()}
                buttonType={BUTTON_TYPES.YES}
              />
              <ImpactiButton
                className={style.button}
                onClick={() => this.props.onNo()}
                buttonType={BUTTON_TYPES.NO}
              />

              <br />
              <div
                style={{ cursor: 'pointer' }}
                className={`paper-container__backbutton ${style.skipButton}`}
                onClick={() => this.props.onCancel()}
                role="link"
                tabIndex={0}
              >
                Cancel
              </div>
            </Grid>
          </Grid>
        </Paper>
      </Dialog>
    )
  }
}

ConfirmPathCascadeAddDialog.defaultProps = {
  onYes: () => {},
  onNo: () => {},
  onCancel: () => {},
  isOpen: false
}

ConfirmPathCascadeAddDialog.propTypes = {
  onYes: PropTypes.func,
  onNo: PropTypes.func,
  onCancel: PropTypes.func,
  isOpen: PropTypes.bool
}

export default ConfirmPathCascadeAddDialog
