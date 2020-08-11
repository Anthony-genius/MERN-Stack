import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import FormControl from '@material-ui/core/FormControl'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import AddIcon from '@material-ui/icons/Add'
import FormChoice from 'components/FormChoice'

const styles = theme => ({
  add: {
    marginLeft: theme.spacing(2),
    display: 'inline-block'
  },
  container: {
    margin: '15px auto 0',
    width: 290
  }
})

class NewFocus extends React.Component {
  state = {
    newAction: false,
    newText: '',
    input: false,
    saved: false
  }

  newActionField = event => {
    event.preventDefault()
    this.setState(prevState => ({ newAction: !prevState.newAction }))
  }

  handleChange = event => {
    this.setState({
      newText: event.target.value,
      input: true
    })
    this.props.addFocusInput()
  }
  saveChange = () => {
    const { onSave, sdg, focus } = this.props
    onSave(sdg._id, focus, this.state.newText)
    this.setState({
      newText: '',
      newAction: false,
      saved: true
    })
    this.props.removeInput('focus')
  }

  closeField = () => {
    this.setState({ newText: '', newAction: false })
    this.props.removeInput('focus')
  }

  render() {
    const { classes } = this.props
    const { newAction, newText, input, saved } = this.state

    return !newAction ? (
      <div className={classes.container}>
        <Button variant="outlined" onClick={this.newActionField}>
          <AddIcon />
        </Button>
        <Typography className={classes.add}>Add a business action</Typography>
      </div>
    ) : (
      <FormControl margin="normal" fullWidth>
        <InputLabel htmlFor="newAction">Fill in your action here</InputLabel>
        <Input
          value={newText}
          onChange={this.handleChange}
          type="string"
          id="newAction"
          name="newAction"
          autoFocus
          multiline
        />
        <FormChoice
          saved={saved && saved}
          input={input}
          onSave={this.saveChange}
          onDelete={this.closeField}
        />
      </FormControl>
    )
  }
}

export default withStyles(styles)(NewFocus)
