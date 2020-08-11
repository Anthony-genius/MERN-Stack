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

class ProfileAboutDialog extends Component {
  render() {
    const {
      classes,
      handleChange,
      saveChange,
      input,
      deleteChange,
      description,
      dirty
    } = this.props

    return (
      <Grid item xs={12}>
        <Typography gutterBottom variant="h6">
          About
        </Typography>
        <Paper className={classes.fieldPaper}>
          {dirty && input.some(i => i === 'description') ? (
            <FormControl margin="normal" fullWidth error>
              <InputLabel htmlFor="description">
                About - save your changes
              </InputLabel>
              <Input
                value={description}
                onChange={handleChange}
                id="description"
                name="description"
                autoFocus
                multiline
                inputProps={{
                  maxLength: 1000
                }}
              />

              <FormChoice
                saved={
                  description && description === this.props.prefill.description
                }
                input={input}
                onSave={saveChange}
                onDelete={deleteChange}
              />
            </FormControl>
          ) : (
            <FormControl margin="normal" fullWidth>
              <InputLabel htmlFor="description">About</InputLabel>
              <Input
                value={description}
                onChange={handleChange}
                id="description"
                name="description"
                autoFocus
                multiline
                inputProps={{
                  maxLength: 1000
                }}
              />
              <FormChoice
                saved={
                  description && description === this.props.prefill.description
                }
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

ProfileAboutDialog.defaultProps = {
  prefill: {
    description: ''
  }
}

ProfileAboutDialog.propTypes = {
  prefill: PropTypes.shape({
    description: PropTypes.string
  })
}

export default withStyles(styles)(ProfileAboutDialog)
