import React from 'react'
import CircularProgressWithBackground from 'components/ImpactiCircularProgress'
import style from './style.module.css'

function convertPercent(number) {
  return Math.round(number * 100)
}

export default props => (
  <div className={style.box}>
    <div className={style.text}>
      <div className={style.destinationName}>{props.box.destination}</div>
      <div>
        <span className={style.progressNumber}>
          {convertPercent(props.box.progress)}
        </span>
        <span className={style.progressPercent}>%</span>
      </div>
    </div>
    <div className={style.graph}>
      <CircularProgressWithBackground
        mode="determinate"
        value={convertPercent(props.box.progress)}
        size={70}
      />
    </div>
  </div>
)
