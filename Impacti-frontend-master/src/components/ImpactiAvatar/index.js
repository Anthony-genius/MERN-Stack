import React from 'react'
import classNames from 'classnames'
import EditIcon from '@material-ui/icons/Edit'
import Avatar from '@material-ui/core/Avatar'
import Dropzone from 'react-dropzone'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'

import { updateUser } from 'actions/session'

import ErrorSnackbar from './ErrorSnackbar'

const maxImageSize = 1000

const styles = {
  container: {
    position: 'relative',
    cursor: 'pointer',
    height: '100%'
  },
  middle: {
    transition: '0.5s ease',
    opacity: '0',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-45%, -45%)'
  },
  avatar: {
    width: '100%',
    height: '100%'
  },
  avatarSquare: {
    width: '100%',
    height: '100%',
    borderRadius: 0
  },
  avatarEmpty: {
    width: '100%',
    height: '100%'
  },
  editAvatarSquare: {
    width: '100%',
    height: '100%',
    borderRadius: 0,
    opacity: 0.6
  },
  editMiddle: {
    opacity: '1',
    position: 'absolute',
    top: '50%',
    left: '50%'
  },
  editButton: {
    color: '#fff',
    background: 'var(--secondaryColor)',
    borderRadius: '50%'
  }
}

class ImpactiAvatar extends React.Component {
  state = { errorText: undefined }

  onDrop = (acceptedFiles, rejectedFiles) => {
    if (acceptedFiles.length === 1) {
      const file = acceptedFiles[0]

      const reader = new FileReader()

      reader.onload = () => {
        const size = Math.round(file.size / 1000)

        if (size < maxImageSize) {
          this.props.updateUser({
            ...this.props.user,
            image: reader.result
          })
        } else {
          this.setState({
            errorText: `File too large! Please try another image below ${maxImageSize}kb.`
          })
        }
      }
      reader.onabort = () => {
        this.setState({ errorText: 'Error uploading file!' })
      }

      reader.onerror = () => {
        this.setState({ errorText: 'Error uploading file!' })
      }

      reader.readAsDataURL(file)
    }
  }

  handleErrorClose = () => {
    this.setState({ errorText: undefined })
  }

  render() {
    const { errorText } = this.state
    const { classes, editMode, square, image } = this.props

    return !editMode ? (
      <React.Fragment>
        {!square ? (
          <Avatar
            className={classes.avatar}
            alt="Avatar"
            src={
              image ||
              (this.props.user &&
                this.props.user.image &&
                this.props.user.image) ||
              require('assets/user-default.png')
            }
          />
        ) : (
          <Avatar
            className={classes.avatarSquare}
            alt="Avatar"
            src={
              image ||
              (this.props.user &&
                this.props.user.image &&
                this.props.user.image) ||
              require('assets/user-default.png')
            }
          />
        )}
      </React.Fragment>
    ) : (
      <div onClick={this.showAvatarSelector} className={classes.container}>
        <ErrorSnackbar
          open={Boolean(errorText)}
          errorText={errorText}
          handleClose={this.handleErrorClose}
        />
        <Dropzone accept="image/*" onDrop={this.onDrop}>
          {({ getRootProps, getInputProps, isDragActive }) => {
            return (
              <div
                {...getRootProps()}
                className={classNames('dropzone', {
                  'dropzone--isActive': isDragActive
                })}
              >
                <input {...getInputProps()} />
                {isDragActive ? (
                  <p>Drop files here...</p>
                ) : (
                  <React.Fragment>
                    <Avatar
                      className={classes.editAvatarSquare}
                      alt="Avatar"
                      src={
                        (this.props.user &&
                          this.props.user.image &&
                          this.props.user.image) ||
                        require('assets/user-default.png')
                      }
                    />
                    <div className={classes.editMiddle}>
                      <EditIcon className={classes.editButton} />
                    </div>
                  </React.Fragment>
                )}
              </div>
            )
          }}
        </Dropzone>
      </div>
    )
  }
}

export default connect(
  state => ({ user: state.auth.user }),
  dispatch => ({
    updateUser: updateUser(dispatch)
  })
)(withStyles(styles)(ImpactiAvatar))
