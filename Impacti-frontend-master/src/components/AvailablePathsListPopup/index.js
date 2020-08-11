import React from 'react'
import CloseIcon from '@material-ui/icons/Clear'
import API_CONSTANTS from 'constants/api'
import style from './style.module.css'
import ConfirmPathCascadeAddDialog from '../ConfirmPathCascadeAddDialog'

class AvailablePathsListPopup extends React.Component {
  constructor(props, ctx) {
    super(props, ctx)

    this.state = {
      isConfirmationModalVisible: false
    }
  }

  handlePathClick(path) {
    this.setState({
      isConfirmationModalVisible: true,
      selectedPath: path
    })
  }

  clearState() {
    this.setState({
      isConfirmationModalVisible: false,
      selectedPath: undefined
    })
  }

  render() {
    return (
      <div className={style.listPaths}>
        {this.props.allPaths
          .filter(e => !this.props.assignedPaths.some(p => p._id === e._id))
          .map(e => (
            <div
              tabIndex={0}
              role="link"
              className={style.path}
              key={e._id}
              onClick={() => this.handlePathClick(e)}
              style={{
                border: `1px solid ${e.displayColor}`,
                cursor: 'pointer'
              }}
            >
              <img
                className={style.pathIcon}
                src={`${API_CONSTANTS.BASE_URL}${e.iconLocation}`}
                alt=""
                style={{
                  background: e.displayColor
                }}
              />
            </div>
          ))}
        <CloseIcon
          className={style.closeIcon}
          onClick={() => this.props.closePopup()}
        />

        <ConfirmPathCascadeAddDialog
          isOpen={this.state.isConfirmationModalVisible}
          onYes={() => {
            this.props.onAddPath([this.state.selectedPath])
            this.clearState()
          }}
          onNo={() => {
            this.props.onAddPathWithoutCascade([this.state.selectedPath])
            this.clearState()
          }}
          onCancel={() => {
            this.clearState()
          }}
        />
      </div>
    )
  }
}
export default AvailablePathsListPopup
