import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Grid } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import FormControl from '@material-ui/core/FormControl'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import FormChoice from 'components/FormChoice'

const styles = theme => ({
  fieldPaper: {
    padding: theme.spacing.unit * 4,
    borderRadius: 15
  }
})

class ProfileMissionDialog extends Component {
  render() {
    const {
      classes,
      handleChange,
      saveChange,
      input,
      deleteChange,
      mission,
      dirty
    } = this.props
    return (
      <Grid item xs={12}>
        <Typography gutterBottom variant="h6">
          Mission Statement
        </Typography>
        <Paper className={classes.fieldPaper}>
          {dirty && input.some(i => i === 'mission') ? (
            <FormControl margin="normal" fullWidth error>
              <InputLabel htmlFor="mission">
                What's your sustainability mission statement? - save your
                changes
              </InputLabel>
              <Input
                value={mission}
                onChange={handleChange}
                id="mission"
                name="mission"
                autoFocus
                multiline
                inputProps={{
                  maxLength: 1000
                }}
              />
              <FormChoice
                saved={mission && mission === this.props.prefill.mission}
                input={input}
                onSave={saveChange}
                onDelete={deleteChange}
              />
            </FormControl>
          ) : (
            <FormControl margin="normal" fullWidth>
              <InputLabel htmlFor="mission">
                What's your sustainability mission statement?
              </InputLabel>
              <Input
                value={mission}
                onChange={handleChange}
                id="mission"
                name="mission"
                autoFocus
                multiline
                inputProps={{
                  maxLength: 1000
                }}
              />
              <FormChoice
                saved={mission && mission === this.props.prefill.mission}
                input={input}
                onSave={saveChange}
                onDelete={deleteChange}
              />
            </FormControl>
          )}
        </Paper>
      </Grid>
    )
  }
}

ProfileMissionDialog.defaultProps = {
  prefill: {
    mission: ''
  }
}

ProfileMissionDialog.propTypes = {
  prefill: PropTypes.shape({
    mission: PropTypes.string
  })
}

export default withStyles(styles)(ProfileMissionDialog)
