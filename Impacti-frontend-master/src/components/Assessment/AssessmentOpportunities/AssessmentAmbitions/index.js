import React from 'react'
import { connect } from 'react-redux'
import ScrollToTop from '../../../ScrollToTop'
import AmbitionsCards from './AmbitionsCards'
import styles from '../../style.module.css'
import style from './style.module.css'

const AssessmentAmbitions = ({
  dictionaries,
  nextStep,
  goBack,
  prefill,
  updateMember
}) => (
  <div className={styles.paperContainerWrapper}>
    <ScrollToTop />
    <div elevation={24} className={styles.paperContainer}>
      <div className="paper-container__text">
        <div className={styles.introMessage}>
          <section className={style.introText}>
            <h1>Where do you want to improve your impact?</h1>
            <p className="paper-container__text">
              Opportunities can be found to integrate sustainability across your
              business operations, supply chain and products.
            </p>
          </section>
        </div>
      </div>
      <AmbitionsCards
        ambitions={dictionaries.path}
        updateMember={updateMember}
        onSave={paths => updateMember({ paths }).then(() => nextStep())}
        goBack={goBack}
        prefill={prefill}
      />
    </div>
  </div>
)

export default connect(state => ({
  dictionaries: state.dictionaries,
  prefill: {
    ambitions: state.assessmentWizard.paths
  }
}))(AssessmentAmbitions)
