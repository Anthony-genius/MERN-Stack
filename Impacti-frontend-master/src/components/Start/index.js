import React from 'react'
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button'

import styles from './Start.module.css'

export default function Start() {
  return (
    <div className={styles.startContainer}>
      <div className={styles.innerWrapper}>
        <div>
          <img
            className={styles.startImage}
            src={require('assets/group-3.jpg')}
            alt="ImpactI WebApp"
          />
        </div>
        <Link to="/sign-up">
          <Button
            variant="contained"
            className={styles.signUpButton}
            color="primary"
          >
            Get started
          </Button>
        </Link>
        <div className={styles.leadershipStrip}>
          DEMONSTRATE LEADERSHIP
          <img
            src={require('assets/leadership-fish.svg')}
            className={styles.leadershipStrip__img}
            alt="Fish"
          />
        </div>
      </div>
    </div>
  )
}
