import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import FormControl from '@material-ui/core/FormControl'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

const styles = theme => ({
  commentFormFields: {
    minWidth: '100%',
    marginBottom: '15px'
  },
  commentFormInput: {
    marginBottom: '10px'
  }
})
class CommentForm extends React.Component {
  state = {
    text: '',
    author: undefined,
    post: undefined,
    commentError: undefined
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value })
  }
  onSubmit = event => {
    event.preventDefault()
    const author = this.props.author
    const post = this.props.post
    if (!this.state.text) {
      this.setState({ commentError: 'You must enter a comment.' })
    } else {
      this.props.addComment({ ...this.state, author, post })
    }
  }
  render() {
    const { classes } = this.props
    return (
      <form onSubmit={this.onSubmit}>
        <FormControl className={classes.commentFormFields}>
          <TextField
            name="text"
            id="text"
            label="Your comment"
            multiline
            rows="4"
            defaultValue="Comment"
            className={classes.commentFormInput}
            margin="normal"
            variant="outlined"
            error={this.state.commenthError}
            value={this.state.text}
            onChange={this.handleChange('text')}
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="small"
            id="comment-reveal"
          >
            Post Comment
          </Button>
        </FormControl>
      </form>
    )
  }
}

export default withStyles(styles)(CommentForm)
