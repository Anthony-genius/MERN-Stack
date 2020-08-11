import React from 'react'
import { connect } from 'react-redux'

import { nodeById } from 'selectors/organization'
import AssessmentSectorsAndIndustriesDialog from '../../../AssessmentSectorsAndIndustriesDialog'
import styles from '../../style.module.css'
import ScrollToTop from '../../../ScrollToTop'

const AssessmentSector = ({
  dictionaries,
  prefill,
  updateMember,
  goBack,
  nextStep
}) => (
  <div className={styles.paperContainerWrapper}>
    <ScrollToTop />
    <div elevation={24} className={styles.paperContainer}>
      <div className="paper-container__text--big">
        <div className={styles.introMessage}>
          <h1 className="paper-container__text--large">
            Which sector(s) does your business operate in?
          </h1>
          <p className="paper-container__text--small">
            Sectors impact each SDG differently, in both negative & positive
            ways.
          </p>
        </div>
        <div>
          <AssessmentSectorsAndIndustriesDialog
            onBack={() => goBack()}
            onSave={(sectors, industries) =>
              updateMember({ sectors, industries }).then(() => nextStep())
            }
            sectors={dictionaries.sector}
            industries={dictionaries.industry}
            prefill={prefill}
          />
        </div>
      </div>
    </div>
  </div>
)
export default connect((state, ownProps) => ({
  wizardData: ownProps.id
    ? nodeById(ownProps.id, state)(state.organization)
    : state.assessmentWizard,
  dictionaries: state.dictionaries,
  prefill: {
    sectors: state.assessmentWizard.sectors,
    industries: state.assessmentWizard.industries
  }
}))(AssessmentSector)
