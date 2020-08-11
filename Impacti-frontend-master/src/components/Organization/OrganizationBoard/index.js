import React, { Component } from 'react'
import { connect } from 'react-redux'
import ImpactiButton, { BUTTON_TYPES } from 'components/ImpactiButton'
import { loadOrganization } from 'actions/organization'
import Member from '../Member'
import { rememberUri } from 'actions/session'
import styles from './styles.module.css'
import WithDynamicData, { DYNAMIC_DATA_KEYS } from '../../WithDynamicData'
import { ROUTES } from 'constants/routes'

class OrganizationBoard extends Component {
  componentWillMount() {
    this.props.load()
  }

  componentDidMount() {
    this.props.rememberUri()
  }

  saveAndProceed() {
    let path = '/paths/define-priorities'

    if (this.props.hasPathsDisplayed) {
      path =
        this.props.lastlySavedUri === ROUTES.DASHBOARD
          ? ROUTES.DASHBOARD
          : '/paths/completion-confirmation'
    }
    this.props.history.push(path)
  }

  render() {
    return (
      <WithDynamicData dataToFetch={[DYNAMIC_DATA_KEYS.ORGANIZATION]}>
        <div className={styles.organizationHeader}>
          {this.props.hasPathsDisplayed
            ? this.props.organization.name
            : 'Add members to your journey'}{' '}
        </div>
        <div
          className={styles.organizationBackground}
          style={{ borderImage: "url('/assets/border.png') 1 round" }}
        >
          <div className={styles.root}>
            <Member
              id={this.props.organization.id}
              name={this.props.organization.name}
              nestingLevel={0}
              rootId={this.props.organization.id}
              edited={this.props.organization.edited}
              hasPathsDisplayed={this.props.hasPathsDisplayed}
            >
              {this.props.organization.children}
            </Member>
          </div>
        </div>
        <div className={styles.organizationFooter}>
          <ImpactiButton
            onClick={() => {
              this.saveAndProceed()
            }}
            buttonType={BUTTON_TYPES.SAVE_AND_PROCEED}
          />
        </div>
      </WithDynamicData>
    )
  }
}

export default connect(
  state => ({
    organization: state.organization,
    lastlySavedUri: state.auth.lastlySavedUri
  }),
  dispatch => ({
    load: loadOrganization(dispatch),
    rememberUri: rememberUri(dispatch)
  })
)(OrganizationBoard)
