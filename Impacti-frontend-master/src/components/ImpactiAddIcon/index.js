import React from 'react'
import AddIcon from '@material-ui/icons/Add'
import style from './style.module.css'

export default props => (
  <a
    className={style.addIcon}
    onClick={() => this.openPopup()}
    role="link"
    tabIndex="0"
    {...props}
  >
    <AddIcon style={{ width: 30, height: 30 }} />
    {props.children}
  </a>
)
