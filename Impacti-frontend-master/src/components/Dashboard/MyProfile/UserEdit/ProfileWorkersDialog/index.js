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

class ProfileWorkersDialog extends Component {
  constructor(props, context) {
    super(props, context)
    const { prefill } = props

    this.state = {
      open: false,
      workersNumber: prefill ? prefill.workersNumber : '',
      input: false
    }
  }
  handleChange = name => event => {
    this.setState({
      workersNumber: event.target.value,
      input: true
    })
  }
  saveChange = () => {
    this.props.onSave(this.state.workersNumber)
  }

  deleteChange = () => {
    this.setState({ workersNumber: this.props.prefill.workersNumber })
  }

  render() {
    const { classes } = this.props
    const { workersNumber, input } = this.state

    return (
      <Grid item xs={12} sm={4}>
        <Typography gutterBottom variant="subtitle1">
          Workers number
        </Typography>
        <Paper className={classes.fieldPaper}>
          <FormControl margin="normal" fullWidth>
            <InputLabel htmlFor="workersNumber">Workers number</InputLabel>
            <Input
              value={workersNumber}
              onChange={this.handleChange('workersNumber')}
              type="number"
              id="workersNumber"
              name="workersNumber"
              autoFocus
            />
            <FormChoice
              saved={
                workersNumber &&
                workersNumber == this.props.prefill.workersNumber
              }
              input={input}
              onSave={this.saveChange}
              onDelete={this.deleteChange}
            />
          </FormControl>
        </Paper>
      </Grid>
    )
  }
}

ProfileWorkersDialog.defaultProps = {
  prefill: {
    workersNumber: 0
  }
}

ProfileWorkersDialog.propTypes = {
  prefill: PropTypes.shape({
    workersNumber: PropTypes.number
  })
}

export default withStyles(styles)(ProfileWorkersDialog)
