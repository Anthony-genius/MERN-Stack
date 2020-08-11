import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import { connect } from 'react-redux'
import ImpactiAvatar from '../../../ImpactiAvatar'

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    marginTop: theme.spacing.unit * 10,
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'relative'
  },
  profileImage: {
    height: theme.spacing.unit * 8,
    width: theme.spacing.unit * 8,
    position: 'absolute',
    left: '40%',
    top: -34
  },
  profileName: {
    marginTop: theme.spacing.unit * 4,
    fontWeight: 500,
    textTransform: 'capitalize'
  },
  profileInfoContainer: {
    marginTop: theme.spacing.unit * 1.5,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    flexWrap: 'wrap'
  },
  profileInfo: {
    marginTop: theme.spacing.unit * 1.5,
    marginRight: theme.spacing.unit,
    fontWeight: 300,
    fontSize: '1em',
    textTransform: 'capitalize',
    display: 'contents',
    '& span': {
      display: 'contents'
    }
  }
})

function Profile(props) {
  const { classes, auth, member } = props
  const image = member && member.manager ? member.manager.image : null
  return (
    <div>
      <Paper className={classes.root} square elevation={1}>
        <div className={classes.profileImage}>
          <ImpactiAvatar image={image} />
        </div>
        <Typography variant="h5" className={classes.profileName}>
          {(member && member.manager && member.manager.username) ||
            (auth && auth.user && auth.user.username)}
        </Typography>
        <div className={classes.profileInfoContainer}>
          {member && member.sectors && (
            <Typography variant="h5" className={classes.profileInfo}>
              {member.sectors.map(s => s.name).join(', ')}
            </Typography>
          )}
        </div>
        <div className={classes.profileInfoContainer}>
          {member && member.countries && (
            <Typography variant="h5" className={classes.profileInfo}>
              {member.countries.map(c => c.name).join(', ')}
            </Typography>
          )}
        </div>
      </Paper>
    </div>
  )
}

Profile.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(
  connect(state => ({
    auth: state.auth
  }))(Profile)
)
