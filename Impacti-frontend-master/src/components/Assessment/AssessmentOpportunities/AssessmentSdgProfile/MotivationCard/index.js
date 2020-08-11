import React from 'react'
import Card from '@material-ui/core/Card'
import styles from './styles.module.css'

const MotivationCard = ({ title, description, image }) => (
  <Card className={styles.card}>
    <div className={styles.image}>
      <img
        className={styles.image}
        src={require(`assets/${image}`)}
        alt={image}
      />
    </div>
    <div className={styles.cardType}>
      <p className={styles.title}>{title}</p>
      <p className={styles.description}>{description}</p>
    </div>
  </Card>
)
export default MotivationCard
