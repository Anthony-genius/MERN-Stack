import keyMirror from 'key-mirror'
import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { loadOrganization } from 'actions/organization'
import { loadTabsDefinitions } from 'actions/dashboard'
import LoadingSpinner from 'components/LoadingSpinner'

export const DYNAMIC_DATA_KEYS = keyMirror({
  ORGANIZATION: null,
  TAB_DEFINITIONS: null
})

class DynamicDataWrapper extends React.Component {
  constructor(props, ctx) {
    super(props, ctx)
    this.state = {
      hasFinishedFetching: false
    }
  }

  componentDidMount() {
    this.DYNAMIC_DATA = {
      [DYNAMIC_DATA_KEYS.ORGANIZATION]: {
        loadFn: this.props.loadOrganization
      },
      [DYNAMIC_DATA_KEYS.TAB_DEFINITIONS]: {
        loadFn: this.props.loadTabsDefinitions
      }
    }

    this.fetchData()
  }

  fetchData() {
    const onFetchFinish = () => {
      this.setState({ hasFinishedFetching: true })
      this.props.onFetchFinish()
    }

    Promise.all(
      this.props.dataToFetch
        .map(key => this.DYNAMIC_DATA[key].loadFn)
        .map(fn => fn())
    ).then(onFetchFinish, onFetchFinish)
  }

  render() {
    return (
      <div>
        {this.state.hasFinishedFetching ? (
          this.props.children
        ) : (
          <LoadingSpinner />
        )}
      </div>
    )
  }
}

DynamicDataWrapper.defaultProps = {
  onFetchFinish: () => {},
  loadOrganization: () => {},
  loadTabsDefinitions: () => {}
}

DynamicDataWrapper.propTypes = {
  onFetchFinish: PropTypes.func,
  loadOrganization: PropTypes.func,
  loadTabsDefinitions: PropTypes.func
}

export default connect(
  () => ({}),
  dispatch => ({
    loadOrganization: loadOrganization(dispatch),
    loadTabsDefinitions: loadTabsDefinitions(dispatch)
  })
)(DynamicDataWrapper)
