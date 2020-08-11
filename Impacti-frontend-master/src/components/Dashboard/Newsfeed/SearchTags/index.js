import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import Downshift from 'downshift'
import { deburr, takeRight, takeRightWhile } from 'lodash'
import { searchForTags } from 'actions/tag'

import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import MenuItem from '@material-ui/core/MenuItem'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Chip from '@material-ui/core/Chip'
import { SizeMe } from 'react-sizeme'

const minInputWidth = 150

const styles = theme => ({
  tagMenuItem: {
    paddingTop: '6px',
    paddingBottom: '6px'
  },
  seeMoreLabel: {
    textTransform: 'none'
  },
  seeMoreDiv: {
    display: 'flex',
    flexDirection: 'row-reverse'
  },
  suggestionList: { maxHeight: 240, overflow: 'auto' }
})

const getSuggestions = (
  value,
  suggestions,
  exclude,
  { showEmpty = false } = {}
) => {
  const inputValue = deburr(value.trim()).toLowerCase()

  const inputLength = inputValue.length
  let count = 0

  return inputLength === 0 && !showEmpty
    ? []
    : suggestions
        .filter(i => !exclude.find(j => i.label === j.label))
        .filter(suggestion => {
          const keep =
            count < 32 && suggestion.label.toLowerCase().includes(inputValue)
          if (keep) {
            count += 1
          }
          return keep
        })
        .sort((i, j) => j.label < i.label)
}

const renderHiddenTags = ({ hiddenTag, handleDelete, parentClasses }) => {
  return (
    <Chip
      key={hiddenTag.label}
      className={classnames({
        [parentClasses.tag]: !hiddenTag.userCreated,
        [parentClasses.userTag]: hiddenTag.userCreated
      })}
      label={`#${hiddenTag.label}`}
      onDelete={handleDelete(hiddenTag)}
    />
  )
}
renderHiddenTags.propTypes = {
  handleDelete: PropTypes.func,
  hiddenTag: PropTypes.string.isRequired,
  parentClasses: PropTypes.object.isRequired
}

const renderSuggestion = suggestionProps => {
  const {
    suggestion,
    index,
    itemProps,
    highlightedIndex,
    classes,
    parentClasses
  } = suggestionProps
  const isHighlighted = highlightedIndex === index
  return (
    <MenuItem
      {...itemProps}
      className={classes.tagMenuItem}
      key={suggestion.label}
      selected={isHighlighted}
      component="div"
    >
      <Chip
        className={classnames({
          [parentClasses.tag]: !suggestion.userCreated,
          [parentClasses.userTag]: suggestion.userCreated
        })}
        label={`#${suggestion.label}`}
      />
    </MenuItem>
  )
}
renderSuggestion.propTypes = {
  suggestion: PropTypes.object.isRequired,
  highlightedIndex: PropTypes.number,
  index: PropTypes.number,
  itemProps: PropTypes.object,
  selectedItem: PropTypes.string,
  classes: PropTypes.object.isRequired,
  parentClasses: PropTypes.object.isRequired
}

const renderSaveTagBtn = props => {
  const {
    suggestion,
    index,
    itemProps,
    highlightedIndex,
    classes,
    parentClasses
  } = props
  const isHighlighted = highlightedIndex === index
  return (
    <MenuItem
      {...itemProps}
      className={classes.tagMenuItem}
      key={`save-${suggestion.label}`}
      selected={isHighlighted}
      component="div"
    >
      Save
      <Chip
        className={parentClasses.userTag}
        label={`#${suggestion.label}`}
      />{' '}
      as a tag
    </MenuItem>
  )
}
renderSaveTagBtn.propTypes = {
  suggestion: PropTypes.object.isRequired,
  highlightedIndex: PropTypes.number,
  index: PropTypes.number,
  itemProps: PropTypes.object,
  selectedItem: PropTypes.string,
  classes: PropTypes.object.isRequired,
  parentClasses: PropTypes.object.isRequired
}

