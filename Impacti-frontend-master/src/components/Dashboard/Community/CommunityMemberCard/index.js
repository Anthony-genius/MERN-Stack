import React from 'react'
import classnames from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import CardActions from '@material-ui/core/CardActions'
import Button from '@material-ui/core/Button'
import Collapse from '@material-ui/core/Collapse'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import UserProfile from './UserProfile'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'

const styles = theme => ({
  card: {
    maxWidth: 345,
    minWidth: 300,
    margin: theme.spacing.unit * 2
  },
  contentContainer: {
    height: '150px',
    fontWeight: 600
  },
  contentContainerExpanded: {
    height: '350px'
  },
  expandGroup: {
    display: 'flex',
    alignItems: 'baseline'
  },
  showIndustries: {
    fontSize: '10px',
    textTransform: 'none'
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: 'rotate(180deg)'
  },
  media: {
    // ⚠️ object-fit is not supported by IE 11.
    objectFit: 'scale-down'
  },
  sdgsContainer: {
    display: 'flex'
  },
  mediaSdg: {
    width: '80px',
    margin: '5px 8px 0 6px'
  }
})

class CommunityMemberCard extends React.Component {
  state = { expanded: false, openDetail: false }

  handleClose = () => {
    this.setState(state => ({ openDetail: !state.openDetail }))
  }

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }))
  }

  render() {
    const { expanded, openDetail } = this.state
    const { classes, company } = this.props
    const countriesList = company.countries.map(c => c.name)
    const sectorsList = company.sectors.map(c => c.name)
    const industriesList = company.industries.map(c => c.name)
    return (
      <Card className={classes.card} key={company.name}>
        <CardContent>
          <CardMedia
            component="img"
            alt={company.manager.username}
            className={classes.media}
            height="150"
            src={
              (company.manager &&
                company.manager.image &&
                company.manager.image) ||
              require('assets/user-default.png')
            }
            title={company.manager.username}
          />
          <CardContent
            className={classnames(classes.contentContainer, {
              [classes.contentContainerExpanded]: expanded
            })}
          >
            <Typography gutterBottom variant="h5" component="h2">
              {company.manager.username}
            </Typography>

            <Typography>{countriesList.join(' - ')}</Typography>

            <div className={classes.expandGroup}>
              <Typography>{sectorsList.join(' - ')}</Typography>

              <Button
                onClick={this.handleExpandClick}
                aria-expanded={expanded}
                aria-label="Show industries"
              >
                <Typography className={classes.showIndustries}>
                  {!expanded ? 'Show industries' : 'Hide industries'}
                </Typography>
                <ExpandMoreIcon
                  className={classnames(classes.expand, {
                    [classes.expandOpen]: expanded
                  })}
                />
              </Button>
            </div>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
              <Typography paragraph>Industries:</Typography>
              <Typography>{industriesList.join(', ')}</Typography>
            </Collapse>
          </CardContent>
          <CardContent className={classes.sdgsContainer}>
            {company.sdgs.slice(0, 3).map(sdg => (
              <CardMedia
                key={sdg._id}
                component="img"
                alt={sdg.shortName}
                className={classes.mediaSdg}
                height="80"
                image={require('assets/E-SDG-goals-icons-full-rgb-' +
                  sdg.shortName +
                  '.png')}
                title={sdg.shortName}
              />
            ))}
          </CardContent>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={this.handleClose}>
            View Detail
          </Button>
          <Dialog
            open={openDetail}
            onClose={this.handleClose}
            aria-labelledby="draggable-dialog-title"
            fullWidth={true}
            maxWidth={'lg'}
          >
            <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
              {company.manager.username}
            </DialogTitle>
            <DialogContent>
              <UserProfile member={company} sdgs={company.sdgs} />
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose} color="primary">
                Ok
              </Button>
            </DialogActions>
          </Dialog>
        </CardActions>
      </Card>
    )
  }
}

export default withStyles(styles)(CommunityMemberCard)
