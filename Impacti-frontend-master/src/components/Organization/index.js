import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import OrganizationIntro from './OrganizationIntro/index'
import OrganizationAddMembers from './OrganizationAddMembers/index'
import OrganizationAddFirstMember from './OrganizationAddFirstMember/index'

class Organization extends Component {
  render() {
    return (
      <div>
        <Route exact path="/organization" component={OrganizationIntro} />
        <Route
          path="/organization/add-members"
          component={OrganizationAddMembers}
        />
        <Route
          path="/organization/add-first-member"
          component={OrganizationAddFirstMember}
        />
      </div>
    )
  }
}
export default Organization
