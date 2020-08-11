import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'

import fetch from 'actions/fetchData'
import API_CONSTANTS from 'constants/api'
import styles from './Hello.module.css'

class Hello extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      username: ''
    }
    fetch(`${API_CONSTANTS.BASE_URL}/api/auth/me`, {
      method: 'PATCH',
      body: JSON.stringify({
        token: this.props.match.params.token
      })
    })
      .then(res => res.json())
      .then(result => {
        this.setState({ email: result.email, username: result.username })
      })
  }

  handleChange(event) {
    event.persist()
    if (!event.target.value) {
      this.setState({ errorText: 'This field is required' })
      this.setState({ emailInvalid: true })
    } else {
      this.setState({ errorText: '' })
      this.setState({ emailInvalid: false })
    }
    this.setState({ [event.target.name]: event.target.value })
  }

  render() {
    return (
      <div className="paper-container-wrapper">
        <Paper
          elevation={24}
          className="paper-container"
          onClick={this.nextStep}
        >
          <div>
            <div className="paper-container__text--big">
              <div className={styles.welcomeMessage}>
                Welcome <strong>{this.state.username}</strong>
                <br />
                You're now a member of Impacti CONNECT, a global community of
                businesses working towards a sustainable future.
              </div>
            </div>
            <Link className="linkColoured" to="/login">
              <Button variant="contained" color="primary">
                Log in
              </Button>
            </Link>
          </div>
        </Paper>
      </div>
    )
  }
}

export default Hello
