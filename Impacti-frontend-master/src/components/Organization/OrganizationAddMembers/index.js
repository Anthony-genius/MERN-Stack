import React, { Component } from 'react'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'

import styles from './OrganizationAddMembers.module.css'

import IcoArrowRight from 'assets/ico-arrow-right.svg'

class OrganizationAddMembers extends Component {
  constructor(props, context) {
    super(props, context)
    this.goToFirstMemberView = this.goToFirstMemberView.bind(this)
  }
  goToFirstMemberView() {
    this.props.history.push('/organization/add-first-member')
  }
  render() {
    return (
      <div className="paper-container-wrapper">
        <Paper elevation={24} className="paper-container">
          <div>
            <img
              className="paper-container__text--large"
              src={require('assets/launch.svg')}
              alt="launching rocket"
            />
            <div className={styles.membersDesc}>
              Fellow members on your journey can come in all shapes and sizes.
              The Impacti WebApp allows you to target sustainability at any
              level or scope - from a small organization to a multidimensional
              program.
            </div>
            <div>
              <span className={styles.membersLearn} role="link" tabIndex={0}>
                Learn more
              </span>
            </div>
            <Button
              variant="contained"
              onClick={this.goToFirstMemberView}
              color="primary"
            >
              ADD MEMBERS TO YOUR COMMUNITY
              <img src={IcoArrowRight} alt="->" className="arrowRightIco" />
            </Button>
          </div>
        </Paper>
      </div>
    )
  }
}
export default OrganizationAddMembers
