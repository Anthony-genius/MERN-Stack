import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import CardActionArea from '@material-ui/core/CardActionArea'
import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import FlipIcon from '@material-ui/icons/Cached'
import PlaceIcon from '@material-ui/icons/Place'
import SettingsIcon from '@material-ui/icons/Settings'
import ArrowIcon from '@material-ui/icons/ArrowUpward'

const style = theme => ({
  paper: {
    padding: 20,
    width: '14vw',
    position: 'fixed'
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    margin: '2em 8px',
    padding: '0',
    position: 'relative',
    width: '238px',
    height: '345px',
    borderRadius: '15px',
    boxSizing: 'content-box',
    border: '2px solid var(--primaryColor)',
    boxShadow:
      '3px 4px 3px 1px rgba(255, 109, 0, 0.2), 0px 3px 1px 0px rgba(255, 109, 0, 0.14), 0px 4px 1px -1px rgba(255, 109, 0, 0.12) !important',
    backgroundColor: '#FFDBC0'
  },
  cardNotSelected: {
    display: 'flex',
    flexDirection: 'column',
    margin: '2em 8px',
    padding: '0',
    position: 'relative',
    width: '238px',
    height: '345px',
    borderRadius: '15px',
    boxSizing: 'content-box'
  },
  header: {
    padding: '0 16px',
    position: 'absolute',
    top: '16px',
    right: '0',
    zIndex: '2',
    '& div': {
      '& button': {
        padding: '4px'
      }
    }
  },
  content: {
    padding: '0 16px 16px'
  },
  actionArea: {
    height: '100%'
  },
  cardTypo: {
    margin: '3em 0 0 0',
    width: '100%',
    '& img': {
      height: '180px',
      margin: '0 auto 45px',
      width: '180px',
      textAlign: 'center',
      display: 'block'
    },
    '& p': {
      fontSize: '11px'
    }
  },
  cardBack: {
    '& p': {
      fontSize: '14px',
      fontWeight: '300',
      lineHeight: '16px'
    },
    '& p:last-child': {
      margin: '0 auto'
    }
  },
  reasonIcons: {
    display: 'flex',
    '& svg': {
      position: 'relative',
      color: 'var(--primaryColor)',
      fontSize: '3em',
      margin: '0 7%',
      '&:hover': {
        cursor: 'help'
      }
    }
  },
  '@media screen and (max-width: 1280px)': {
    card: {
      width: '222px',
      height: '375px'
    },
    cardNotSelected: {
      width: '222px',
      height: '375px'
    }
  },

  '@media screen and (max-width: 1024px)': {
    card: {
      margin: '2em 3px',
      width: '195px',
      height: '345px'
    },
    cardNotSelected: {
      margin: '2em 3px',
      width: '195px',
      height: '345px'
    },
    cardTypo: {
      '& img': {
        height: '160px',
        width: '160px'
      },
      '& cardBack': {
        '& p': {
          fontSize: '13px',
          lineHeight: '14px'
        }
      }
    }
  },
  '@media screen and (max-width: 768px)': {
    paper: {
      width: '70vw'
    },
    card: {
      width: '230px',
      height: '345px'
    },
    cardNotSelected: {
      width: '230px',
      height: '345px'
    }
  },
  mark2: {
    position: 'absolute',
    bottom: 150,
    right: 85,
    width: 360,
    background: '#1F1D1D',
    borderRadius: 0,
    padding: 15,
    fontSize: 12,
    [theme.breakpoints.down('xs')]: {
      bottom: -105,
      left: -150
    }
  },
  arrowBottomRight: {
    position: 'absolute',
    transform: 'rotate(53deg)',
    top: 74,
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
      top: -28,
      left: 234,
      transform: 'rotate(225deg)'
    }
  },
  mark3: {
    position: 'absolute',
    left: 65,
    bottom: 40,
    width: 250,
    background: '#1F1D1D',
    borderRadius: 0,
    padding: 15,
    fontSize: 12,
    [theme.breakpoints.down('sm')]: {
      left: -215
    },
    [theme.breakpoints.down('xs')]: {
      left: -195
    }
  },
  arrowBottomLeft: {
    position: 'absolute',
    transform: 'rotate(325deg)',
    top: 64,
    right: 238,
    '&::before': {
      content: '""',
      margin: 'auto',
      display: 'block',
      width: 0,
      height: 0,
      borderTop: '10px solid transparent',
      borderBottom: '10px solid transparent',
      borderRight: '70px solid #1F1D1D'
    },
    [theme.breakpoints.down('sm')]: {
      top: 70,
      right: 0,
      left: 188,
      transform: 'rotate(300deg)'
    }
  }
})
class SdgCard extends React.Component {
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
    const { sdg, toggleCard, open, index, classes } = this.props

    return (
      <Card
        className={!sdg.selected ? classes.cardNotSelected : classes.card}
        key={sdg.shortName}
        square={true}
      >
        {index === 0 ? (
          <Tooltip
            open={open}
            classes={{ tooltip: classes.mark3 }}
            title={
              <React.Fragment>
                Click here to flip the card to learn more about the SDG.
                <span className={classes.arrowBottomLeft} />
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
        <CardActionArea className={classes.actionArea} onClick={toggleCard}>
          <CardContent className={classes.content}>
            <div className={classes.cardTypo}>
              {!isFlipped ? (
                <React.Fragment>
                  {index === 0 ? (
                    <Tooltip
                      open={open}
                      classes={{ tooltip: classes.mark2 }}
                      title={
                        <React.Fragment>
                          Click the card to select or de-select it as one of
                          your priority SDGs
                          <span className={classes.arrowBottomRight} />
                        </React.Fragment>
                      }
                    >
                      <img
                        src={require('assets/E-SDG-goals-icons-full-rgb-' +
                          sdg.shortName +
                          '.png')}
                        alt={sdg.shortName}
                      />
                    </Tooltip>
                  ) : (
                    <img
                      src={require('assets/E-SDG-goals-icons-full-rgb-' +
                        sdg.shortName +
                        '.png')}
                      alt={sdg.shortName}
                    />
                  )}

                  <div className={classes.reasonIcons}>
                    {!sdg.reason.includes('country') ? (
                      ''
                    ) : (
                      <Tooltip title="This SDG is at risk where you operate.">
                        <PlaceIcon />
                      </Tooltip>
                    )}{' '}
                    {!sdg.reason.includes('opportunity') ? (
                      ''
                    ) : (
                      <Tooltip title="This SDG is at risk due to current practices in your sector.">
                        <SettingsIcon />
                      </Tooltip>
                    )}
                    {!sdg.reason.includes('leadership') ? (
                      ''
                    ) : (
                      <Tooltip title="Your sector has the expertise to lead innovations for this SDG.">
                        <ArrowIcon />
                      </Tooltip>
                    )}
                  </div>
                </React.Fragment>
              ) : (
                <div className={classes.cardBack}>
                  <Typography component="p">
                    <strong>Why? </strong>
                    {sdg.recoWhy}
                  </Typography>
                  <Typography component="p">
                    <strong>What? </strong>
                    {sdg.recoWhat}
                  </Typography>
                </div>
              )}
            </div>
          </CardContent>
        </CardActionArea>
      </Card>
    )
  }
}

SdgCard.propTypes = {
  classes: PropTypes.object.isRequired
}
export default withStyles(style)(SdgCard)
