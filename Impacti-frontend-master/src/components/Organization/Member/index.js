import React from 'react'
import Paper from '@material-ui/core/Paper'
import { connect } from 'react-redux'
import LoadingSpinner, { SPINNER_TYPES } from 'components/LoadingSpinner'
import NewMemberForm from '../MemberForm/new'
import MemberCard from './MemberCard'
import UpdateMemberForm from '../MemberForm/edit'
import {
  toggleChildrenVisibility,
  addNewMember,
  removeMember,
  toggleEditMemberMode
} from 'actions/organization'

import { childrenVisible, edited, nodeById } from 'selectors/organization'

import styles from './styles.module.css'

export class MemberComponent extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      linesDrawn: false,
      drawLines: false,
      memberActivated: []
    }
  }

  componentDidMount() {
    if (this.props.nestingLevel === 1) {
      this.firstLvlLines()
    } else if (this.props.nestingLevel > 1) {
      this.deeperLines()
    }
  }

  componentDidUpdate() {
    if (this.props.nestingLevel === 1) {
      this.firstLvlLines()
    } else if (this.props.nestingLevel > 1) {
      this.deeperLines()
    }
  }

  deeperLines() {
    setTimeout(() => {
      const parentBottom = document
        .getElementById(`memberCard${this.props.rootId}`)
        .getBoundingClientRect().bottom
      const currentBottom = document
        .getElementById(`verticalConnector${this.props.id}`)
        .getBoundingClientRect().bottom
      const currentTop = document
        .getElementById(`verticalConnector${this.props.id}`)
        .getBoundingClientRect().top

      const node = document.getElementById(this.props.name + this.props.id + 2)
      node.style.top = `-${Math.abs(currentTop - parentBottom) - 70}px`
      node.style.height = `${Math.abs(parentBottom - currentBottom)}px`
    }, 0)
  }

  firstLvlLines() {
    setTimeout(() => {
      const node = document.getElementById(
        `${this.props.name + this.props.id}3`
      )
      const updated = document.getElementById(
        `${this.props.name + this.props.id}2`
      )
      if (node) {
        const center =
          (node.getBoundingClientRect().right +
            node.getBoundingClientRect().left) /
          2
        const screenCenter =
          (document.getElementById(this.props.rootId).getBoundingClientRect()
            .right +
            document.getElementById(this.props.rootId).getBoundingClientRect()
              .left) /
          2
        const boxCenter =
          (document
            .getElementById(this.props.name + this.props.id)
            .getBoundingClientRect().left +
            document
              .getElementById(this.props.name + this.props.id)
              .getBoundingClientRect().right) /
          2

        updated.style.width = `${Math.abs(screenCenter - center)}px`
        updated.style.left =
          boxCenter < screenCenter
            ? '50%'
            : `calc(50% - ${boxCenter - screenCenter}px)`
      }
    }, 0)
  }

  toggleMemberActivation(event, id) {
    if (this.props.rootId !== id) {
      this.setState({
        memberActivated: {
          [id]: !this.state.memberActivated[id]
        }
      })
    }
  }

  render() {
    const { id, name, children, nestingLevel, rootId } = this.props

    return (
      <div className={nestingLevel === 0 ? styles.tree : styles.subTree}>
        {// eslint-disable-next-line
        nestingLevel === 1 ? (
          <div id={name + id} className={styles.connectorsContainer}>
            <div className={styles.nestingLevel1VerticalConnector1} />
            <div
              id={`${name + id}2`}
              className={styles.nestingLevel1VerticalConnector2}
            />
            <div
              id={`${name + id}3`}
              className={styles.nestingLevel1VerticalConnector3}
            />
          </div>
        ) : nestingLevel < 1 ? null : (
          <div id={name + id} className={styles.connectorsContainer}>
            <div
              id={`verticalConnector${id}`}
              className={styles.nestingLevel2VerticalConnector1}
            />
            <div
              className={styles.nestingLevel2VerticalConnector2}
              id={`${name + id}3`}
            />
            <div
              className={styles.nestingLevel2VerticalConnector3}
              id={`${name + id}2`}
            />
          </div>
        )}
        {this.props.edited() ? (
          <Paper id={`memberCard${id}`} className={styles.editedNode}>
            {this.props.id.length <= 24 ? (
              <UpdateMemberForm
                initial={this.props.id}
                isFetchingMember={this.props.isFetchingMember}
              />
            ) : (
              <NewMemberForm
                initial={this.props.id}
                isFetchingMember={this.props.isFetchingMember}
              />
            )}
          </Paper>
        ) : (
          <MemberCard
            id={id}
            name={name}
            nestingLevel={nestingLevel}
            childrenVisible={this.props.childrenVisible()}
            isActivated={this.state.memberActivated[id]}
            toggleEditMemberMode={this.props.toggleEditMemberMode}
            toggleChildrenVisibility={this.props.toggleChildrenVisibility}
            removeMember={this.props.removeMember}
            addNewMember={this.props.addNewMember}
            toggleActivation={e => this.toggleMemberActivation(e, id)}
            hasPathsDisplayed={this.props.hasPathsDisplayed}
            parent={this.props.parent}
          >
            {children}
          </MemberCard>
        )}
        {this.props.childrenVisible() ? ( //eslint-disable-line
          nestingLevel < 1 ? (
            <div>
              <div className={styles.connectorsContainer}>
                <div className={styles.nestingLevel0VerticalConnector1} />
              </div>
              <div className={styles.children}>
                {children
                  ? children.map(e => (
                      <Connected
                        id={e.id}
                        key={e.id}
                        name={e.name}
                        nestingLevel={nestingLevel + 1}
                        rootId={rootId}
                        hasPathsDisplayed={this.props.hasPathsDisplayed}
                      >
                        {e.children}
                      </Connected>
                    ))
                  : null}
              </div>
            </div>
          ) : (
            <div>
              <div className={styles.verticalChildren}>
                {children
                  ? children.map(e => (
                      <Connected
                        id={e.id}
                        key={e.id}
                        name={e.name}
                        nestingLevel={nestingLevel + 1}
                        rootId={id}
                        hasPathsDisplayed={this.props.hasPathsDisplayed}
                      >
                        {e.children}
                      </Connected>
                    ))
                  : null}
              </div>
            </div>
          )
        ) : null}
        {this.props.isRemovingMember && (
          <LoadingSpinner spinnerType={SPINNER_TYPES.ABSOLUTE} />
        )}
      </div>
    )
  }
}

const Connected = connect(
  (state, ownProps) => ({
    childrenVisible: childrenVisible(state, ownProps.id),
    forceUpdate: Math.random(),
    edited: edited(state, ownProps.id),
    parent: nodeById(ownProps.rootId, state)(state.organization),
    selectedMemberId: state.applicationContext.selectedMemberId,
    isRemovingMember: state.organization.isRemovingMember,
    isFetchingMember: state.organization.isFetchingMember
  }),
  dispatch => ({
    toggleChildrenVisibility: toggleChildrenVisibility(dispatch),
    addNewMember: addNewMember(dispatch),
    removeMember: removeMember(dispatch),
    toggleEditMemberMode: toggleEditMemberMode(dispatch)
  }),
  (stateProps, dispatchProps, ownProps) => ({
    ...ownProps,
    ...stateProps,
    ...dispatchProps,
    removeMember: dispatchProps.removeMember(stateProps.selectedMemberId)
  })
)(MemberComponent)

export default Connected
