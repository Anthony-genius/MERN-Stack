import React from 'react'
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import EditIcon from '@material-ui/icons/Edit'
import { makeStyles } from '@material-ui/core/styles'
import grey from '@material-ui/core/colors/grey'

const useStyles = makeStyles(theme => ({
  editButton: {
    marginTop: theme.spacing.unit * 3,
    marginLeft: 'auto',
    backgroundColor: grey[200],
    color: '#000000 !important',
    textTransform: 'initial',
    boxShadow: 'none',
    '& svg': {
      color: '#fff',
      background: 'var(--secondaryColor)',
      borderRadius: '50%',
      marginLeft: theme.spacing.unit
    },
    '&:hover': {
      backgroundColor: '#fff'
    }
  },
  unsaved: {
    color: 'var(--primaryColor)'
  },
  dialogActionsRoot: {
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column'
    }
  }
}))

export default function AlertDialog(props) {
  const [open, setOpen] = React.useState(false)
  const { input, dirty } = props
  const classes = useStyles()

  function handleClickOpen() {
    setOpen(true)
  }

  function handleClose() {
    setOpen(false)
    dirty()
  }

  return (
    <>
      <Button
        onClick={handleClickOpen}
        variant="contained"
        color="primary"
        aria-label="Save"
        className={classes.editButton}
      >
        Back to my profile <EditIcon />
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {'You have some unsaved changes'}
        </DialogTitle>
        <DialogContent>
          {input && input.length > 1 ? (
            <>
              <DialogContentText>
                You have edited the following fields :
              </DialogContentText>
              {input.map(i =>
                i === 'description' ? (
                  <DialogContentText key={i} color="primary">
                    about
                  </DialogContentText>
                ) : (
                  <DialogContentText key={i} color="primary">
                    {i}
                  </DialogContentText>
                )
              )}
              <DialogContentText>
                but did not save them. If you exit now your changes will be lost
              </DialogContentText>
            </>
          ) : (
            input.map(i => (
              <DialogContentText key={i}>
                You have edited the
                {i === 'description' ? (
                  <span className={classes.unsaved}> about </span>
                ) : (
                  <span className={classes.unsaved}> {i} </span>
                )}
                field but did not save it. If you exit now your changes will be
                lost
              </DialogContentText>
            ))
          )}
        </DialogContent>
        <DialogActions classes={{ root: classes.dialogActionsRoot }}>
          <Button onClick={handleClose} color="primary">
            Back to edit page
          </Button>
          <Button
            component={Link}
            to="../profile"
            variant="contained"
            color="primary"
          >
            Close anyway
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
