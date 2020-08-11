import keyMirror from 'key-mirror'
import JourneyProgress from 'components/Dashboard/DashboardContent/Widgets/journeyProgress'
import LatestJourneyReports from 'components/Dashboard/DashboardContent/Widgets/latestJourneyReports'
import LatestAchievements from 'components/Dashboard/DashboardContent/Widgets/latestAchievements'
import CommitmentTracker from 'components/Dashboard/DashboardContent/Widgets/commitmentTracker'

export const DASHBOARD_WIDGETS = keyMirror({
  JOURNEY_PROGRESS: null,
  LATEST_JOURNEY_REPORTS: null,
  LATEST_ACHIEVEMENTS: null,
  COMMITMENT_TRACKER: null
})

export const DASHBOARD_WIDGETS_COMPONENTS = {
  JOURNEY_PROGRESS: JourneyProgress,
  LATEST_JOURNEY_REPORTS: LatestJourneyReports,
  LATEST_ACHIEVEMENTS: LatestAchievements,
  COMMITMENT_TRACKER: CommitmentTracker
}

export default DASHBOARD_WIDGETS
