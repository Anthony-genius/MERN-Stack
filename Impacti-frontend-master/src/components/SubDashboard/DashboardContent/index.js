import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid'
import style from './style.module.css'
import DashboardTabs from './DashboardTabs'
import { selectTab } from 'actions/dashboard'
import { getTabsForCurrentlySelectedPaths } from '../../../selectors/dashboard'
import { DASHBOARD_WIDGETS_COMPONENTS } from './../../../constants/dashboardWidgets'

class DashboardContent extends React.Component {
  componentDidMount() {
    this.preselectTab()
  }

  componentWillUpdate() {
    this.preselectTab()
  }

  preselectTab() {
    if (!this.props.selectedTab.id && this.props.tabs.length > 0) {
      this.props.selectTab(this.props.tabs[0])
    }
  }

  render() {
    return (
      <div className={style.componentWrapper}>
        <div className={style.content}>
          <DashboardTabs
            tabs={this.props.tabs}
            selectedTab={this.props.selectedTab}
            onTabSelect={tab => this.props.selectTab(tab)}
          />
          <Grid container spacing={0} className={style.tabContentWrapper}>
            {this.props.selectedTab.widgets
              .map(name => ({
                Widget: DASHBOARD_WIDGETS_COMPONENTS[name],
                name
              }))
              .map(({ Widget, name }) => (
                <Widget key={name} />
              ))}
          </Grid>
        </div>
      </div>
    )
  }
}

DashboardContent.defaultProps = {
  selectedTab: { widgets: [] },
  tabs: [],
  selectTab: () => {}
}

DashboardContent.propTypes = {
  selectedTab: PropTypes.object,
  tabs: PropTypes.array,
  selectTab: PropTypes.func
}

export default connect(
  state => ({
    selectedTab: state.dashboard.selectedTab,
    tabs: getTabsForCurrentlySelectedPaths(
      state.applicationContext.selectedPathId,
      state.dashboard.tabDefinitions
    )
  }),
  dispatch => ({
    selectTab: selectTab(dispatch)
  })
)(DashboardContent)
