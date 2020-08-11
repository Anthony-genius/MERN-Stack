import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import ImpactiAvatar from 'components/ImpactiAvatar'
import ImpactiHero from 'components/ImpactiHero'

import { Link } from 'react-router-dom'
import Typography from '@material-ui/core/Typography'

import Button from '@material-ui/core/Button'
const styles = theme => ({
  hero: {
    width: '100%',
    position: 'absolute',
    maxHeight: 300,
    overflow: 'hidden'
  },
  editHero: {
    visibility: 'hidden'
  },
  profileImageContainer: {
    position: 'absolute',
    bottom: 0,
    display: 'flex',
    justifyContent: 'space-between',
    width: '80vw',
    margin: '0 auto',
    left: 0,
    right: 0
  },
  profileImage: {
    marginRight: theme.spacing(2),
    padding: theme.spacing(1),
    width: 120,
    height: 120,
    zIndex: 1,
    background: '#fff'
  },
  title: {
    position: 'absolute',
    left: 130,
    bottom: 0,
    color: '#fff'
  },
  profileTabButtonContainer: {
    display: 'flex',
    alignItems: 'flex-end',
    padding: theme.spacing(1),
    [theme.breakpoints.down('sm')]: {
      position: 'absolute',
      bottom: 125,
      left: '-10%'
    }
  },
  profileTabButton: {
    borderRadius: 24,
    textTransform: 'none',
    margin: theme.spacing(1)
  }
})

const ProfileHeader = ({ classes, auth, showActivity, editMode }) => (
  <div
    className={classnames({
      [classes.hero]: true,
      [classes.editHero]: editMode
    })}
  >
    <div className={classes.profileImageContainer}>
      <div className={classes.profileImage}>
        <ImpactiAvatar square />
      </div>
      <Typography variant="h3" component="h3" className={classes.title}>
        {(auth && auth.user && auth.user.username + '') || 'My Profile'}
      </Typography>
      <div className={classes.profileTabButtonContainer}>
        <Button
          component={Link}
          to="/dashboard/profile/activity"
          variant="contained"
          color={showActivity ? 'default' : 'primary'}
          className={classes.profileTabButton}
        >
          Activity
        </Button>
        <Button
          component={Link}
          to="/dashboard/profile"
          variant="contained"
          color={showActivity ? 'primary' : 'default'}
          className={classes.profileTabButton}
        >
          Profile
        </Button>
      </div>
    </div>
    <ImpactiHero />
  </div>
)
ProfileHeader.proptTypes = {
  auth: PropTypes.object.isRequired,
  editMode: PropTypes.bool.isRequired,
  showActivity: PropTypes.bool.isRequired
}
export default withStyles(styles)(ProfileHeader)
