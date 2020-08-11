import React from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { loadFavorites, addFavorite, removeFavorite } from 'actions/favorite'
import { addComment } from 'actions/comment'
import { deletePost, togglePostLike } from 'actions/post'
import Paper from '@material-ui/core/Paper'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Chip from '@material-ui/core/Chip'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import MoreHoriz from '@material-ui/icons/MoreHoriz'
import Typography from '@material-ui/core/Typography'
import ThumbIcon from '@material-ui/icons/ThumbUpOutlined'
import CommentIcon from '@material-ui/icons/ModeComment'
import AddCommentIcon from '@material-ui/icons/AddCommentOutlined'
import Linkify from 'react-linkify'
import moment from 'moment'
import CommentForm from './CommentForm'
import Comment from './Comment'
import UserLikesDialog from './UserLikesDialog'

const styles = theme => ({
  card: {
    position: 'relative',
    overflow: 'visible',
    marginTop: 55
  },
  media: {},
  header: {
    padding: 10
  },
  headerUser: {
    marginLeft: theme.spacing.unit * 6
  },
  avatar: {
    top: -30,
    position: 'absolute',
    width: 58,
    height: 58,
    background: '#f5f5f5f5'
  },
  actions: {
    display: 'flex',
    flexWrap: 'wrap'
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
  dateDiv: {
    alignItems: 'center',
    display: 'flex',
    marginTop: theme.spacing.unit,
    marginRight: theme.spacing.unit * 3,
    marginLeft: theme.spacing.unit * 3
  },
  svg: {
    padding: '3px 12px 0',
    width: '50px',
    height: '24px'
  },
  button: {
    margin: 0,
    cursor: 'pointer',
    border: 'none',
    backgroundColor: 'transparent'
  },
  topMenuContainer: {
    position: 'relative',
    width: 0,
    height: 0
  },
  topMenu: {
    position: 'absolute',
    top: '15px',
    right: '0',
    boxShadow: '0 0 0 1px rgba(0,0,0,.15), 0 6px 9px rgba(0,0,0,.2)',
    height: '100px',
    width: '100px',
    backgroundColor: 'white',
    borderRadius: '2px'
  },
  topMenuButton: {
    backgroundColor: 'transparent',
    border: 'none',
    width: '100%',
    height: '50%',
    cursor: 'pointer',
    textAlign: 'center',
    margin: 0,
    '&:hover': {
      backgroundColor: 'black',
      color: 'white'
    }
  },
  content: {
    padding: '16px 35px 0',
    whiteSpace: 'pre-line',
    '& hr': {
      border: '1px solid #F5F5F5'
    },
    wordBreak: 'break-word'
  },
  footerButton: {
    textTransform: 'capitalize',
    fontWeight: 200,
    '& svg': {
      marginRight: 5,
      fill: '#dadada'
    }
  },
  comment: {
    padding: '5px',
    margin: '5px 0'
  },
  commentTitle: {
    fontWeight: 'bold',
    fontSize: '0.8em'
  },
  coloredFavorite: {
    color: 'orange',
    textTransform: 'capitalize',
    fontWeight: 200,
    '& svg': {
      marginRight: 5
    }
  },
  commentCount: {
    fontWeight: 'bold',
    marginRight: '8px'
  },
  likeCount: {
    minWidth: '0px',
    textTransform: 'none',
    '&.liked': {
      color: 'orange',
      fontWeight: 'bold'
    }
  },
  tagsGroup: {
    marginLeft: 'auto',
    maxWidth: '70%',
    textAlign: 'right',
    [theme.breakpoints.down('sm')]: {
      maxWidth: '100%',
      textAlign: 'left',
      marginLeft: 0
    }
  },
  tags: {
    background: '#f5f5f5',
    height: 26,
    borderRadius: 13,
    textTransform: 'none',
    margin: '5px 10px 5px auto',
    '& span': {
      color: 'var(--primaryColor)'
    }
  },
  link: {
    color: 'blue',
    margin: '15px 0'
  }
})

const componentDecorator = (href, text, key) => (
  <a href={href} key={key} target="_blank" rel="noopener noreferrer">
    {text}
  </a>
)

class NewsCard extends React.Component {
  state = {
    expanded: false,
    showLikes: false,
    owner: undefined,
    post: undefined,
    isHidden: true,
    isMenuActive: false,
    commentFormShowing: false
  }

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }))
  }

  addRemoveFavorites = () => {
    this.props.togglePostLike(this.props._id, this.props.user._id)
  }

  openOrCloseCommentForm = close => {
    this.setState(state => ({
      commentFormShowing: close === false || !state.commentFormShowing
    }))
  }

  onMenuClick = () => {
    this.setState(state => ({ isMenuActive: !state.isMenuActive }))
  }

  onClickDeletePost = () => {
    this.setState({ isMenuActive: false })
    this.props.deletePost(this.props._id)
  }

  onClickEditPost = () => {
    this.setState({ isMenuActive: false })
    const { _id, tags, body } = this.props
    this.props.editPost({ _id, tags, body })
  }

  addComment = comment => {
    this.props.addComment(comment)
    this.openOrCloseCommentForm(true)
  }

  renderTopMenu = () => {
    const { classes } = this.props

    return (
      <div className={classes.topMenuContainer}>
        <div className={classes.topMenu}>
          <button
            onClick={this.onClickEditPost}
            className={classes.topMenuButton}
          >
            EDIT
          </button>
          <button
            onClick={this.onClickDeletePost}
            className={classes.topMenuButton}
          >
            DELETE
          </button>
        </div>
      </div>
    )
  }

  getCommentsIcon(commentCount) {
    if (commentCount === 0) {
      return <AddCommentIcon />
    } else {
      return <CommentIcon />
    }
  }
  getCommentsTitle(commentCount) {
    if (commentCount === 0) {
      return 'No comments yet'
    } else if (commentCount === 1) {
      return '1 comment'
    } else {
      return `${commentCount} comments`
    }
  }

  getLikes = () => {
    const { user, likes } = this.props
    const isLiked =
      likes &&
      user &&
      likes.find(like => like.owner && like.owner === user._id && like.liked)
    return isLiked
  }

  render() {
    const {
      classes,
      membersMap,
      parentClasses,
      tags,
      body,
      date,
      user,
      linkTextToDisplay,
      link,
      _id,
      owner,
      comments,
      hideActions = false,
      likes,
      likeCount
    } = this.props
    const { showLikes } = this.state

    const commentPerPost = comments.comments.filter(c => c.post === _id)
    return (
      <Card square={true} className={classes.card}>
        <CardHeader
          avatar={
            <Avatar
              src={(owner && owner.image) || require('assets/user-default.png')}
              aria-label={owner && owner.username}
              className={classes.avatar}
            />
          }
          action={
            <div className={classes.dateDiv}>
              <Typography component="p">
                {moment(date).format('YYYY') === moment().format('YYYY')
                  ? moment(date).format('MMMM DD')
                  : moment(date).format('MMMM DD YYYY')}
              </Typography>
              {user && user._id === owner._id && (
                <Button onClick={this.onMenuClick} className={classes.button}>
                  <MoreHoriz />
                </Button>
              )}
              {this.state.isMenuActive ? this.renderTopMenu() : null}
            </div>
          }
          title={
            <Typography component="p" className={classes.headerUser}>
              {owner.username}
            </Typography>
          }
          className={classes.header}
        />
        <CardContent className={classes.content}>
          <Linkify componentDecorator={componentDecorator}>
            <Typography component="p">{body}</Typography>
          </Linkify>
          <Typography
            component="a"
            href={link}
            target="_blank"
            className={classes.link}
          >
            {linkTextToDisplay}
          </Typography>
          <hr />
        </CardContent>
        {!hideActions && (
          <CardActions className={classes.actions} disableSpacing>
            <Button
              onClick={this.openOrCloseCommentForm}
              aria-label="Comment"
              size="small"
              className={classes.footerButton}
            >
              {this.getCommentsIcon(commentPerPost.length)}
              <span
                className={classes.commentCount}
                aria-label="number of comments"
              >
                {commentPerPost.length}
              </span>{' '}
              Comments
            </Button>
            <Button
              aria-label="Like count"
              size="small"
              onClick={() =>
                likeCount > 0 && this.setState({ showLikes: true })
              }
              className={classnames({
                [classes.likeCount]: true,
                liked: likeCount > 0
              })}
            >
              {likeCount > 0 && '+'}
              {likeCount}
              {likeCount !== 1 ? ' Likes' : ' Like'}
            </Button>
            <Button
              onClick={this.addRemoveFavorites}
              aria-label="Like"
              size="small"
              className={
                !this.getLikes()
                  ? classes.footerButton
                  : classes.coloredFavorite
              }
            >
              <ThumbIcon />
            </Button>
            <div className={classes.tagsGroup}>
              {tags &&
                tags.length > 0 &&
                tags.map(tag => (
                  <Chip
                    className={classnames({
                      [parentClasses.tag]: !tag.userCreated,
                      [parentClasses.userTag]: tag.userCreated
                    })}
                    key={tag._id}
                    label={`#${tag.label}`}
                  />
                ))}
            </div>
            <UserLikesDialog
              membersMap={membersMap}
              likes={[...likes]}
              selectedValue={null}
              open={showLikes}
              onClose={() => this.setState({ showLikes: false })}
            />
          </CardActions>
        )}
        <div>
          <div>
            {this.state.commentFormShowing && (
              <Paper square={true} className={classes.comment}>
                <div className={classes.commentTitle}>
                  {this.getCommentsTitle(commentPerPost.length)}
                </div>
                {commentPerPost.map(comment => {
                  return <Comment comment={comment} key={comment._id} />
                })}
                <CommentForm
                  addComment={this.addComment}
                  post={this.props._id}
                  author={this.props.owner}
                />
              </Paper>
            )}
          </div>
        </div>
      </Card>
    )
  }
}
NewsCard.defaultProps = {
  editPost: () => {},
  loadFavorites: () => {}
}

NewsCard.propTypes = {
  membersMap: PropTypes.object.isRequired,
  editPost: PropTypes.func,
  loadFavorites: PropTypes.func
}

const NewsCardWithStyles = withStyles(styles)(NewsCard)

export default connect(
  state => ({
    favorites: state.favorites,
    comments: state.comments,
    user: state.auth.user
  }),
  dispatch => ({
    deletePost: deletePost(dispatch),
    togglePostLike: togglePostLike(dispatch),
    addComment: addComment(dispatch),
    addFavorite: addFavorite(dispatch),
    removeFavorite: removeFavorite(dispatch),
    loadFavorites: loadFavorites(dispatch)
  })
)(NewsCardWithStyles)
