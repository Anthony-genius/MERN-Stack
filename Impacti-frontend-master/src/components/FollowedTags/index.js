import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import TagGroup from './TagGroup'

import { loadFollowedTags } from '../../actions/tag'

import CircularProgress from '@material-ui/core/CircularProgress'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ExpandLessIcon from '@material-ui/icons/ExpandLess'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  tags: {
    marginTop: theme.spacing.unit * 2
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
  },
  loader: {
    display: 'flex',
    justifyContent: 'center'
  },
  progress: {
    margin: theme.spacing.unit * 2
  },
  tagsCard: {
    padding: theme.spacing.unit * 2
  },
  tagGroupList: {
    maxHeight: 640,
    overflow: 'auto',
    paddingBottom: theme.spacing.unit
  },
  title: {
    marginBottom: theme.spacing.unit
  }
})

const FollowedTags = ({
  classes,
  activityView,
  user,
  member,
  followedTags,
  numberToShow,
  setSearchTags,
  setShowFilter,
  loadFollowedTags
}) => {
  const [extraTagsHidden, setExtraTagsHidden] = React.useState(true)
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    try {
      const id = activityView
        ? member.manager.organization._id
        : user.organization._id

      loadFollowedTags(id).then(a => {
        setIsLoading(false)
      })
    } catch (e) {}
  }, [activityView, user, member, loadFollowedTags])
  return (
    <div className={classes.tags}>
      <Card square className={classes.tagsCard}>
        <Typography className={classes.title}>
          Followed tags{' '}
          {!activityView && (
            <Button
              aria-label="follow"
              size="small"
              color="primary"
              onClick={setShowFilter}
            >
              Create New Group
            </Button>
          )}
        </Typography>{' '}
        {isLoading ? (
          <div className={classes.loader}>
            <CircularProgress className={classes.progress} />
          </div>
        ) : (
          <>
            <div className={classes.tagGroupList}>
              {followedTags
                .slice(0, extraTagsHidden ? numberToShow : followedTags.length)
                .map((tagGroup, i) => (
                  <TagGroup
                    enableDelete={true}
                    tagGroup={tagGroup}
                    setSearchTags={setSearchTags}
                    key={i}
                  />
                ))}
            </div>
            {extraTagsHidden && followedTags.length > numberToShow && (
              <p
                onClick={() => setExtraTagsHidden(!extraTagsHidden)}
                className={classes.expand}
              >
                <ExpandMoreIcon />
                See more
              </p>
            )}
            {!extraTagsHidden && followedTags.length > numberToShow && (
              <p
                onClick={() => setExtraTagsHidden(!extraTagsHidden)}
                className={classes.expand}
              >
                <ExpandLessIcon />
                See less
              </p>
            )}
          </>
        )}
      </Card>
    </div>
  )
}

FollowedTags.propTypes = {
  activityView: PropTypes.bool.isRequired,
  member: PropTypes.object.isRequired,
  numberToShow: PropTypes.number,
  setSearchTags: PropTypes.func.isRequired,
  setShowFilter: PropTypes.func.isRequired,
  loadFollowedTags: PropTypes.func.isRequired
}
FollowedTags.defaultProps = {
  numberToShow: 3,
  loadFollowedTags: () => {}
}

const FollowedTagsWithStyles = withStyles(styles)(FollowedTags)

export default connect(
  state => ({
    user: state.auth.user,
    followedTags: state.tags.followedTags
  }),
  dispatch => ({
    loadFollowedTags: loadFollowedTags(dispatch)
  })
)(FollowedTagsWithStyles)
