import React from 'react'
import Paper from '@material-ui/core/Paper'

import style from './style.module.css'

export default props => {
  const title = 'Contact Us'

  return (
    <div className={style.paperContainer}>
      <Paper className={style.paper}>
        {title && <div className={style.title}>{title}</div>}
        <div>
          Contact Us Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus
          accumsan et viverra justo commodo. Proin sodales pulvinar sic tempor.
          Sociis natoque penatibus et magnis dis parturient montes, nascetur
          ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis
          tellus mollis orci, sed rhoncus pronin sapien nunc accuan eget.
        </div>
      </Paper>
    </div>
  )
}
