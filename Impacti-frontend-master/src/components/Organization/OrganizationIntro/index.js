import React, { Component } from 'react'
import Paper from '@material-ui/core/Paper'

import WithFade from '../../WithFade'
import styles from './OrganizationIntro.module.css'

class OrganizationIntro extends Component {
  constructor(props, context) {
    super(props, context)
    this.goToAddMembers = this.goToMembers.bind(this)
  }

  goToMembers() {
    this.props.history.push('/organization/add-members')
  }

  render() {
    return (
      <WithFade
        action={() => this.goToMembers()}
        className="paper-container-wrapper"
      >
        <Paper
          elevation={24}
          className="paper-container paper-container--clickable"
          onClick={this.goToAddMembers}
        >
          <div className="paper-container__text--big">
            <div className={styles.introMessage}>
              Now let&apos;s get to know who&apos;s on your Impacti journey.
            </div>
          </div>
        </Paper>
      </WithFade>
    )
  }
}
export default OrganizationIntro
