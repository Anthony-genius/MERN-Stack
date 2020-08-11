import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import FormControl from '@material-ui/core/FormControl'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import FormChoice from 'components/FormChoice'
const styles = theme => ({
  pathText: {
    margin: '15px',
    whiteSpace: 'pre-line',
    textAlign: 'left',
    fontWeight: 200,
    width: '100%',
    [theme.breakpoints.down('xs')]: {
      width: '75vw'
    }
  },
  editMode: {
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column-reverse'
    }
  },
  editButtonsContainer: {
    display: 'flex'
  },
  editButton: {
    backgroundColor: '#fff',
    minWidth: 25,
    '& svg': {
      color: '#fff',
      background: 'var(--secondaryColor)',
      borderRadius: '50%'
    },
    '&:hover': {
      backgroundColor: '#fff'
    }
  }
})
class SdgFocus extends React.Component {
  state = {
    text: this.props.value.title ? this.props.value.title : '',
    editFocusMode: false,
    saved: true,
    openDialog: false
  }

  enterEditFocusMode = () => {
    this.setState(({ countries, description, sectors }) => ({
      editFocusMode: true
    }))
  }

  handleChange = event => {
    this.setState({
      text: event.target.value,
      saved: false
    })
    this.props.addFocusInput()
  }

  saveChange = () => {
    const { onChange, action, sdg, focus } = this.props
    onChange(action.id, sdg._id, focus, this.state.text, true)
    this.setState({ editFocusMode: false, saved: true })
    this.props.removeInput('focus')
  }

  deleteChange = () => {
    this.setState({
      text: this.props.value.title,
      saved: true
    })
    this.props.removeInput('focus')
  }

  deleteAction = () => {
    const { onDelete, action, sdg, focus } = this.props
    onDelete(action.id, sdg._id, focus)
  }

  toggleDialog = () => {
    this.setState(({ openDialog }) => ({
      openDialog: !openDialog
    }))
  }

  handleClose = () => {
    this.setState({
      openDialog: false
    })
  }

  handleDelete = () => {
    this.deleteAction()
    this.handleClose()
  }

  checkActionHasCustomTitle = action => {
    const check = action.customTitle === true && true
    return check
  }

  render() {
    const { editFocusMode, text, saved, openDialog } = this.state
    const { classes, input, action, dirty } = this.props

    return !editFocusMode ? (
      <div key={action.id} className={classes.editMode}>
        <div className={classes.editButtonsContainer}>
          <Button
            type="submit"
            color="primary"
            aria-label="edit"
            className={classes.editButton}
            onClick={this.enterEditFocusMode}
          >
            <EditIcon />
          </Button>
          <Button
            type="submit"
            color="primary"
            aria-label="edit"
            className={classes.editButton}
            onClick={
              this.checkActionHasCustomTitle(action)
                ? this.toggleDialog
                : this.deleteAction
            }
          >
            <DeleteIcon />
          </Button>
        </div>
        <p className={classes.pathText}>{action.title}</p>
        <Dialog
          open={openDialog}
          onClose={this.handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">
            {'You may lose data'}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              You have entered a custom action text, which will be deleted if
              you remove this action.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Keep action
            </Button>
            <Button
              onClick={this.handleDelete}
              variant="contained"
              color="primary"
            >
              Remove action anyway
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    ) : !saved && dirty && input.some(i => i === 'focus') ? (
      <FormControl margin="normal" fullWidth error>
        <InputLabel htmlFor="customAction">
          Fill in your action here - save your changes
        </InputLabel>
        <Input
          value={text}
          onChange={this.handleChange}
          type="string"
          id="customAction"
          name="customAction"
          autoFocus
          multiline
        />
        <FormChoice
          saved={saved}
          input={input}
          onSave={this.saveChange}
          onDelete={this.deleteChange}
        />
      </FormControl>
    ) : (
      <FormControl margin="normal" fullWidth>
        <InputLabel htmlFor="customAction">Fill in your action here</InputLabel>
        <Input
          value={text}
          onChange={this.handleChange}
          type="string"
          id="customAction"
          name="customAction"
          autoFocus
          multiline
        />
        <FormChoice
          saved={saved}
          input={input}
          onSave={this.saveChange}
          onDelete={this.deleteChange}
        />
      </FormControl>
    )
  }
}

export default withStyles(styles)(SdgFocus)
