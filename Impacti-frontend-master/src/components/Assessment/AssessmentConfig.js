import AssessmentIntro from './AssessmentIntro/AssessmentMainIntro'
import AssessmentThreeSteps from './AssessmentIntro/AssessmentThreeSteps'
import AssessmentCountry from './AssessmentBusinessAndGoals/AssessmentCountry'
import AssessmentSector from './AssessmentBusinessAndGoals/AssessmentSector'
import AssessmentSdgRecommendations from './AssessmentSdgRecommendations'
import AssessmentAmbitions from './AssessmentOpportunities/AssessmentAmbitions'
import AssessmentIdentifyBusinessOpportunities from './AssessmentOpportunities/AssessmentIdentifyBusinessOpportunities'
import AssessmentSdgProfile from './AssessmentOpportunities/AssessmentSdgProfile'
export default {
  stages: [
    {
      key: 'Intro',
      steps: [{ key: 'intro', component: AssessmentIntro }]
    },
    {
      key: 'Reasons',
      steps: [{ key: 'reasons', component: AssessmentThreeSteps }]
    },
    {
      key: 'business-and-goals',
      number: '1',
      title: 'Your Business',
      steps: [
        { key: 'country', component: AssessmentCountry },
        { key: 'sector', component: AssessmentSector }
      ]
    },
    {
      key: 'sdg-recommendations',
      number: '2',
      title: 'Sustainability Priorities',
      steps: [{ key: 'sdg-reco', component: AssessmentSdgRecommendations }]
    },
    {
      key: 'business-opportunities',
      number: '3',
      title: 'Impact Opportunities',
      steps: [
        {
          key: 'opportunities',
          component: AssessmentAmbitions
        },
        {
          key: 'focus',
          component: AssessmentIdentifyBusinessOpportunities
        }
      ]
    },
    {
      key: 'sdg-profile',
      number: '4',
      title: 'Your Profile',
      steps: [{ key: 'sdg-profile', component: AssessmentSdgProfile }]
    }
  ]
}
