import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { loadPosts, addPost, updatePost, loadTrendingTags } from 'actions/post'
import { loadComments } from 'actions/comment'
import { loadFavorites } from 'actions/favorite'
import { getMember, getAllMembers } from 'actions/assessmentWizard'
import { filterHomePage } from '../../../actions/dashboard'

import { withStyles } from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Chip from '@material-ui/core/Chip'
import Card from '@material-ui/core/Card'
import Grid from '@material-ui/core/Grid'
import DialogContent from '@material-ui/core/DialogContent'

import AddPostIcon from '@material-ui/icons/BorderColorOutlined'
import PhotoIcon from '@material-ui/icons/AddAPhotoOutlined'
import VideoIcon from '@material-ui/icons/VideoCallOutlined'
import NoteIcon from '@material-ui/icons/NoteAddOutlined'

import NewsCard from './NewsCard'
import LeftColumn from '../LeftColumn'
import AddPost from './AddPost'
import Filter from './Filter'
import FilterPosts from './FilterPosts'
import ActivityLog from './ActivityLog'

const styles = theme => ({
  columnContainer: {
    margin: 0,
    width: '100%'
  },
  createGroupContainer: {
    marginTop: theme.spacing.unit * 2,
    padding: theme.spacing.unit * 2
  },
  leftColumn: {
    margin: theme.spacing.unit * 4,
    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacing.unit * 14,
      marginRight: theme.spacing.unit * 4,
      marginLeft: theme.spacing.unit * 4,
      marginBottom: theme.spacing.unit * 4
    }
  },
  centerColumn: {
    marginTop: theme.spacing.unit * 10,
    margin: theme.spacing.unit * 4
  },
  rightColumn: {
    margin: theme.spacing.unit * 4,
    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacing.unit,
      marginRight: theme.spacing.unit * 4,
      marginLeft: theme.spacing.unit * 4,
      marginBottom: theme.spacing.unit * 14
    }
  },
  centerColumnTitle: { margin: theme.spacing.unit * 2 },
  newsCard: { marginTop: theme.spacing.unit * 2 },
  addPostContainer: {
    marginTop: theme.spacing.unit * 4,
    padding: theme.spacing.unit * 2
  },
  share: {
    '& svg': {
      fill: '#dadada',
      fontSize: '1.4em'
    }
  },
  addPost: {
    fontSize: '0.7em',
    fontWeight: 200,
    textTransform: 'none',
    marginLeft: theme.spacing.unit
  },
  media: {
    display: 'inline-block',
    float: 'right'
  },
  okButton: {
    fontSize: '1.1em',
    height: theme.spacing.unit * 6,
    marginLeft: theme.spacing.unit,
    marginTop: theme.spacing.unit
  },
  title: {
    marginBottom: theme.spacing.unit * 2
  },
  tagsList: {
    marginBottom: theme.spacing.unit * 2
  },
  searchTags: {
    marginTop: theme.spacing.unit * 10,
    padding: theme.spacing.unit * 2
  },
  sortAndSearchTags: {
    display: 'flex'
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
  },
  sortSelect: {
    marginLeft: 'auto'
  },
  favoritesText: {
    marginLeft: theme.spacing.unit
  },
  modal: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  dialogContent: {
    outline: 'none'
  }
})

const defaultSelection = 'All'

const activityFilterOptions = {
  'Your Posts': ({ newsCard, userId }) => {
    return newsCard.owner._id === userId
  },
  'Your Comments': ({ newsCard, userId, comments }) => {
    return comments.find(c => c.post === newsCard._id)
  },
  'Your Likes': ({ newsCard, userId }) => {
    return newsCard.likes.find(like => like.owner === userId && like.liked)
  }
}

class Newsfeed extends React.Component {
  state = {
    selection: defaultSelection,
    selectedPost: null,
    search: '',
    searchTags: [],
    showFilter: false,
    filterBy: '',
    addPostShowing: false,
    extraTagsHidden: true,
    matchTagAll: true
  }

  componentDidMount = () => {
    this.props.loadPosts()
    this.props.loadComments()
    this.props.loadTrendingTags()
    const { auth, getMember, getAllMembers } = this.props
    getAllMembers()
    if (auth.user && auth.user.organization) {
      getMember(auth.user.organization.rootMember)
    }
  }

  componentWillReceiveProps = nextProps => {
    try {
      const searchTags =
        nextProps.location &&
        nextProps.location.state &&
        nextProps.location.state.tags
          ? nextProps.location.state.tags
          : null
      if (searchTags) {
        window.scrollTo(0, 0)
        this.setState({ searchTags })
        this.props.history.replace({ state: { tags: null } })
      }
    } catch {}
  }

  handleSearchChange = event => {
    this.setState({ search: event.target.value })
  }

