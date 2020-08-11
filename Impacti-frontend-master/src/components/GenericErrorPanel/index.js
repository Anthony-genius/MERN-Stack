import React from 'react'
import style from './style.module.css'

export default ({ message }) => (
  <div className={style.errorBox}>
    {message || 'Some error occurred. Please try again.'}
  </div>
)
