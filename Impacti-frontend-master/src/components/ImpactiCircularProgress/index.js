import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import style from './style.module.css'

export default props => (
  <div className={style.wrapper}>
    <CircularProgress
      value={100}
      mode="determinate"
      size={props.size}
      className={style.clone}
    />
    <CircularProgress
      value={props.value}
      mode="determinate"
      size={props.size}
    />
  </div>
)