  openOrCloseAddPost = close => {
    this.setState(state => ({
      addPostShowing: close === false || !state.addPostShowing
    }))
  }

  handleOpenAddPost = () => {
    this.setState({ addPostShowing: true, selectedPost: null })
  }

  handleCloseAddPost = () => {
    this.setState({ addPostShowing: false })
  }

  triggerAddPost = post => {
    if (this.state.selectedPost) {
      this.props.updatePost(post)
    } else {
      this.props.addPost(post)
    }
    this.handleCloseAddPost()
  }

  handleSelectionChange = event => {
    this.setState({ selection: event.target.value })
  }

  toggleShowingExtraTags = () => {
    this.setState(({ extraTagsHidden }) => ({
      extraTagsHidden: !extraTagsHidden
    }))
  }

  getUpdatedTagState(tag) {
    return {
      searchTags: [...new Set([...this.state.searchTags, tag])]
    }
  }
  getDeletedTagState(tag) {
    const nextTags = this.state.searchTags.filter(e => e.label !== tag.label)

    return Object.assign({}, this.state, {
      searchTags: nextTags
    })
  }

  isTagChecked(tag) {
    return this.state.searchTags.some(e => e.label === tag.label)
  }

  toggleTag(tag) {
    if (this.isTagChecked(tag)) {
      this.setState(this.getDeletedTagState(tag))
    } else {
      this.setState(this.getUpdatedTagState(tag))
    }
  }
  getMembersMap = () => {
    const { members } = this.props
    const membersMap =
      members &&
      members.reduce((map, obj) => {
        if (!obj.manager) return map
        const { _id, image, username } = obj.manager
        map[_id] = { image, username }
        return map
      }, {})

    return membersMap
  }

