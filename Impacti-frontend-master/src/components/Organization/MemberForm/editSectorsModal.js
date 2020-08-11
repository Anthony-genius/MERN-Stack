import React from 'react'
import Dialog from '@material-ui/core/Dialog'
import SectorsAndIndustries from '../../SectorsAndIndustriesDialog'

import styles from './styles.module.css'

class EditSectorsModal extends React.Component {
  render() {
    return (
      <Dialog
        fullWidth
        maxWidth="md"
        open={this.props.open}
        onRequestClose={this.props.onRequestClose}
      >
        <div className={styles.sectorsModal}>
          <SectorsAndIndustries {...this.props} />
        </div>
      </Dialog>
    )
  }
}

export default EditSectorsModal
