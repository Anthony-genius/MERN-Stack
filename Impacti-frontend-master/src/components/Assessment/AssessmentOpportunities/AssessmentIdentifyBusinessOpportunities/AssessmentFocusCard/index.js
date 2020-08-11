/* eslint-disable jsx-a11y/mouse-events-have-key-events */

import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import Tooltip from '@material-ui/core/Tooltip'
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
    borderRadius: 15
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
  },
  mark2: {
    position: 'absolute',
    bottom: 110,
    right: 85,
    width: 360,
    background: '#1F1D1D',
    borderRadius: 0,
    padding: 15,
    fontSize: 12,
    [theme.breakpoints.down('xs')]: {
      right: -150,
      bottom: 150
    }
  },
  arrowBottomRight: {
    position: 'absolute',
    transform: 'rotate(53deg)',
    top: 105,
    left: 278,
    '&::before': {
      content: '""',
      margin: 'auto',
      display: 'block',
      width: 0,
      height: 0,
      borderTop: '10px solid transparent',
      borderBottom: '10px solid transparent',
      borderLeft: '70px solid #1F1D1D'
    },
    [theme.breakpoints.down('xs')]: {
      top: -25,
      left: 0,
      transform: 'rotate(320deg)'
    }
  },
  mark3: {
    position: 'absolute',
    top: 10,
    left: 40,
    width: 250,
    background: '#1F1D1D',
    borderRadius: 0,
    padding: 15,
    fontSize: 12,
    [theme.breakpoints.down('sm')]: {
      left: -280
    },
    [theme.breakpoints.down('xs')]: {
      top: -175,
      left: -200
    }
  },
  arrowTopLeft: {
    position: 'absolute',
    transform: 'rotate(53deg)',
    bottom: 99,
    right: 231,
    '&::before': {
      content: '""',
      margin: 'auto',
      display: 'block',
      width: 0,
      height: 0,
      borderTop: '10px solid transparent',
      borderBottom: '10px solid transparent',
      borderRight: '55px solid #1F1D1D'
    },
    [theme.breakpoints.down('sm')]: {
      transform: 'rotate(131deg)',
      bottom: 97,
      right: -38
    },
    [theme.breakpoints.down('xs')]: {
      bottom: -23,
      right: -1,
      transform: 'rotate(310deg)'
    }
  }
})
class AssessmentFocusCards extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      isFlipped: false
    }
  }

  flipCard = event => {
    event.preventDefault()
    this.setState(prevState => ({ isFlipped: !prevState.isFlipped }))
  }

  render() {
    const { isFlipped } = this.state
    const {
      focus,
      index,
      sdgIndex,
      open,
      toggleFocus,
      isFocusSelected,
      classes
    } = this.props

    return (
      <Card
        className={isFocusSelected ? classes.card : classes.cardNotSelected}
        square={true}
      >
        {window.innerWidth < 420 && window.innerHeight < 824 ? (
          sdgIndex === 0 && index === 0 ? (
            <Tooltip
              open={open}
              classes={{ tooltip: classes.mark3 }}
              title={
                <React.Fragment>
                  Click here to flip the card to read a few sample business
                  actions that can help you better understand this opportunity
                  area.
                  <span className={classes.arrowTopLeft} />
                </React.Fragment>
              }
            >
              <CardHeader
                className={classes.header}
                action={
                  <IconButton type="button" onClick={this.flipCard}>
                    <FlipIcon />
                  </IconButton>
                }
              />
            </Tooltip>
          ) : (
            <CardHeader
              className={classes.header}
              action={
                <IconButton onClick={this.flipCard}>
                  <FlipIcon />
                </IconButton>
              }
            />
          )
        ) : sdgIndex === 0 && index === 1 ? (
          <Tooltip
            open={open}
            classes={{ tooltip: classes.mark3 }}
            title={
              <React.Fragment>
                Click here to flip the card to read a few sample business
                actions that can help you better understand this opportunity
                area.
                <span className={classes.arrowTopLeft} />
              </React.Fragment>
            }
          >
            <CardHeader
              className={classes.header}
              action={
                <IconButton onClick={this.flipCard}>
                  <FlipIcon />
                </IconButton>
              }
            />
          </Tooltip>
        ) : (
          <CardHeader
            className={classes.header}
            action={
              <IconButton onClick={this.flipCard}>
                <FlipIcon />
              </IconButton>
            }
          />
        )}
        <CardActionArea
          onClick={toggleFocus}
          className={
            !isFlipped ? classes.cardActionArea : classes.cardActionAreaflipped
          }
        >
          <CardContent>
            {!isFlipped ? (
              <React.Fragment>
                {sdgIndex === 0 && index === 1 ? (
                  <Tooltip
                    open={open}
                    classes={{ tooltip: classes.mark2 }}
                    title={
                      <React.Fragment>
                        Click the card to select or de-select the opportunity.
                        You can select actions that your business is already
                        taking as well as actions that you’d consider setting as
                        a future target.
                        <span className={classes.arrowBottomRight} />
                      </React.Fragment>
                    }
                  >
                    <Typography
                      gutterBottom
                      variant="inherit"
                      component="h2"
                      className={classes.cardTitle}
                    >
                      {focus.focusArea}
                    </Typography>
                  </Tooltip>
                ) : (
                  <Typography
                    gutterBottom
                    variant="inherit"
                    component="h2"
                    className={classes.cardTitle}
                  >
                    {focus.focusArea}
                  </Typography>
                )}
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
                          src={require(`assets/${e.focusIcon}`)}
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
    )
  }
}

AssessmentFocusCards.propTypes = {
  classes: PropTypes.object.isRequired
}
export default withStyles(styles)(AssessmentFocusCards)
