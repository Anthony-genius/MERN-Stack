import React from 'react'
import { connect } from 'react-redux'
import { loadAll } from 'actions/dictionaries'
import { areDictionariesLoaded } from 'selectors/dictionaries'

class WithDictionaries extends React.Component {
  componentDidMount() {
    this.loadDictionariesConditionally()
  }

  componentDidUpdate() {
    this.loadDictionariesConditionally()
  }

  loadDictionariesConditionally() {
    if (this.props.shouldLoadDictionaries) {
      this.props.loadDictionaries()
    }
  }

  render() {
    return <div>{this.props.children}</div>
  }
}

export default connect(
  state => ({
    shouldLoadDictionaries: !areDictionariesLoaded(state),
    shouldDisplayChildren: areDictionariesLoaded(state)
  }),
  dispatch => ({
    loadDictionaries: loadAll(dispatch)
  })
)(WithDictionaries)
