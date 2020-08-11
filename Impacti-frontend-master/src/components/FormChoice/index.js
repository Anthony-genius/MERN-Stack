import React from 'react'
import Button from '@material-ui/core/Button'
import ClearIcon from '@material-ui/icons/Replay'
import DoneIcon from '@material-ui/icons/Done'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  buttonGroup: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    margin: '4px 0 15px'
  },
  button: {
    height: 40,
    width: 40,
    minWidth: 40
  },
  input: {
    color: 'var(--primaryColor)'
  },
  saved: {
    color: '#008000'
  }
})

class FormChoice extends React.Component {
  render() {
    const { classes, onSave, onDelete, input, saved } = this.props

    return (
      <section className={classes.buttonGroup}>
        <Button variant="outlined" onClick={onSave} className={classes.button}>
          {input && !saved ? (
            <DoneIcon className={classes.input} />
          ) : saved && input ? (
            <DoneIcon className={classes.saved} />
          ) : (
            <DoneIcon />
          )}
        </Button>
        {input && !saved && (
          <Button
            variant="outlined"
            onClick={onDelete}
            className={classes.button}
          >
            <ClearIcon />
          </Button>
        )}
      </section>
    )
  }
}

export default withStyles(styles)(FormChoice)
