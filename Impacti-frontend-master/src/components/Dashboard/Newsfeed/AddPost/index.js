import React from 'react'
import { connect } from 'react-redux'
import { getMember } from 'actions/assessmentWizard'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import FormControl from '@material-ui/core/FormControl'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import Typography from '@material-ui/core/Typography'
import moment from 'moment'

import SearchTags from '../SearchTags'

const styles = theme => ({
  root: {
    width: theme.spacing.unit * 96,
    margin: '0 auto',
    marginTop: 30,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: 0,
    outline: 'none',
    overflow: 'visible',
    [theme.breakpoints.down('sm')]: {
      width: '100%'
    }
  },
  header: {
    padding: '5px 15px'
  },
  textForm: {
    minHeight: 200
  },
  textInput: {
    '&::before': {
      borderBottom: 0
    }
  },
  chip: {
    backgroundColor: '#ff6d00',
    borderRadius: '5px',
    boxShadow: 'rgba(0, 0, 0, 0.12) 0 1px 6px, rgba(0, 0, 0, 0.12) 0 1px 4px',
    color: 'rgba(255, 255, 255, 0.87)',
    margin: '10px',
    padding: '10px',
    height: 50,
    fontWeight: 'bold',
    fontSize: 16
  },
  closeIcon: {
    backgroundColor: 'transparent',
    order: 1,
    width: 17,
    color: '#fafafa'
  },
  avatar: {
    top: -30,
    left: 15,
    width: 58,
    height: 58,
    background: '#f5f5f5f5'
  },
  headerUser: {
    marginLeft: 45,
    fontWeight: 500
  },
  tag: {
    alignItems: 'center',
    display: 'flex',
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(3),
    marginLeft: theme.spacing(3)
  },
  tagsCard: {
    width: '40%',
    position: 'absolute',
    top: 30,
    right: 10,
    padding: 15,
    [theme.breakpoints.down('sm')]: {
      width: '60%'
    }
  },
  tagsGroup: {
    maxHeight: 160,
    textAlign: 'right',
    overflow: 'scroll',
    flexDirection: 'row',
    marginBottom: 5
  },
  tags: {
    background: '#f5f5f5',
    height: 26,
    borderRadius: 13,
    margin: '5px 10px 5px',
    '& span': {
      color: 'var(--primaryColor)',
      maxWidth: 240,
      contain: 'content'
    }
  },
  input: {
    background: '#f5f5f5',
    borderRadius: 15,
    padding: '0px 10px',
    '&::before': {
      borderBottom: 'none'
    },
    '&::after': {
      borderBottom: 'none'
    }
  },
  addTag: {
    display: 'inline-block'
  },
  selectedTags: {
    display: 'inline-block',
    margin: '0 5px'
  },
  selectedTagsList: {
    color: 'var(--primaryColor)',
    background: '#f5f5f5',
    '& div': {
      background: '#cecece'
    }
  },
  submitButton: {
    margin: 15,
    float: 'right',
    borderRadius: 25,
    textTransform: 'capitalize'
  },
  link: {
    margin: '15px'
  }
})

class AddPost extends React.Component {
  constructor(props, context) {
    super(props, context)
    const { body, postId, selectedTags } = props.post
      ? {
          body: props.post.body,
          postId: props.post._id,
          selectedTags: props.post.tags
        }
      : { body: '', postId: null, selectedTags: [] }
    this.state = {
      postId,
      body,
      bodyError: undefined,
      open: false,
      selectedTags,
      search: ''
    }
  }

  componentDidMount = () => {
    const { auth, getMember } = this.props
    if (
      auth.user &&
      auth.user.organization &&
      auth.user.organization.rootMember
    ) {
      getMember(auth.user.organization.rootMember)
    }
  }

  handleDelete = data => () => {
    this.setState(state => {
      const searchTags = [...state.searchTags]
      const chipToDelete = searchTags.indexOf(data)
      searchTags.splice(chipToDelete, 1)
      return { searchTags }
    })
  }

  isTagChecked(tag) {
    return this.state.selectedTags.some(e => e.label === tag.label)
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value })
  }

  openOrCloseAddTags = close => {
    this.setState(state => ({
      open: close === false || !state.open
    }))
  }

  closeAddTags = event => {
    this.setState({ open: false })
  }

  getUpdatedTagState(tag) {
    return {
      selectedTags: [...new Set([...this.state.selectedTags, tag])]
    }
  }
  getDeletedTagState(tag) {
    const nextTags = this.state.selectedTags.filter(e => e.label !== tag.label)

    return Object.assign({}, this.state, {
      selectedTags: nextTags
    })
  }

  toggleTag(tag) {
    if (this.isTagChecked(tag)) {
      this.setState(this.getDeletedTagState(tag))
    } else {
      this.setState(this.getUpdatedTagState(tag))
    }
  }

  onSubmit = e => {
    e.preventDefault()
    if (!this.state.body) {
      this.setState({ bodyError: 'You must write something.' })
    } else {
      this.props.onSubmit({ ...this.state })
    }
  }

  render() {
    const { classes, parentClasses, date, user, tags, post } = this.props
    const { selectedTags } = this.state
    return (
      <Card square={true} className={classes.root}>
        <CardHeader
          avatar={
            <Avatar
              src={(user && user.image) || require('assets/user-default.png')}
              aria-label={user && user.username}
              className={classes.avatar}
            />
          }
          action={
            <div className={classes.tag}>
              <Typography component="p">
                {moment(date).format('YYYY') === moment().format('YYYY')
                  ? moment(date).format('MMMM DD')
                  : moment(date).format('MMMM DD YYYY')}
              </Typography>
            </div>
          }
          title={
            <Typography component="p" className={classes.headerUser}>
              {user.username}
            </Typography>
          }
          className={classes.header}
        />
        <CardContent className={classes.content}>
          <form onSubmit={this.onSubmit} className={classes.form}>
            <FormControl
              margin="normal"
              required
              fullWidth
              className={classes.textForm}
            >
              <InputLabel htmlFor="body">Write something</InputLabel>
              <Input
                onClick={this.closeAddTags}
                className={classes.textInput}
                value={this.state.body}
                error={this.state.bodyError}
                onChange={this.handleChange('body')}
                multiline={true}
                name="body"
                id="body"
              />
            </FormControl>
            <Grid container>
              <Grid item xs={12} sm={8}>
                <SearchTags
                  parentClasses={parentClasses}
                  createNewTags={true}
                  tags={tags}
                  searchTags={selectedTags}
                  toggle={tag => {
                    this.toggleTag(tag)
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  className={classes.submitButton}
                >
                  {post ? 'Update' : 'Post'}
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    )
  }
}

AddPost.defaultProps = {
  post: null
}

AddPost.propTypes = {
  post: PropTypes.shape({
    _id: PropTypes.string,
    body: PropTypes.string,
    tags: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        userCreated: PropTypes.bool.isRequired
      })
    )
  })
}

const AddPostWithStyles = withStyles(styles)(AddPost)

export default connect(
  state => ({
    user: state.auth.user,
    member: state.member,
    state: state.assessmentWizard,
    auth: state.auth,
    sectors: state.assessmentWizard.sectors,
    countries: state.assessmentWizard.countries
  }),
  dispatch => ({
    getMember: getMember(dispatch)
  })
)(AddPostWithStyles)
