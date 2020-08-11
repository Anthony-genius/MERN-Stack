import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import CardActionArea from '@material-ui/core/CardActionArea'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import FlipIcon from '@material-ui/icons/Cached'

const style = theme => ({
  paper: {
    padding: 20,
    width: '14vw',
    position: 'fixed',
    [theme.breakpoints.down('xs')]: {
      width: '70vw'
    }
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    margin: '2em 10px',
    padding: '0',
    position: 'relative',
    width: '240px',
    height: '345px',
    borderRadius: '15px',
    border: '2px solid var(--primaryColor)',
    boxShadow:
      '3px 4px 3px 1px rgba(255, 109, 0, 0.2), 0px 3px 1px 0px rgba(255, 109, 0, 0.14), 0px 4px 1px -1px rgba(255, 109, 0, 0.12) !important',
    backgroundColor: '#FFDBC0'
  },
  cardNotSelected: {
    display: 'flex',
    flexDirection: 'column',
    margin: '2em 10px',
    padding: '0',
    position: 'relative',
    width: '240px',
    height: '345px',
    borderRadius: '15px'
  },
  actionArea: {
    height: '100%'
  },
  header: {
    padding: '0 16px',
    position: 'absolute',
    top: '16px',
    right: '0',
    zIndex: '2'
  },
  content: {
    padding: '0 16px 16px'
  },
  cardTypo: {
    margin: '0',
    width: '100%',
    '& img': {
      height: '20vh',
      margin: '0 2%'
    },
    '& h3': {
      fontSize: '20px',
      fontWeight: '600',
      margin: '5px 40px'
    },
    '& p': {
      fontSize: '11px'
    }
  },
  cardBack: {
    '& h3': {
      textAlign: 'left',
      fontSize: '0.875rem',
      fontWeight: '400',
      margin: '0'
    },
    '& p': {
      fontSize: '14px',
      fontWeight: '300',
      lineHeight: '16px',
      textAlign: 'left',
      margin: '12px auto'
    },
    '& p:last-child': {
      margin: '0 auto'
    },
    '& svg': {
      position: 'absolute'
    }
  }
})
class AmbitionCard extends React.Component {
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
    const { classes, ambition, toggleCard, selectedAmbitions } = this.props
    return (
      <Card
        className={
          selectedAmbitions &&
          selectedAmbitions.map(a => a._id).includes(ambition._id)
            ? classes.card
            : classes.cardNotSelected
        }
        key={ambition._id}
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
        <CardActionArea className={classes.actionArea} onClick={toggleCard}>
          <CardContent className={classes.content}>
            <div className={classes.cardTypo}>
              {!isFlipped ? (
                <React.Fragment>
                  <img
                    src={require('assets/' + ambition.iconLocation)}
                    alt={ambition.name}
                  />
                  <Typography component="h3" align="center">
                    {ambition.name}
                  </Typography>
                </React.Fragment>
              ) : (
                <div className={classes.cardBack}>
                  <Typography component="h3">{ambition.name}</Typography>
                  <Typography component="p">
                    {ambition.shortDescription}
                  </Typography>
                  <Typography component="p">{ambition.description}</Typography>
                </div>
              )}
            </div>
          </CardContent>
        </CardActionArea>
      </Card>
    )
  }
}
AmbitionCard.propTypes = {
  classes: PropTypes.object.isRequired
}
export default withStyles(style)(AmbitionCard)
