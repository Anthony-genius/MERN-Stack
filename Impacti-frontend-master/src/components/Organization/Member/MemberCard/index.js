import React from 'react'
import { Paper } from '@material-ui/core'
import styles from './styles.module.css'
import PathsWidget from '../../PathsWidget'

export default props => (
  <div id={props.id} className={styles.node}>
    <Paper
      id={`memberCard${props.id}`}
      style={
        props.isActivated
          ? { border: '2px solid #FF6D00', color: '#FF6D00' }
          : {}
      }
      onClick={e => props.toggleActivation(e, props.id)}
      className={props.nestingLevel > 1 ? styles.paperLowLevel : styles.paper}
    >
      {props.name}
      {props.children && props.children.length > 0 && props.nestingLevel > 0 ? (
        <div
          style={{ cursor: 'pointer' }}
          onClick={e => {
            e.preventDefault()
            props.toggleChildrenVisibility(e, props.id)
          }}
        >
          <img
            alt=""
            className={
              props.childrenVisible
                ? styles.hideChildrenButton
                : styles.showChildrenButton
            }
            src={require('assets/diagram-expand.png')}
          />
        </div>
      ) : null}
      {props.isActivated ? (
        <span>
          <span role="button" tabIndex="0">
            <div
              style={{ cursor: 'pointer' }}
              onClick={e => {
                e.preventDefault()
                props.toggleEditMemberMode(e)(props.id)
              }}
            >
              <img
                className={styles.addNewButton}
                src={require('assets/diagram-edit.png')}
                alt="Add"
              />
            </div>
          </span>
          <div
            style={{ cursor: 'pointer' }}
            onClick={event => {
              event.preventDefault()
              props.removeMember(event, props.id, props.parent)
            }}
          >
            <img
              className={styles.removeButton}
              src={require('assets/diagram-remove.png')}
              alt="Remove"
            />
          </div>
        </span>
      ) : (
        <span
          onClick={event => props.addNewMember(event, props.id)}
          role="button"
          tabIndex="0"
        >
          <img
            className={styles.addNewButton}
            src={require('assets/diagram-add.png')}
            alt="Add"
          />
        </span>
      )}
    </Paper>
    {props.hasPathsDisplayed ? (
      <PathsWidget className={styles.memberCardElement} id={props.id} />
    ) : null}
  </div>
)
