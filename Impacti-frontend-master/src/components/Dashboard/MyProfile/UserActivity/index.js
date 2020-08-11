import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import grey from '@material-ui/core/colors/grey'

import Newsfeed from '../../Newsfeed'
import { getAllMembers } from 'actions/assessmentWizard'
import { filterHomePage } from 'actions/dashboard'

const styles = theme => ({
  columns: {
    marginRight: 'auto',
    marginLeft: 'auto',
    padding: theme.spacing.unit * 4,
    maxWidth: '935px',
    backgroundColor: grey[200],
    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacing.unit * 10,
      marginRight: theme.spacing.unit * 4,
      marginLeft: theme.spacing.unit * 4,
      marginBottom: theme.spacing.unit * 10
    }
  },
  content: {
    backgroundColor: grey[200]
  },
  topContent: {
    marginBottom: theme.spacing.unit * 6
  },
  profile: {
    zIndex: 100,
    marginTop: 250,
    display: 'flex'
  },
  countryIcon: {
    width: 80,
    margin: '0 auto'
  },
  peopleIcon: {
    fontSize: 80,
    margin: '0 auto'
  },
  chip: {
    backgroundColor: '#ff6d00',
    borderRadius: 5,
    boxShadow: 'rgba(0, 0, 0, 0.12) 0 1px 6px, rgba(0, 0, 0, 0.12) 0 1px 4px',
    color: 'rgba(255, 255, 255, 0.87)',
    margin: 10,
    padding: 10,
    height: 50,
    fontWeight: 'bold',
    fontSize: 16,
    minWidth: '90%',
    '& span': {
      whiteSpace: 'initial',
      padding: 0
    }
  },
  aboutPaper: {
    padding: theme.spacing.unit * 4,
    borderRadius: 15,
    whiteSpace: 'pre-line',
    '& div': {
      display: 'flex',
      flexDirection: 'column'
    }
  },
  tagsPaper: {
    padding: theme.spacing.unit * 4,
    borderRadius: 15,
    maxHeight: 480,
    overflow: 'auto',
    '& div': {
      maxWidth: '100%'
    }
  },
  editButton: {
    marginTop: theme.spacing.unit * 3,
    marginLeft: 'auto',
    backgroundColor: grey[200],
    color: '#000000 !important',
    textTransform: 'initial',
    boxShadow: 'none',
    '& svg': {
      color: '#fff',
      background: 'var(--secondaryColor)',
      borderRadius: '50%',
      marginLeft: theme.spacing.unit
    },
    '&:hover': {
      backgroundColor: '#fff'
    }
  },
  downloadButton: {
    marginLeft: theme.spacing.unit,
    '& a': {
      color: '#000000 !important'
    },
    '& svg': {
      color: '#fff',
      background: 'var(--secondaryColor)',
      borderRadius: '20%',
      marginLeft: theme.spacing.unit
    }
  },
  activityContainer: {
    marginRight: 'auto',
    marginLeft: 'auto',
    padding: theme.spacing.unit * 4,
    backgroundColor: grey[200],
    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacing.unit * 10,
      marginRight: theme.spacing.unit * 4,
      marginLeft: theme.spacing.unit * 4,
      marginBottom: theme.spacing.unit * 10
    }
  }
})

const UserActivity = ({ classes, auth, members, getAllMembers }) => {
  const [selectedMember, setSelectedMember] = React.useState(null)
  React.useEffect(() => {
    auth &&
      auth.user &&
      auth.user._id &&
      setSelectedMember(
        members.find((organization, i) => {
          if (!organization.manager) return false
          return organization.manager._id === auth.user._id
        })
      )
  }, [members, auth])
  React.useEffect(() => {
    getAllMembers()
  }, [getAllMembers])
  if (!auth || !auth.user || !auth.user._id || members.length === 0)
    return <></>

  return (
    <>
      <>
        <div className={classes.content}>
          <div className={classes.activityContainer}>
            <div className={classes.profile}>
              <Newsfeed selectedMember={selectedMember} />
            </div>
          </div>
        </div>
      </>
    </>
  )
}

UserActivity.defaultProps = {
  getAllMembers: () => {},
  members: []
}

UserActivity.proptTypes = {
  auth: PropTypes.object.isRequired,
  members: PropTypes.array,
  getAllMembers: PropTypes.func
}

const UserActivityWithStyles = withStyles(styles)(UserActivity)

export default connect(
  state => ({
    auth: state.auth,
    members: state.assessmentWizard.members,
    followedTags: state.tags.followedTags
  }),
  dispatch => ({
    filterHomePage: filterHomePage(dispatch),
    getAllMembers: getAllMembers(dispatch)
  })
)(UserActivityWithStyles)
