/* eslint-disable jsx-a11y/mouse-events-have-key-events */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ImpactiButton, { BUTTON_TYPES } from 'components/ImpactiButton'
import { withStyles } from '@material-ui/core/styles'
import Popover from '@material-ui/core/Popover'
import Typography from '@material-ui/core/Typography'
import AmbitionCard from './AmbitionCard'

const styles = theme => ({
  paper: {
    padding: '20px',
    width: '14vw',
    position: 'fixed'
  },
  cardsList: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    width: '75%'
  },
  popover: {
    pointerEvents: 'none'
  }
})

class AmbitionsCards extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      selectedAmbitions: this.props.prefill ? this.props.prefill.ambitions : [],
      anchorEl: null
    }
  }

  isAmbitionSelected = ambition => {
    return this.state.selectedAmbitions.some(e => e._id === ambition)
  }
  removeAmbition = ambition => {
    this.setState({
      selectedAmbitions: this.state.selectedAmbitions.filter(
        e => e._id !== ambition._id
      )
    })
  }

  addAmbition = (ambition, buttonId) => {
    this.setState({
      selectedAmbitions: [
        ...new Set([...this.state.selectedAmbitions, ambition])
      ]
    })
  }

  toggleAmbition = ambition => {
    if (this.isAmbitionSelected(ambition._id)) {
      this.removeAmbition(ambition)
    } else {
      this.addAmbition(ambition)
    }
  }

  handlePopoverOpen = event => {
    this.setState({ anchorEl: event.currentTarget })
  }

  handlePopoverClose = () => {
    this.setState({ anchorEl: null })
  }

  render() {
    const { classes, ambitions, goBack, onSave } = this.props
    const { selectedAmbitions, anchorEl } = this.state

    const open = Boolean(anchorEl)

    return (
      <>
        <div className={classes.cardsList}>
          {ambitions
            .sort((a, b) => a.order - b.order)
            .map((ambition, i) => (
              <AmbitionCard
                key={ambition.order}
                classes={classes}
                ambition={ambition}
                styles={styles}
                selectedAmbitions={selectedAmbitions}
                toggleCard={() => this.toggleAmbition(ambition)}
              />
            ))}
        </div>
        <div className="materiality-buttons">
          <div
            aria-owns={open ? 'mouse-over-popover' : undefined}
            aria-haspopup="true"
            onMouseEnter={
              selectedAmbitions &&
              selectedAmbitions.length === 0 &&
              this.handlePopoverOpen
            }
            onMouseLeave={this.handlePopoverClose}
          >
            <ImpactiButton
              variant="contained"
              onClick={() => onSave(selectedAmbitions)}
              buttonType={BUTTON_TYPES.NEXT}
              disabled={selectedAmbitions.length === 0}
            />
            <Popover
              id="mouse-over-popover"
              className={classes.popover}
              classes={{
                paper: classes.paper
              }}
              open={open}
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'center'
              }}
              transformOrigin={{
                vertical: 'bottom',
                horizontal: 'center'
              }}
              onClose={this.handlePopoverClose}
              disableRestoreFocus
            >
              <Typography>Please choose at least one impact</Typography>
            </Popover>
          </div>
          <div
            className="paper-container__backbutton"
            onClick={goBack}
            role="link"
            tabIndex="0"
          >
            GO BACK
          </div>
        </div>
      </>
    )
  }
}

AmbitionsCards.defaultProps = {
  prefill: {
    ambitions: []
  },
  ambitions: [],
  onSave: () => {}
}

AmbitionsCards.propTypes = {
  classes: PropTypes.object.isRequired,
  prefill: PropTypes.shape({
    ambitions: PropTypes.array
  }),
  ambitions: PropTypes.array,
  onSave: PropTypes.func
}

export default withStyles(styles)(AmbitionsCards)
