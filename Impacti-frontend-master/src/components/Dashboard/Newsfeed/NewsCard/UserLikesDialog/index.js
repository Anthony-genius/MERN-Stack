import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import Typography from '@material-ui/core/Typography'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemText from '@material-ui/core/ListItemText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Dialog from '@material-ui/core/Dialog'
import MuiDialogTitle from '@material-ui/core/DialogTitle'
import { blue } from '@material-ui/core/colors'

const useStyles = makeStyles(theme =>
  createStyles({
    avatar: {
      backgroundColor: blue[100],
      color: blue[600]
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500]
    },
    list: {
      maxHeight: 640,
      width: 320,
      overflow: 'auto'
    }
  })
)

const UserLikesDialog = props => {
  const classes = useStyles()
  const { onClose, open, membersMap, likes } = props

  const handleClose = () => {
    onClose()
  }

  const handleListItemClick = value => {
    console.log(value)
    onClose(value)
  }

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="Users who liked this post"
      open={open}
    >
      <MuiDialogTitle disableTypography>
        <Typography variant="h6">Users who liked this post</Typography>
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      </MuiDialogTitle>
      <List className={classes.list}>
        {likes.map((like, i) => (
          <ListItem
            button
            onClick={() => handleListItemClick(like._id)}
            key={i}
          >
            {membersMap[like.owner] ? (
              <>
                <ListItemAvatar>
                  <Avatar
                    className={classes.avatar}
                    src={
                      membersMap[like.owner].image ||
                      require('assets/user-default.png')
                    }
                  />
                </ListItemAvatar>
                <ListItemText primary={membersMap[like.owner].username} />
              </>
            ) : (
              <ListItemText primary="Loading" />
            )}
          </ListItem>
        ))}
      </List>
    </Dialog>
  )
}

UserLikesDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  membersMap: PropTypes.object.isRequired
}

export default UserLikesDialog
