import React from 'react'
import { Paper } from '@material-ui/core'
import styles from './style.module.css'
import API_CONSTANTS from 'constants/api'

const isDestinationHiglighted = (path, destination) =>
  destination.recommendedPaths.some(p => p._id === path._id)

export default props => (
  <div
    className={
      props.isSelected
        ? `${styles.container} ${styles.selectedContainer}`
        : styles.container
    }
  >
    <Paper
      style={{
        background: props.isSelected ? props.path.displayColor : null
      }}
      className={styles.paper}
    >
      <div
        style={{
          background: props.isSelected ? props.path.displayColor : null
        }}
        className={styles.imageContainer}
      >
        <div
          style={{
            background: props.path.displayColor
          }}
          className={styles.imageInnerContainer}
        >
          <img
            src={`${API_CONSTANTS.BASE_URL}${props.path.iconLocation}`}
            className={props.isSelected ? styles.imageSelected : styles.image}
            alt=""
          />
        </div>
      </div>

      <h3 className={styles.header}>{props.path.name}</h3>
      <h4 className={styles.subHeader}>{props.path.shortDescription}</h4>

      {props.isSelected ? (
        <div>
          <p className={styles.description}>{props.path.description}</p>
          <div className={styles.contributionHeaderWrapper}>
            <div className={styles.contributionHeaderSeparator} />
            <h6 className={styles.contributionHeader}>
              CONTRIBUTES TO REACHING
            </h6>
            <div className={styles.contributionHeaderSeparator} />
          </div>

          <ul className={styles.destinationsList}>
            {props.destinations.map(destination => (
              <li
                key={destination._id}
                style={{ color: props.path.displayColor }}
                className={
                  isDestinationHiglighted(props.path, destination)
                    ? `${styles.destinationItem} ${
                        styles.destinationItemHighlighted
                      }`
                    : styles.destinationItem
                }
              >
                {destination.name}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </Paper>
  </div>
)
