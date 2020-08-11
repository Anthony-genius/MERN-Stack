import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import {
  deleteFollowedTags,
  editFollowedTags,
  saveFollowedTags
} from 'actions/tag'

import { withStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import Button from '@material-ui/core/Button'
import Chip from '@material-ui/core/Chip'
import CardContent from '@material-ui/core/CardContent'
import Card from '@material-ui/core/Card'
import Grid from '@material-ui/core/Grid'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'
import SearchTags from '../SearchTags'

const styles = theme => ({
  closeButton: {
    marginTop: -24,
    marginRight: -24,
    display: 'flex',
    float: 'right'
  },
  filterContainer: {
    marginTop: theme.spacing.unit * 10,
    padding: theme.spacing.unit * 2
  },
  mentionList: { padding: 0 }
})

const followedTagsKey = tags =>
  tags
    .map(t => t.label)
    .sort((a, b) => a < b)
    .join(':')

const Filter = ({
  classes,
  parentClasses,
  closeFilter,
  searchTags,
  toggle,
  filteredPost,
  followedTags,
  saveFollowedTags,
  deleteFollowedTags,
  setSearchTags,
  matchTagAll,
  setMatchTagAll
}) => {
  const [tags, setTags] = React.useState([...searchTags])
  React.useEffect(() => {
    setTags([...searchTags])
  }, [searchTags])

  const mentions = filteredPost.length
  const oneWeekAgo = new Date(new Date() - 604800000)
  const filteredPostLastWeek = filteredPost.filter(
    post => new Date(post.date) > oneWeekAgo
  )
  const mentionsLastWeek = filteredPostLastWeek.length

  const followedTagsKeys = followedTags.map(i => i.tags).map(followedTagsKey)
  const key = followedTagsKey(tags)
  const tagsIndex = followedTagsKeys.indexOf(key)

  return (
    <Card square className={classes.filterContainer}>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <IconButton
              className={classes.closeButton}
              aria-label="close"
              onClick={closeFilter}
            >
              <CloseIcon />
            </IconButton>
            {tags.map((tag, i) => (
              <Chip
                key={i}
                className={classnames({
                  [parentClasses.tag]: !tag.userCreated,
                  [parentClasses.userTag]: tag.userCreated
                })}
                label={`#${tag.label}`}
                onDelete={() => {
                  setTags(tags.filter(({ _id }) => _id !== tag._id))
                  setSearchTags(tags.filter(({ _id }) => _id !== tag._id))
                }}
              />
            ))}
          </Grid>
          <Grid item xs={12}>
            <SearchTags
              parentClasses={parentClasses}
              searchTags={searchTags}
              showTags={false}
              toggle={toggle}
            />
          </Grid>
          <Grid item xs={6}>
            {tags && tags.length > 0 && (
              <List>
                <ListItem className={classes.mentionList}>
                  {mentionsLastWeek} mentions this week
                </ListItem>
                <ListItem className={classes.mentionList}>
                  {mentions} mentions
                </ListItem>
              </List>
            )}
          </Grid>
          <Grid item container xs={6} justify="flex-end" alignItems="flex-end">
            <FormControlLabel
              control={
                <Switch
                  checked={matchTagAll}
                  onChange={e => setMatchTagAll(e.target.checked)}
                  color="primary"
                />
              }
              label="Match All"
            />
            <Button
              aria-label="follow"
              variant="contained"
              size="small"
              color="primary"
              disabled={searchTags.length === 0}
              onClick={() => {
                if (tagsIndex >= 0) {
                  deleteFollowedTags(followedTags[tagsIndex]._id)
                } else {
                  saveFollowedTags(tags)
                }
              }}
            >
              {tagsIndex >= 0 ? 'Unfollow' : 'Follow'}
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}
Filter.propTypes = {
  filteredPost: PropTypes.arrayOf(PropTypes.object),
  parentClasses: PropTypes.object.isRequired,
  searchTags: PropTypes.arrayOf(
    PropTypes.shape({
      userCreated: PropTypes.bool.isRequired,
      label: PropTypes.string.isRequired
    })
  ).isRequired,
  toggle: PropTypes.func.isRequired,
  closeFilter: PropTypes.func.isRequired,
  setSearchTags: PropTypes.func
}

const FilterWithStyles = withStyles(styles)(Filter)

export default connect(
  state => ({
    followedTags: state.tags.followedTags
  }),
  dispatch => ({
    deleteFollowedTags: deleteFollowedTags(dispatch),
    editFollowedTags: editFollowedTags(dispatch),
    saveFollowedTags: saveFollowedTags(dispatch)
  })
)(FilterWithStyles)
