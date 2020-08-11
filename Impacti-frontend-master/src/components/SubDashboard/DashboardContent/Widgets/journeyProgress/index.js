import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid'
import style from './style.module.css'
import JourneyProgressBox from './journeyProgressBox'
import { loadProgressJourneyData } from 'actions/widgets/progressOnYourJourney'
import { widgetContextMemberId } from 'selectors/widgets/progressOnYourJourney'
import LoadingSpinner from 'components/LoadingSpinner'
import DASHBOARD_WIDGETS from 'constants/dashboardWidgets'
import Widget from '../Widget'

const BOXES_LIMIT = 4

export class JourneyProgressComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      areBoxesLimited: true
    }
  }
  componentDidMount() {
    this.props.loadProgressJourneyData(
      this.props.selectedMemberId,
      this.props.selectedPathId
    )
  }
  componentDidUpdate(prevProps) {
    if (
      prevProps.selectedMemberId !== this.props.selectedMemberId ||
      prevProps.selectedPathId !== this.props.selectedPathId
    ) {
      this.props.loadProgressJourneyData(
        this.props.selectedMemberId,
        this.props.selectedPathId
      )
    }
  }
  toggleBoxesLimit(event) {
    event.preventDefault()
    this.setState({ areBoxesLimited: !this.state.areBoxesLimited })
  }
  shouldTogglerBeVisible() {
    return this.props.boxesContent.length > BOXES_LIMIT
  }
  render() {
    return (
      <Widget
        widgetTexts={{
          mainTitle: 'Progress on your journey',
          subTitle: 'towards selected destinations',
          buttonText: 'Review your destinations'
        }}
        widgetFeatures={{
          hasMemberSelector: true
        }}
        widgetType={DASHBOARD_WIDGETS.JOURNEY_PROGRESS}
      >
        <Grid container spacing={2} className={style.boxesContainer}>
          {this.props.isLoadingData && <LoadingSpinner />}
          {(this.state.areBoxesLimited
            ? this.props.boxesContent.slice(0, BOXES_LIMIT)
            : this.props.boxesContent
          ).map(box => (
            <Grid item key={box.id} xs={12} md={6} lg={3}>
              <JourneyProgressBox box={box} />
            </Grid>
          ))}
          {this.shouldTogglerBeVisible() && (
            <Grid item xs={12}>
              <div
                style={{ cursor: 'pointer' }}
                onClick={e => this.toggleBoxesLimit(e)}
                className={style.boxLimitToggler}
              >
                {this.state.areBoxesLimited
                  ? `+ ${this.props.boxesContent.length - BOXES_LIMIT} more`
                  : 'less'}
              </div>
            </Grid>
          )}
        </Grid>
      </Widget>
    )
  }
}

JourneyProgressComponent.propTypes = {
  selectedMemberId: PropTypes.string,
  selectedPathId: PropTypes.string,
  loadProgressJourneyData: PropTypes.func,
  isLoadingData: PropTypes.bool,
  boxesContent: PropTypes.array
}

JourneyProgressComponent.defaultProps = {
  selectedMemberId: '',
  selectedPathId: '',
  loadProgressJourneyData: () => {},
  isLoadingData: false,
  boxesContent: []
}

export default connect(
  state => ({
    selectedMemberId: widgetContextMemberId(state),
    selectedPathId: state.applicationContext.selectedPathId,
    isLoadingData: state.widgets.progressOnYourJourney.isLoadingData,
    boxesContent: state.widgets.progressOnYourJourney.boxesContent
  }),
  dispatch => ({
    loadProgressJourneyData: loadProgressJourneyData(dispatch)
  })
)(JourneyProgressComponent)
