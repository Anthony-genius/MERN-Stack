import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Avatar from '@material-ui/core/Avatar'
import moment from 'moment'

const styles = theme => ({
  comment: {
    padding: '10px',
    margin: '5px 0'
  },
  commentHeader: {
    display: 'flex',
    alignItems: 'center'
  },
  avatar: {
    marginRight: 10
  },
  commentBody: {
    fontSize: '0.8em',
    whiteSpace: 'pre-line'
  }
})
class Comment extends React.Component {
  render() {
    const { classes, comment } = this.props
    return (
      comment && (
        <div>
          <div className={classes.commentHeader}>
            <Avatar
              src={
                (comment.author && comment.author.image) ||
                require('assets/user-default.png')
              }
              aria-label={comment.author && comment.author.username}
              className={classes.avatar}
            />
            <div className={classes.commentBody}>
              {comment.author && comment.author.username}
              {' - '}
              {moment(comment.date).format('M/D/YY h:mma')}
            </div>
          </div>
          <Paper square={true} className={classes.comment}>
            <div className={classes.commentBody}>{comment.text}</div>
          </Paper>
        </div>
      )
    )
  }
}

export default withStyles(styles)(Comment)