  render() {
    const {
      classes,
      member,
      posts: allPosts,
      comments,
      tags,
      selectedMember,
      filterHomePage
    } = this.props
    const { trendingTags } = tags

    const {
      searchTags,
      selection,
      selectedPost,
      showFilter,
      filterBy,
      addPostShowing,
      matchTagAll
    } = this.state

    const userId =
      selectedMember && selectedMember.manager
        ? selectedMember.manager._id
        : null
    const filteredComments = userId
      ? comments.filter(c => c.author && c.author._id === userId)
      : []

    const newsCardsFilteredByTags =
      (allPosts &&
        allPosts.posts &&
        Array.isArray(allPosts.posts) &&
        allPosts.posts.filter(newsCard => {
          if (searchTags.length > 0) {
            if (matchTagAll) {
              return (
                searchTags.every(searchTag =>
                  newsCard.tags.some(
                    tag =>
                      searchTag.label.toLowerCase() === tag.label.toLowerCase()
                  )
                ) && searchTags.length === newsCard.tags.length
              )
            } else {
              return (
                newsCard.tags.length > 0 &&
                newsCard.tags.some(
                  tag =>
                    tag &&
                    searchTags.some(
                      searchTag =>
                        searchTag.label.toLowerCase() ===
                        tag.label.toLowerCase()
                    )
                )
              )
            }
          }
          return true
        })) ||
      []

    const newsCardsFilteredByTagsAndSelection = newsCardsFilteredByTags.filter(
      newsCard => {
        if (selection && selection !== defaultSelection) {
          return newsCard.category === selection.toLowerCase()
        }
        return true
      }
    )

    const newsCardsFilteredByTagsSelectionAndActivity = newsCardsFilteredByTagsAndSelection.filter(
      newsCard => {
        if (userId && activityFilterOptions[filterBy])
          return activityFilterOptions[filterBy]({
            newsCard,
            userId,
            comments: filteredComments
          })
        else if (userId && !activityFilterOptions[filterBy]) {
          return (
            activityFilterOptions['Your Posts']({
              newsCard,
              userId,
              comments: filteredComments
            }) ||
            activityFilterOptions['Your Likes']({
              newsCard,
              userId,
              comments: filteredComments
            }) ||
            activityFilterOptions['Your Comments']({
              newsCard,
              userId,
              comments: filteredComments
            })
          )
        } else return true
      }
    )
    return (
      <Grid container spacing={3} className={classes.columnContainer}>
        <Grid item xs={12} sm={3}>
          <LeftColumn
            activityView={selectedMember ? true : false}
            member={selectedMember ? selectedMember : member}
            setSearchTags={searchTags => {
              selectedMember
                ? filterHomePage(searchTags)
                : this.setState({ searchTags })
            }}
            setShowFilter={() => {
              this.setState({ showFilter: true, searchTags: [] })
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <div className={classes.centerColumn}>
            {selectedMember && (
              <>
                <ActivityLog selectedMember={selectedMember} />
                <FilterPosts
                  filterBy={filterBy}
                  filterOptions={Object.keys(activityFilterOptions)}
                  setFilterBy={filterBy => this.setState({ filterBy })}
                  selectedMember={selectedMember}
                />
              </>
            )}
            {(searchTags.length > 0 || showFilter) && (
              <Filter
                searchTags={searchTags}
                parentClasses={classes}
                filteredPost={newsCardsFilteredByTagsAndSelection}
                setSearchTags={searchTags => {
                  this.setState({ searchTags })
                }}
                closeFilter={() =>
                  this.setState({ showFilter: false, searchTags: [] })
                }
                toggle={tag => {
                  this.toggleTag(tag)
                }}
                matchTagAll={matchTagAll}
                setMatchTagAll={matchTagAll => {
                  this.setState({ matchTagAll })
                }}
              />
            )}
            {!selectedMember && (
              <Card square className={classes.addPostContainer}>
                <Button
                  aria-label="Add a Post"
                  onClick={this.handleOpenAddPost}
                  className={classes.share}
                >
                  <AddPostIcon />
                  <div className={classes.addPost}>Share an update</div>
                </Button>
                <div className={classes.media}>
                  <Button
                    aria-label="Add a Picture"
                    onClick={this.handleOpenAddPost}
                    className={classes.share}
                  >
                    <PhotoIcon />
                  </Button>
                  <Button
                    aria-label="Add a Video"
                    onClick={this.handleOpenAddPost}
                    className={classes.share}
                  >
                    <VideoIcon />
                  </Button>
                  <Button
                    aria-label="Add a File"
                    onClick={this.handleOpenAddPost}
                    className={classes.share}
                  >
                    <NoteIcon />
                  </Button>
                </div>
              </Card>
            )}
            <Modal
              aria-labelledby="simple-modal-title"
              aria-describedby="simple-modal-description"
              className={classes.modal}
              open={addPostShowing}
              onClose={this.handleCloseAddPost}
            >
              <DialogContent className={classes.dialogContent}>
                <AddPost
                  parentClasses={classes}
                  onSubmit={this.triggerAddPost}
                  post={selectedPost}
                />
              </DialogContent>
            </Modal>
            {newsCardsFilteredByTagsSelectionAndActivity.map((newsCard, i) => (
              <div key={i} className={classes.newsCard}>
                <NewsCard
                  parentClasses={classes}
                  membersMap={this.getMembersMap()}
                  editPost={selectedPost => {
                    this.setState({ addPostShowing: true, selectedPost })
                  }}
                  {...newsCard}
                />
              </div>
            ))}
          </div>
        </Grid>
        <Grid item xs={12} sm={3}>
          <div className={classes.rightColumn}>
            <Card square className={classes.searchTags}>
              <Typography className={classes.title}>
                View Trending Tags
              </Typography>
              <div className={classes.tagsList}>
                {trendingTags.map(tag => (
                  <Chip
                    className={classnames({
                      [classes.tag]: !tag.userCreated,
                      [classes.userTag]: tag.userCreated
                    })}
                    key={tag._id}
                    onClick={() => {
                      selectedMember
                        ? filterHomePage([tag])
                        : this.toggleTag(tag)
                    }}
                    label={`#${tag.label}`}
                  />
                ))}
              </div>
            </Card>
          </div>
        </Grid>
      </Grid>
    )
  }
}

Newsfeed.defaultProps = {
  loadComments: () => {},
  loadPosts: () => {},
  loadFavorites: () => {},
  getMember: () => {},
  filterHomePage: () => {},
  selectedMember: null
}

Newsfeed.propTypes = {
  loadComments: PropTypes.func,
  loadPosts: PropTypes.func,
  loadFavorites: PropTypes.func,
  getMember: PropTypes.func,
  filterHomePage: PropTypes.func,
  selectedMember: PropTypes.object
}

const HomeWithStyles = withStyles(styles)(Newsfeed)

export default connect(
  state => ({
    favorites: state.favorites,
    comments: state.comments.comments,
    posts: state.posts,
    tags: state.tags,
    member: state.assessmentWizard,
    members: state.assessmentWizard.members,
    industries: state.dictionaries.industry,
    sdgs: state.dictionaries.sdg,
    paths: state.dictionaries.path,
    state: state,
    auth: state.auth,
    sectors: state.assessmentWizard.sectors,
    countries: state.assessmentWizard.countries,
    description: state.assessmentWizard.description
  }),
  dispatch => ({
    loadComments: loadComments(dispatch),
    loadPosts: loadPosts(dispatch),
    addPost: addPost(dispatch),
    updatePost: updatePost(dispatch),
    loadTrendingTags: loadTrendingTags(dispatch),
    loadFavorites: loadFavorites(dispatch),
    getAllMembers: getAllMembers(dispatch),
    getMember: getMember(dispatch),
    filterHomePage: filterHomePage(dispatch)
  })
)(HomeWithStyles)
