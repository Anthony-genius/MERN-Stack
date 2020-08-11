import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import {
  deleteFollowedTags,
  editFollowedTags,
  saveFollowedTags
} from 'actions/tag'

import Button from '@material-ui/core/Button'
import Chip from '@material-ui/core/Chip'
import Card from '@material-ui/core/Card'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'

import RemoveRoundedIcon from '@material-ui/icons/RemoveRounded'
import CardActionArea from '@material-ui/core/CardActionArea'

import DialogTitle from '@material-ui/core/DialogTitle'
import DialogActions from '@material-ui/core/DialogActions'
import Dialog from '@material-ui/core/Dialog'

import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  tagGroup: {
    marginTop: theme.spacing.unit
  },
  actionArea: {
    padding: theme.spacing.unit
  },
  deleteButton: {
    backgroundColor: '#00000063',
    borderRadius: '50%',
    color: '#fff',
    display: 'none',
    width: '24px',
    float: 'right',
    ':hover > &': {
      display: 'flex'
    }
  },
  userTag: {
    background: '#f5f5f5',
    height: 26,
    borderRadius: 13,
    margin: '5px 5px 5px auto'
  },
  tag: {
    background: '#f5f5f5',
    height: 26,
    borderRadius: 13,
    margin: '5px 10px 5px auto',
    '& span': {
      color: 'var(--primaryColor)'
    }
  }
})

const DeleteDialog = ({ onDelete, onClose, open, ...other }) => {
  return (
    <Dialog
      disableBackdropClick
      disableEscapeKeyDown
      maxWidth="xl"
      onClose={onClose}
      aria-labelledby="delete-dialog"
      open={open}
      {...other}
    >
      <ClickAwayListener onClickAway={onClose}>
        <div>
          <DialogTitle id="confirmation-delete-dialog-title">
            Are you sure you want to delete these tags?
          </DialogTitle>
          <DialogActions>
            <Button
              onClick={onClose}
              aria-label="cancel"
              variant="contained"
              size="small"
              color="secondary"
            >
              Cancel
            </Button>
            <Button
              onClick={onDelete}
              aria-label="delete"
              variant="contained"
              size="small"
              color="primary"
            >
              Unfollow
            </Button>
          </DialogActions>
        </div>
      </ClickAwayListener>
    </Dialog>
  )
}

DeleteDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired
}

const TagGroup = ({
  classes,
  enableDelete,
  tagGroup,
  deleteFollowedTags,
  setSearchTags
}) => {
  const [showDeleteDialog, setShowDeleteDialog] = React.useState(false)
  const [tags, setTags] = React.useState([...tagGroup.tags])
  React.useEffect(() => {
    setTags([...tagGroup.tags])
  }, [tagGroup])
  return (
    <>
      <Card className={classes.tagGroup}>
        <div>
          <CardActionArea
            className={classes.actionArea}
            onClick={() => {
              setSearchTags && setSearchTags(tags)
            }}
          >
            {enableDelete && (
              <RemoveRoundedIcon
                className={classes.deleteButton}
                onClick={e => {
                  e.stopPropagation()
                  e.preventDefault()
                  setShowDeleteDialog(true)
                }}
              />
            )}
            {tags.map((tag, i) => (
              <Chip
                className={classnames({
                  [classes.tag]: !tag.userCreated,
                  [classes.userTag]: tag.userCreated
                })}
                key={i}
                label={`#${tag.label}`}
              />
            ))}
          </CardActionArea>
        </div>
      </Card>
      <DeleteDialog
        classes={{
          paper: classes.paper
        }}
        open={showDeleteDialog}
        onClose={() => {
          setShowDeleteDialog(false)
        }}
        onDelete={() => {
          setShowDeleteDialog(false)
          deleteFollowedTags(tagGroup._id)
        }}
      />
    </>
  )
}

TagGroup.propTypes = {
  setSearchTags: PropTypes.func,
  enableDelete: PropTypes.bool,
  tagGroup: PropTypes.shape({
    tags: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired
      }).isRequired
    )
  }).isRequired
}
TagGroup.defaultProps = { enableDelete: false }

const TagGroupWithStyles = withStyles(styles)(TagGroup)

export default connect(
  state => ({}),
  dispatch => ({
    deleteFollowedTags: deleteFollowedTags(dispatch),
    editFollowedTags: editFollowedTags(dispatch),
    saveFollowedTags: saveFollowedTags(dispatch)
  })
)(TagGroupWithStyles)
