import React from 'react'
import PropTypes from 'prop-types'

import { withStyles } from '@material-ui/core/styles'

import Profile from './Profile'
import TopSdgs from './TopSdgs'
import FollowedTags from '../../FollowedTags'

const styles = theme => ({
  leftColumn: {
    margin: theme.spacing.unit * 4,
    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacing.unit * 14,
      marginRight: theme.spacing.unit * 4,
      marginLeft: theme.spacing.unit * 4,
      marginBottom: theme.spacing.unit * 4
    }
  },
  tags: {
    marginTop: theme.spacing.unit * 2
  },
  title: {
    marginBottom: theme.spacing.unit * 2
  },
  searchTags: {
    marginTop: theme.spacing.unit * 10,
    padding: theme.spacing.unit * 2
  },
  tagsCard: {
    padding: theme.spacing.unit * 2
  },
  userTag: {
    background: '#f5f5f5',
    height: 26,
    borderRadius: 13,
    margin: '5px 5px 5px auto',
    '@media (any-pointer: fine)': {
      '& svg': {
        width: '16px',
        paddingBottom: '16px',
        visibility: 'hidden'
      },
      '&:hover': {
        '& svg': {
          visibility: 'visible'
        }
      }
    }
  },
  tag: {
    background: '#f5f5f5',
    height: 26,
    borderRadius: 13,
    margin: '5px 10px 5px auto',
    '& span': {
      color: 'var(--primaryColor)'
    },
    '@media (any-pointer: fine)': {
      '& svg': {
        width: '16px',
        paddingBottom: '16px',
        visibility: 'hidden'
      },
      '&:hover': {
        '& svg': {
          visibility: 'visible'
        }
      }
    }
  }
})

class LeftColumn extends React.Component {
  state = {
    searchTags: [],
    extraTagsHidden: true
  }

  render() {
    const {
      classes,
      member,
      setSearchTags,
      setShowFilter,
      activityView
    } = this.props

    return (
      <div className={classes.leftColumn}>
        {activityView || <Profile member={member} />}
        <TopSdgs sdgs={member.sdgs} />
        <FollowedTags
          activityView={activityView}
          member={member}
          setSearchTags={setSearchTags}
          setShowFilter={setShowFilter}
        />
      </div>
    )
  }
}
LeftColumn.defaultProps = {
  activityView: false
}

LeftColumn.propTypes = {
  activityView: PropTypes.bool,
  member: PropTypes.object.isRequired,
  setSearchTags: PropTypes.func.isRequired,
  setShowFilter: PropTypes.func.isRequired
}
export default withStyles(styles)(LeftColumn)
