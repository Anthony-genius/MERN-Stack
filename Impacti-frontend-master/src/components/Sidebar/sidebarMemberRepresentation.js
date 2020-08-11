import React from 'react'
import PropTypes from 'prop-types'

import styles from './style.module.css'

const isSelected = selectedMember => member =>
  selectedMember ? selectedMember === member.id : false

const objectToClassListString = object =>
  Object.keys(object)
    .map(key => (object[key] ? key : undefined))
    .filter(key => !!key)
    .map(key => styles[key])
    .join(' ')

const MemberRepresentation = props => (
  <li
    className={objectToClassListString({
      hasChildrenVisible:
        props.areChildrenVisible(props.organization.id) &&
        props.organization.children.length > 0,
      treeLi: true,
      treeLiSelected: isSelected(props.selectedMember)(props.organization)
    })}
    key={props.organization.id}
  >
    <span className={styles.listElementActionContainer}>
      <div
        style={{ cursor: 'pointer' }}
        className={styles.childrenVisibilityToggler}
        onClick={e => {
          e.preventDefault()
          props.onToggleVisibility(e, props.organization.id)
        }}
      >
        <span className={styles.icon}>
          {props.areChildrenVisible(props.organization.id) ? '-' : '+'}
        </span>
      </div>
      <div
        style={{ cursor: 'pointer' }}
        className={styles.memberSelector}
        onClick={e => {
          e.preventDefault()
          props.selectMember(props.organization)
        }}
      >
        {props.organization.name}
      </div>
    </span>

    {props.areChildrenVisible(props.organization.id) ? (
      <ul className={styles.treeUl}>
        {props.organization.children.map(child => (
          <MemberRepresentation
            key={child.id}
            organization={child}
            selectedMember={props.selectedMember}
            selectMember={props.selectMember}
            onToggleVisibility={props.onToggleVisibility}
            areChildrenVisible={props.areChildrenVisible}
          />
        ))}
      </ul>
    ) : null}
  </li>
)

MemberRepresentation.propTypes = {
  organization: PropTypes.object,
  selectedMember: PropTypes.string,
  selectMember: PropTypes.func,
  areChildrenVisible: PropTypes.func,
  onToggleVisibility: PropTypes.func
}

MemberRepresentation.defaultProps = {
  organization: {},
  selectedMember: null,
  selectMember: () => {},
  areChildrenVisible: () => false,
  onToggleVisibility: () => {}
}

export default MemberRepresentation
