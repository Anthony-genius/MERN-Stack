import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import Typography from '@material-ui/core/Typography'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Paper from '@material-ui/core/Paper'
import Avatar from '@material-ui/core/Avatar'
import Dialog from '@material-ui/core/Dialog'
import ImageIcon from '@material-ui/icons/Image'
import { connect } from 'react-redux'
import moment from 'moment'

import { loadPosts } from 'actions/post'
import NewsCard from '../../Newsfeed/NewsCard'

const styles = theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    position: 'relative',
    overflow: 'auto',
    maxHeight: 320
  },
  listSection: {
    backgroundColor: 'inherit'
  },
  ul: {
    backgroundColor: 'inherit',
    padding: 0
  }
})

class PostsList extends React.Component {
  state = {
    openPost: undefined
  }

  componentDidMount = () => {
    this.props.loadPosts()
  }

  openPost = post => {
    this.setState({ openPost: post })
  }

  handleClose = () => {
    this.setState({ openPost: undefined })
  }

  render() {
    const { classes, posts, auth } = this.props
    const { openPost } = this.state

    const userPosts = posts.posts.filter(
      post => post.owner._id === auth.user._id
    )

    return (
      <React.Fragment>
        {userPosts && userPosts.length > 0 && (
          <React.Fragment>
            {openPost && (
              <Dialog
                className={classes.openPostDialog}
                aria-labelledby="current-post"
                aria-describedby="current-post"
                open={Boolean(openPost)}
                onClose={this.handleClose}
              >
                <NewsCard hideActions {...openPost} />
              </Dialog>
            )}
            <Typography gutterBottom variant="h5" component="h5">
              Our Activity
            </Typography>
            <Paper className={classes.root}>
              <List subheader={<li />}>
                {userPosts &&
                  userPosts.map(post => (
                    <li key={post._id} className={classes.listSection}>
                      <ul className={classes.ul}>
                        <ListItem button onClick={() => this.openPost(post)}>
                          <Avatar>
                            <ImageIcon />
                          </Avatar>
                          <ListItemText
                            primary={`${post.title}`}
                            secondary={moment(post.date).format('M/D/YY h:mma')}
                          />
                        </ListItem>
                      </ul>
                    </li>
                  ))}
              </List>
            </Paper>{' '}
          </React.Fragment>
        )}
      </React.Fragment>
    )
  }
}

PostsList.propTypes = {
  classes: PropTypes.object.isRequired
}

export default connect(
  state => ({
    auth: state.auth,
    posts: state.posts
  }),
  dispatch => ({
    loadPosts: loadPosts(dispatch)
  })
)(withStyles(styles)(PostsList))
