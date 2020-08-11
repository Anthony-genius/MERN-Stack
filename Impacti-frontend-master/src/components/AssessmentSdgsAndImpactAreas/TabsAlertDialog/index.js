import React from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import ButtonBase from '@material-ui/core/ButtonBase'
import Tooltip from '@material-ui/core/Tooltip'
import PlaceIcon from '@material-ui/icons/Place'
import SettingsIcon from '@material-ui/icons/Settings'
import ArrowIcon from '@material-ui/icons/ArrowUpward'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  tabContainer: {
    margin: '0 45px',
    '&:firstChild': {
      margin: '0 45px 0 0'
    }
  },
  button: {
    height: '110px',
    minWidth: '110px',
    margin: '0 25px',
    [theme.breakpoints.down('sm')]: {
      margin: '0 25px 25px'
    }
  },
  sdgImage: {
    width: 100,
    height: 100
  },
  reasonIcons: {
    margin: '60px auto 25px',
    width: '70%',
    [theme.breakpoints.down('sm')]: {
      margin: '60px auto 35px'
    }
  },
  reasonIcon: {
    position: 'relative',
    fill: 'var(--primaryColor)',
    fontSize: '30px',
    margin: '0 7 %',
    '&:hover': {
      cursor: 'help'
    }
  },
  dialogActionsRoot: {
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column'
    }
  },
  unsaved: {
    color: 'var(--primaryColor)'
  }
}))

export default function TabsAlertDialog(props) {
  const [open, setOpen] = React.useState(false)
  const { input, dirty, sdg, removeInput, value, selected, disabled } = props
  const classes = useStyles()

  function handleClickOpen() {
    setOpen(true)
  }

  function handleClose() {
    setOpen(false)
    dirty()
  }

  async function getClearInput() {
    await removeInput('focus')
    removeInput('challenge')
  }

  function handleChange(event) {
    const { onChange, onClick, value, sdg } = props
    if (onChange) {
      setOpen(false)
      getClearInput()
      onChange(event, value, sdg)
    }
    if (onClick) {
      setOpen(false)
      getClearInput()
      onClick(event, value, sdg)
    }
  }

  function getFilteredInput() {
    const filteredInput = input.filter(i => i === 'challenge' || i === 'focus')
    return filteredInput
  }

  return (
    <>
      <div
        value={value}
        role="tab"
        onClick={handleClickOpen}
        aria-selected={selected}
        disabled={disabled}
        className={classes.tabContainer}
      >
        <ButtonBase key={sdg._id} className={classes.button}>
          <img
            className={classes.sdgImage}
            src={require('assets/E-SDG-goals-icons-full-rgb-' +
              sdg.shortName +
              '.png')}
            alt="SDGs"
          />
        </ButtonBase>
        <div className={classes.reasonIcons}>
          {sdg.reason.includes('country') && (
            <Tooltip title="This SDG is at risk where you operate.">
              <PlaceIcon className={classes.reasonIcon} />
            </Tooltip>
          )}
          {sdg.reason.includes('opportunity') && (
            <Tooltip title="This SDG is at risk due to current practices in your sector.">
              <SettingsIcon className={classes.reasonIcon} />
            </Tooltip>
          )}
          {sdg.reason.includes('leadership') && (
            <Tooltip title="Your sector has the expertise to lead innovations for this SDG.">
              <ArrowIcon className={classes.reasonIcon} />
            </Tooltip>
          )}
        </div>
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {'You have some unsaved changes'}
        </DialogTitle>
        <DialogContent>
          {getFilteredInput() && getFilteredInput().length > 1 ? (
            <>
              <DialogContentText>
                You have edited the following fields :
              </DialogContentText>
              {getFilteredInput().map(i => (
                <DialogContentText key={i} color="primary">
                  {i}
                </DialogContentText>
              ))}
              <DialogContentText>
                but did not save them. If you switch SDGs now your changes will
                be lost
              </DialogContentText>
            </>
          ) : (
            getFilteredInput().map(i => (
              <DialogContentText key={i}>
                You have edited the
                <span className={classes.unsaved}> {i} </span>
                field but did not save it. If you switch SDGs now your changes
                will be lost
              </DialogContentText>
            ))
          )}
        </DialogContent>
        <DialogActions classes={{ root: classes.dialogActionsRoot }}>
          <Button onClick={handleClose} color="primary">
            Back to editing
          </Button>
          <Button onClick={handleChange} variant="contained" color="primary">
            Change SDG anyway
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