const SearchTags = props => {
  const {
    classes,
    parentClasses,
    tags,
    toggle,
    searchTags,
    createNewTags,
    searchForTags,
    showTags
  } = props
  const [inputValue, setInputValue] = React.useState('')
  const [selectedItem, setSelectedItem] = React.useState([])

  const [showHiddenTags, setShowHiddenTags] = React.useState(false)
  const [inputWidth, setInputWidth] = React.useState(0)

  // A map of tag labels to widths, {'SDG4': 120}
  const [tagWidths, setTagWidths] = React.useState({})

  React.useEffect(() => {
    // If user adds tag from outside update SearchTag component to display it.
    if (searchTags.length !== selectedItem.length) {
      setSelectedItem(searchTags)
    }
    // Close expended list if no items remain
    if (searchTags.length === 0 && showHiddenTags) {
      setShowHiddenTags(false)
    }
  }, [searchTags, selectedItem, showHiddenTags])

  const handleKeyDown = event => {
    if (event.key === 'Enter') {
      event.preventDefault()
      const tag = tags.find(tag => tag.label === inputValue)
      if (tag) handleChange(tag)
      else if (createNewTags && inputValue.length > 2) {
        handleChange({ label: inputValue, userCreated: true })
      }
    }
    if (
      selectedItem.length &&
      !inputValue.length &&
      event.key === 'Backspace'
    ) {
      const item = selectedItem[selectedItem.length - 1]
      toggle(item)
    }
  }

  const handleInputChange = event => {
    const inputValue = event.target.value
    setInputValue(inputValue)
    if (inputValue.length > 0) {
      searchForTags(inputValue)
    }
  }

  const handleChange = item => {
    let newSelectedItem = [...selectedItem]
    if (newSelectedItem.indexOf(item) === -1) {
      newSelectedItem = [...newSelectedItem, item]
    }
    setInputValue('')
    setSelectedItem(newSelectedItem)
    toggle(item)
  }

  const handleDelete = item => () => {
    toggle(item)
  }

  const renderInput = inputProps => {
    const { InputProps, classes, ref, ...other } = inputProps
    return (
      <SizeMe>
        {({ size }) => {
          if (Math.abs(size.width - inputWidth) > 8) {
            setInputWidth(size.width)
          }
          return (
            <TextField
              id="search-tags"
              label="#Tags"
              margin="normal"
              variant="outlined"
              InputProps={{
                inputRef: ref,
                classes: {
                  root: classes.inputRoot,
                  input: classes.inputInput
                },
                ...InputProps
              }}
              {...other}
            />
          )
        }}
      </SizeMe>
    )
  }

  const startAdornment = () => {
    if (!showTags) return <></>
    let totalWidth = 0
    // Number of tags to exclude from view
    let overflowCount = 0
    const allItemsHaveWidth = selectedItem.every(i => tagWidths[i.label])

    const maxWidth = inputWidth - minInputWidth

    if (allItemsHaveWidth && selectedItem.length > 0) {
      const fittingTags = takeRightWhile(selectedItem, i => {
        totalWidth += tagWidths[i.label]
        return totalWidth < maxWidth
      })
      if (fittingTags.length < selectedItem.length) {
        overflowCount = selectedItem.length - fittingTags.length
      }
    }

    let newTagWidths = { ...tagWidths }
    const renderAll = takeRight(selectedItem, selectedItem.length).map(
      (tag, i) => (
        <SizeMe key={tag.label}>
          {({ size }) => {
            if (size.width && newTagWidths[tag.label] !== size.width) {
              newTagWidths = { ...newTagWidths, [tag.label]: size.width }
            }
            if (i + 1 === selectedItem.length) {
              setImmediate(() => {
                setTagWidths({ ...newTagWidths })
              })
            }
            return (
              <Chip
                tabIndex={-1}
                label={`#${tag.label}`}
                className={classnames({
                  [parentClasses.tag]: !tag.userCreated,
                  [parentClasses.userTag]: tag.userCreated
                })}
                onDelete={handleDelete(tag)}
              />
            )
          }}
        </SizeMe>
      )
    )

    const renderFittingTags = takeRight(
      selectedItem,
      selectedItem.length - overflowCount
    ).map((tag, i) => (
      <Chip
        key={tag.label}
        tabIndex={-1}
        label={`#${tag.label}`}
        className={classnames({
          [parentClasses.tag]: !tag.userCreated,
          [parentClasses.userTag]: tag.userCreated
        })}
        onDelete={handleDelete(tag)}
      />
    ))
    return (
      <>
        {overflowCount > 0 && (
          <Chip
            tabIndex={-1}
            label={`+${overflowCount}`}
            className={parentClasses.tag}
            onClick={() => setShowHiddenTags(!showHiddenTags)}
          />
        )}
        {overflowCount > 0 ? renderFittingTags : renderAll}
      </>
    )
  }

  return (
    <Downshift
      id="downshift-search-tags"
      inputValue={inputValue}
      onChange={handleChange}
      selectedItem={selectedItem}
      itemToString={item => item.label}
    >
      {({
        getInputProps,
        getItemProps,
        getLabelProps,
        isOpen,
        inputValue: inputValue2,
        selectedItem: selectedItem2,
        highlightedIndex
      }) => {
        const { onBlur, onChange, onFocus, ...inputProps } = getInputProps({
          onKeyDown: handleKeyDown,
          placeholder: 'Search Tags'
        })

        const suggestions = getSuggestions(inputValue2, tags, selectedItem)

        const renderedSuggestions = suggestions.map((suggestion, index) =>
          renderSuggestion({
            suggestion,
            index,
            itemProps: getItemProps({
              item: suggestion
            }),
            highlightedIndex,
            classes,
            parentClasses,
            selectedItem: selectedItem2
          })
        )
        const tagSuggestions =
          createNewTags &&
          inputValue2.length > 2 &&
          suggestions.every(t => t.label !== inputValue2)
            ? [
                ...renderedSuggestions,
                renderSaveTagBtn({
                  suggestion: { label: inputValue2, userCreated: true },
                  index: suggestions.length,
                  itemProps: getItemProps({
                    item: { label: inputValue2, userCreated: true }
                  }),
                  highlightedIndex,
                  classes,
                  parentClasses,
                  selectedItem: selectedItem2
                })
              ]
            : renderedSuggestions

        return (
          <div className={classes.container}>
            {!showHiddenTags &&
              renderInput({
                fullWidth: true,
                classes,
                label: '#Tags',
                InputLabelProps: getLabelProps(),
                InputProps: {
                  startAdornment: startAdornment(),
                  onBlur,
                  onChange: event => {
                    handleInputChange(event)
                    onChange(event)
                  },
                  onFocus
                },
                inputProps
              })}
            {showHiddenTags && (
              <Paper className={parentClasses.paper} square>
                {selectedItem.map(tag =>
                  renderHiddenTags({
                    parentClasses,
                    hiddenTag: tag,
                    handleDelete
                  })
                )}
                <div className={classes.seeMoreDiv}>
                  {' '}
                  <Button
                    size="small"
                    color="primary"
                    classes={{
                      root: classes.button,
                      label: classes.seeMoreLabel
                    }}
                    onClick={() => setShowHiddenTags(false)}
                  >
                    ^See less
                  </Button>
                </div>
              </Paper>
            )}
            {isOpen && !showHiddenTags && (
              <Paper
                className={classnames(
                  parentClasses.paper,
                  classes.suggestionList
                )}
                square
              >
                {tagSuggestions}
              </Paper>
            )}
          </div>
        )
      }}
    </Downshift>
  )
}
SearchTags.propTypes = {
  classes: PropTypes.object.isRequired,
  searchTags: PropTypes.arrayOf(
    PropTypes.shape({
      userCreated: PropTypes.bool.isRequired,
      label: PropTypes.string.isRequired
    })
  ).isRequired,
  toggle: PropTypes.func.isRequired,
  showTags: PropTypes.bool,
  createNewTags: PropTypes.bool
}
SearchTags.defaultProps = {
  createNewTags: false,
  showTags: true
}

const SearchTagsWithStyles = withStyles(styles)(SearchTags)

export default connect(
  state => {
    const { tags } = state.tags
    return { tags }
  },
  dispatch => ({ searchForTags: searchForTags(dispatch) })
)(SearchTagsWithStyles)
