import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { partition } from 'lodash'

import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import CardContent from '@material-ui/core/CardContent'
import Card from '@material-ui/core/Card'
import Grid from '@material-ui/core/Grid'

const styles = theme => ({
  activityLogContainer: {
    marginTop: theme.spacing.unit * 10,
    padding: theme.spacing.unit * 2
  },
  header: { fontWeight: 200 },
  mentionList: { padding: 0 }
})

const ActivityLog = ({ classes, selectedMember, posts, comments }) => {
  const oneWeekAgo = new Date(new Date() - 604800000)
  const userId = selectedMember.manager._id
  const [userPosts, otherPosts] = partition(
    posts,
    post => post.owner && post.owner._id === userId
  )
  const filteredPostLastWeek = userPosts.filter(
    post => new Date(post.date) > oneWeekAgo
  )
  const filteredCommentsCount = comments
    .filter(c => c.author && c.author._id === userId)
    .filter(c => otherPosts.find(p => p._id === c.post)).length

  const likeCount = userPosts.reduce((acc, curr) => acc + curr.likeCount, 0)

  return (
    <Card square className={classes.filterContainer}>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h5" className={classes.header}>
              {selectedMember.manager.username}'s Activity Log
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <List>
              <ListItem className={classes.mentionList}>
                {filteredPostLastWeek.length} posts uploaded this week
              </ListItem>
              <ListItem className={classes.mentionList}>
                {likeCount} likes recieved
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={6}>
            You made {filteredCommentsCount} comments on other posts
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}
ActivityLog.propTypes = {
  selectedMember: PropTypes.shape({
    manager: PropTypes.shape({
      username: PropTypes.string.isRequired,
      _id: PropTypes.string.isRequired
    }).isRequired
  }).isRequired
}

const ActivityLogWithStyles = withStyles(styles)(ActivityLog)

export default connect(state => ({
  posts: state.posts.posts,
  comments: state.comments.comments,
  followedTags: state.tags.followedTags
}))(ActivityLogWithStyles)
