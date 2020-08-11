import React from 'react'
import Grid from '@material-ui/core/Grid'
import PropTypes from 'prop-types'
import WidgetMemberSelector from '../WidgetMemberSelector'
import style from './style.module.css'
import ImpactiButton, { BUTTON_TYPES } from 'components/ImpactiButton'

const Widget = props => (
  <Grid item xs={12} md={props.widgetFeatures.isHalfWidth ? 6 : 12}>
    <div className={style.componentContainer}>
      <div className={style.widgetTop}>
        {props.widgetIco && (
          <img src={props.widgetIco} alt="" className={style.icon} />
        )}
        <div className={style.title}>
          <h3 className={style.mainTitle}>{props.widgetTexts.mainTitle}</h3>
          <h4 className={style.subTitle}>{props.widgetTexts.subTitle}</h4>
        </div>
        {props.widgetFeatures.hasMemberSelector && (
          <WidgetMemberSelector widgetType={props.widgetType} />
        )}
      </div>
      <div className={props.widgetFeatures.isEmpty ? style.emptyContent : ''}>
        {props.children}
      </div>
      <ImpactiButton
        onClick={() => {}}
        buttonType={BUTTON_TYPES.GO_TO_TAB_DISABLED}
      >
        {props.widgetTexts.buttonText}
      </ImpactiButton>
    </div>
  </Grid>
)

Widget.propTypes = {
  widgetTexts: PropTypes.object,
  children: PropTypes.object,
  widgetType: PropTypes.string,
  widgetFeatures: PropTypes.object,
  widgetIco: PropTypes.string
}

Widget.defaultProps = {
  widgetTexts: {},
  children: {},
  widgetType: '',
  widgetFeatures: {},
  widgetIco: ''
}

export default Widget
