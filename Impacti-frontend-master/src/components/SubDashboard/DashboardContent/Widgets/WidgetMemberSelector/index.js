import React from 'react'
import { FormControl, Select, MenuItem } from '@material-ui/core'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { nodeById } from 'selectors/organization'
import { setLocalContext } from 'actions/widgets/localContext'
import style from './style.module.css'

const getFormattedChildrenList = (node, currentList, indentation) => {
  const formattedList = []

  node.children.forEach(n => {
    formattedList.push(...getFormattedChildrenList(n, [], indentation + 1))
  })

  return [
    ...currentList,
    { id: node.id, name: '-'.repeat(indentation) + node.name },
    ...formattedList
  ]
}

export class WidgetMemberSelectorComponent extends React.Component {
  constructor(props, ctx) {
    super(props, ctx)
    this.state = {
      flattenOrganization: [],
      selectedMember: this.props.organization
    }
  }

  componentDidMount() {
    this.recalculateTree()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.selectedMemberId !== this.props.selectedMemberId) {
      this.recalculateTree()
    }
  }

  recalculateTree() {
    const flattenOrganization = getFormattedChildrenList(
      this.props.organization,
      [],
      0
    )
    this.setState({
      selectedMember: flattenOrganization[0],
      flattenOrganization
    })
  }

  render() {
    return (
      <div className={style.select}>
        <FormControl>
          <Select
            disableUnderline
            value={this.state.selectedMember.id}
            onChange={e => {
              this.setState({
                selectedMember: this.state.flattenOrganization.find(
                  m => m.id === e.target.value
                )
              })
              this.props.setLocalContextMember(e.target.value)
            }}
          >
            {this.state.flattenOrganization.map(item => (
              <MenuItem value={item.id} key={item.id}>
                {item.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    )
  }
}

WidgetMemberSelectorComponent.propTypes = {
  organization: PropTypes.object,
  selectedMemberId: PropTypes.string
}

WidgetMemberSelectorComponent.defaultProps = {
  organization: {},
  selectedMemberId: ''
}

export default connect(
  state => ({
    selectedMemberId: state.applicationContext.selectedMemberId,
    organization: nodeById(state.applicationContext.selectedMemberId, state)(
      state.organization
    )
  }),
  (dispatch, props) => ({
    setLocalContextMember: setLocalContext(dispatch)({
      widgetType: props.widgetType
    })
  })
)(WidgetMemberSelectorComponent)
