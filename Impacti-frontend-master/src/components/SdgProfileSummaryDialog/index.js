import React from 'react'
import PropTypes from 'prop-types'
import AssessmentSdgsWheelProfile from '../AssessmentSdgsWheelProfile'
import AssessmentSdgsWheelCountries from '../AssessmentSdgsWheelCountries'
import AssessmentSdgsWheelSectors from '../AssessmentSdgsWheelSectors'
import styles from '../Assessment/style.module.css'

const SdgProfileSummaryDialog = ({
  countries,
  sectors,
  industries,
  sdgs,
  questions,
  answers,
  member,
  id
}) => (
  <div className={styles.introMessage} id={id}>
    <img src={require('assets/global.png')} alt="world globe" />
    <h1 className="paper-container__text--large">
      Sustainable Development Goals Profile
    </h1>
    <h2 className="paper-container__text--large">NATIONAL SDGs PRIORITIES</h2>
    <p className="paper-container__text--small">
      These are the SDGs relevant to your country(ies).
    </p>
    <div className={styles.summaryRow}>
      <div className={styles.summaryBlock}>
        <AssessmentSdgsWheelCountries countries={countries} sdgs={sdgs} />
      </div>
      <div className={styles.summaryBlock}>
        {countries.map(c => (
          <h5 key={c._id}>{c.name}</h5>
        ))}
      </div>
    </div>
    <h2 className="paper-container__text--large">SECTORAL SDGs PRIORITIES</h2>
    <p className="paper-container__text--small">
      These are the SDGs relevant to your sector(s).
    </p>
    <div className={styles.summaryRow}>
      <div className={styles.summaryBlock}>
        <AssessmentSdgsWheelSectors sectors={sectors} sdgs={sdgs} />
      </div>
      <div className={styles.summaryBlock}>
        {sectors.map(s => (
          <div key={s._id}>
            <h5>{s.name}</h5>
            {industries.map(i => (
              <p key={i._id}>{s.industries.includes(i._id) ? i.name : ''}</p>
            ))}
          </div>
        ))}
      </div>
    </div>
    <h2 className="paper-container__text--large">SDGs that matter to you</h2>
    <AssessmentSdgsWheelProfile
      countries={countries}
      sectors={sectors}
      sdgs={sdgs}
      questions={questions}
      answers={answers}
      member={member}
    />
  </div>
)
SdgProfileSummaryDialog.defaultProps = {
  sectors: [],
  industries: [],
  sdgs: [],
  questions: [],
  answers: [],
  member: {},
  id: ''
}
SdgProfileSummaryDialog.propTypes = {
  sectors: PropTypes.array,
  industries: PropTypes.array,
  sdgs: PropTypes.array,
  questions: PropTypes.array,
  answers: PropTypes.array,
  member: PropTypes.object,
  id: PropTypes.string
}
export default SdgProfileSummaryDialog
