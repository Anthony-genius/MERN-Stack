import React from 'react'
import { connect } from 'react-redux'

import AssessmentCountriesDialog from 'components/AssessmentCountriesDialog'
import styles from './AssessmentCountry.module.css'
import ScrollToTop from '../../../ScrollToTop'

const AssessmentCountry = ({
  allCountries,
  updateMember,
  prefill,
  goBack,
  nextStep
}) => (
  <div className={styles.paperContainerWrapper}>
    <ScrollToTop />
    <div elevation={24} className={styles.paperContainer}>
      <div className="paper-container__text">
        <div className={styles.introMessage}>
          <h1 className="paper-container__text--large">
            Where are your major business operations located?
          </h1>
          <p className="paper-container__text--small">
            The SDGs that need the most support differ depending where you
            operate.
          </p>
        </div>
        <div className={styles.countries}>
          <AssessmentCountriesDialog
            countries={allCountries}
            onBack={() => goBack()}
            onSave={countries =>
              updateMember({ countries }).then(() => nextStep())
            }
            prefill={prefill}
          />
        </div>
      </div>
    </div>
  </div>
)

export default connect(state => ({
  member: state.assessmentWizard,
  organization: state.assessmentWizard.countries,
  memberId: state.assessmentWizard.memberId,
  allCountries: state.dictionaries.country,
  prefill: {
    countries: state.assessmentWizard.countries
  }
}))(AssessmentCountry)
