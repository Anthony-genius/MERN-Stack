import React from 'react'
import PropTypes from 'prop-types'

import { withStyles } from '@material-ui/core/styles'

import FormControl from '@material-ui/core/FormControl'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import ExpandIcon from '@material-ui/icons/ExpandMore'
import Input from '@material-ui/core/Input'

const styles = theme => ({
  columns: {
    margin: theme.spacing.unit * 2
  },
  filterContainer: {
    display: 'flex',
    alignItems: 'baseline',
    margin: theme.spacing.unit * 2,
    marginLeft: theme.spacing.unit * 1
  },
  formControl: {
    marginLeft: theme.spacing.unit * 1,
    minWidth: 100
  },
  showAllButton: {
    fontSize: '0.875em',
    textTransform: 'none',
    textDecoration: 'underline'
  }
})

const FilterPosts = ({ filterOptions, setFilterBy, filterBy, classes }) => {
  return (
    <div className={classes.filterContainer}>
      <Button
        onClick={() => {
          setFilterBy('')
        }}
        className={classes.showAllButton}
      >
        Show all
      </Button>
      <Typography>Filter by</Typography>
      <FormControl className={classes.formControl}>
        <Select
          value={filterBy}
          onChange={event => {
            setFilterBy(event.target.value)
          }}
          input={<Input />}
          IconComponent={ExpandIcon}
          MenuProps={{
            anchorOrigin: {
              vertical: 'bottom',
              horizontal: 'left'
            },
            transformOrigin: {
              vertical: 'top',
              horizontal: 'left'
            },
            getContentAnchorEl: null
          }}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {filterOptions.map(c => (
            <MenuItem key={c} value={c}>
              {c}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  )
}
FilterPosts.propTypes = {
  filterOptions: PropTypes.arrayOf(PropTypes.string),
  filterBy: PropTypes.string.isRequired,
  setFilterBy: PropTypes.func.isRequired
}

const FilterPostsWithStyles = withStyles(styles)(FilterPosts)
export default FilterPostsWithStyles
