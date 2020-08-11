/* eslint-disable jsx-a11y/mouse-events-have-key-events */

import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import FlipIcon from '@material-ui/icons/Cached'

const styles = theme => ({
  card: {
    border: '2px solid var(--primaryColor)',
    boxShadow:
      '3px 4px 3px 1px rgba(255, 109, 0, 0.2), 0px 3px 1px 0px rgba(255, 109, 0, 0.14), 0px 4px 1px -1px rgba(255, 109, 0, 0.12) !important',
    display: 'flex',
    flexDirection: 'column',
    margin: '2em 10px',
    padding: 0,
    position: 'relative',
    width: 240,
    height: 205,
    borderRadius: 15,
    [theme.breakpoints.down('sm')]: {
      margin: '2em auto',
      width: 220
    }
  },
  cardNotSelected: {
    display: 'flex',
    flexDirection: 'column',
    margin: '2em 10px',
    padding: 0,
    position: 'relative',
    width: 240,
    height: 205,
    borderRadius: 15
  },
  header: {
    padding: '0 10px',
    position: 'absolute',
    top: 10,
    right: 0,
    zIndex: 2,
    '&button': {
      padding: 4
    }
  },
  cardActionArea: {
    height: '100%'
  },
  cardActionAreaflipped: {
    height: '100%',
    overflow: 'scroll'
  },
  cardTitle: {
    width: '70%',
    margin: '0 auto',
    textAlign: 'left',
    color: '#000',
    fontSize: 20
  },
  focusContainer: {
    display: 'flex',
    marginTop: 10
  },
  focusImage: {
    height: '30px !important',
    width: '30px !important',
    marginRight: 10
  },
  focusText: {
    textAlign: 'left',
    fontWeight: 500
  }
})
class SelectFocuses extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      isFlipped: false,
      openDialog: false
    }
  }

  flipCard = event => {
    event.preventDefault()
    this.setState(prevState => ({ isFlipped: !prevState.isFlipped }))
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

  handleDelete = event => {
    const { toggleFocus } = this.props
    toggleFocus(event)
    this.handleClose()
  }

  checkFocusHasCustomTitle = focus => {
    const check = focus.focusByPath.find(p => p.customTitle === true) && true
    return check
  }
  render() {
    const { isFlipped, openDialog } = this.state
    const { focus, toggleFocus, isFocusSelected, classes } = this.props

    return (
      <>
        <Card
          className={isFocusSelected ? classes.card : classes.cardNotSelected}
          square={true}
        >
          <CardHeader
            className={classes.header}
            action={
              <IconButton onClick={this.flipCard}>
                <FlipIcon />
              </IconButton>
            }
          />
          <CardActionArea
            onClick={
              this.checkFocusHasCustomTitle(focus)
                ? this.toggleDialog
                : toggleFocus
            }
            className={
              !isFlipped
                ? classes.cardActionArea
                : classes.cardActionAreaflipped
            }
          >
            <CardContent>
              {!isFlipped ? (
                <React.Fragment>
                  <Typography
                    gutterBottom
                    variant="inherit"
                    component="h2"
                    className={classes.cardTitle}
                  >
                    {focus.focusArea}
                  </Typography>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  {focus &&
                    focus.focusByPath.map(e => (
                      <div key={e.title} className={classes.focusContainer}>
                        <div className={classes.focusImage}>
                          <img
                            className={classes.focusImage}
                            alt={e.title}
                            src={
                              e.focusIcon
                                ? require(`assets/${e.focusIcon}`)
                                : require(`assets/defaultActionIcon.png`)
                            }
                          />
                        </div>
                        <div className={classes.focusText}>{e.title}</div>
                      </div>
                    ))}
                </React.Fragment>
              )}
            </CardContent>
          </CardActionArea>
        </Card>
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
              you remove this opportunity.
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
      </>
    )
  }
}

SelectFocuses.propTypes = {
  classes: PropTypes.object.isRequired
}
export default withStyles(styles)(SelectFocuses)
