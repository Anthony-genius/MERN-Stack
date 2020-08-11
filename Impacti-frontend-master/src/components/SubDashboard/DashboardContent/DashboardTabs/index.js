import React from 'react'
import PropTypes from 'prop-types'
import style from './style.module.css'

const DashboardTabs = props => (
  <div className={style.tabs}>
    {props.tabs.map(tab => (
      <div
        className={
          props.selectedTab && props.selectedTab.id === tab.id
            ? `${style.tabActive} ${style.tab}`
            : style.tab
        }
        key={tab.id}
      >
        <div
          className={style.tabLink}
          onClick={e => {
            e.preventDefault()
            props.onTabSelect(tab)
          }}
        >
          {tab.name}
        </div>
      </div>
    ))}
  </div>
)

DashboardTabs.propTypes = {
  selectedTab: PropTypes.object,
  onTabSelect: PropTypes.func, //eslint-disable-line
  tabs: PropTypes.array
}

DashboardTabs.defaultProps = {
  selectedTab: undefined,
  onTabSelect: () => {},
  tabs: []
}

export default DashboardTabs
