import React from 'react'
import classNames from 'classnames'
import EditIcon from '@material-ui/icons/Edit'
import Avatar from '@material-ui/core/Avatar'
import Dropzone from 'react-dropzone'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'

import { updateUser } from 'actions/session'

import ErrorSnackbar from './ErrorSnackbar'

const maxImageSize = 300

const styles = {
  container: {
    position: 'relative',
    cursor: 'pointer',
    maxHeight: 300,
    height: '100%',
    zIndex: 1
  },
  middle: {
    transition: '0.5s ease',
    opacity: '1',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-45%, -45%)'
  },
  heroImage: {
    width: '100%',
    height: '100%',
    borderRadius: 0
  },
  editHeroImage: {
    width: '100%',
    height: '100%',
    borderRadius: 0,
    opacity: '0.3'
  },
  editButton: {
    color: '#fff',
    background: 'var(--secondaryColor)',
    borderRadius: '50%'
  }
}

class ImpactiHero extends React.Component {
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
            heroImage: reader.result
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
    const { classes, editMode } = this.props

    return !editMode ? (
      <img
        className={classes.heroImage}
        alt="Company hero"
        src={
          (this.props.user &&
            this.props.user.heroImage &&
            this.props.user.heroImage) ||
          require('assets/beach.jpg')
        }
      />
    ) : (
      <div className={classes.container}>
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
                      onClick={this.showHeroSelector}
                      className={classes.editHeroImage}
                      alt="Company hero"
                      src={
                        (this.props.user &&
                          this.props.user.heroImage &&
                          this.props.user.heroImage) ||
                        require('assets/beach.jpg')
                      }
                    />
                    <div
                      className={classes.middle}
                      onClick={this.showHeroSelector}
                    >
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
)(withStyles(styles)(ImpactiHero))
