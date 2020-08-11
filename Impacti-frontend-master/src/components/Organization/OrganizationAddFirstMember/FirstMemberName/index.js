import React, { Component } from 'react'
import { connect } from 'react-redux'
import Paper from '@material-ui/core/Paper'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import Button from '@material-ui/core/Button'
import { rememberUri } from 'actions/session'

const stylesJS = {
  smallButton: {
    height: 35,
    fontSize: 14
  }
}

class FirstMemberName extends Component {
  constructor(props, context) {
    super(props, context)
    this.nextStep = this.nextStep.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.state = {
      name: this.props.organizationData.name
        ? this.props.organizationData.name
        : '',
      errorText: '',
      nameInvalid: true
    }
  }

  componentDidMount() {
    this.props.rememberUri()
  }

  nextStep(e) {
    e.preventDefault()
    const data = this.state.name
    this.props.setName(data)
    this.props.nextStep()
  }

  handleChange(event) {
    event.persist()
    if (!event.target.value.trim()) {
      this.setState({ errorText: 'This field is required' })
      this.setState({ nameInvalid: true })
    } else {
      this.setState({ errorText: '' })
      this.setState({ nameInvalid: false })
    }
    this.setState({ [event.target.name]: event.target.value })
  }
  render() {
    return (
      <div>
        <Paper elevation={4} className="organization-block">
          <form>
            <div className="paper-container__text--large">
              <FormControl fullWidth>
                <InputLabel htmlFor="name">
                  Who&apos;s leading this journey?
                </InputLabel>
                <Input
                  id="name"
                  name="name"
                  value={this.state.name}
                  onChange={this.handleChange}
                  autoFocus
                />
              </FormControl>
              <br />
              <br />
              <Button
                variant="contained"
                type="submit"
                onClick={this.nextStep}
                color="primary"
                disabled={this.state.nameInvalid}
                style={stylesJS.smallButton}
              >
                SAVE
              </Button>
            </div>
            <div />
          </form>
          <div className="members-helper">
            This could be your organization&apos;s name, a location such as
            Headquarters, program identifier, etc
          </div>
        </Paper>
      </div>
    )
  }
}
export default connect(
  () => ({}),
  dispatch => ({
    setName: name => dispatch({ type: 'SET_NAME', name }),
    rememberUri: rememberUri(dispatch)
  })
)(FirstMemberName)
