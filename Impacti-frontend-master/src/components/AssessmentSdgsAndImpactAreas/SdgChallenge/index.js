import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import FormControl from '@material-ui/core/FormControl'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import FormChoice from 'components/FormChoice'

const styles = theme => ({
  root: {
    width: '50%'
  },
  text: {
    fontWeight: 200,
    textAlign: 'left',
    whiteSpace: 'pre-line'
  },
  button: {
    minHeight: 110,
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    textAlign: 'center',
    alignItems: 'center',
    '& div:nthChild(2)': {
      width: '85%',
      height: '80%',
      margin: '10px 0'
    },
    '& p': {
      color: 'var(--secondaryColor)',
      whiteSpace: 'initial'
    },
    '& svg': {
      marginTop: theme.spacing.unit
    }
  },
  formControl: {
    width: '100%',
    height: '80%',
    margin: '10px auto'
  }
})
class SdgChallenge extends React.Component {
  state = {
    newText: this.props.sdg.text
      ? this.props.sdg.text
      : this.props.sdg.recoWhat + ' ' + this.props.sdg.recoWhy,
    challenge: this.props.challenge ? this.props.challenge : [],
    saved: true
  }

  handleChange = event => {
    const { onChange, value, sdg } = this.props
    if (onChange) {
      onChange(event, value, sdg)
    }
  }

  handleChallengeChange = name => event => {
    new Promise(async (resolve, reject) => {
      try {
        await this.setState({
          newText: event.target.value,
          saved: false
        })

        const { challenge, sdg } = this.props

        const existingChallengeIndex = challenge.findIndex(
          e => e.sdg.shortName === sdg.shortName
        )

        if (existingChallengeIndex === -1) {
          let newChallenges = [
            ...challenge,
            {
              sdg: sdg,
              text: this.state.newText
            }
          ]
          this.props.handleChallengeChange(newChallenges)
        } else {
          let updateChallenges = challenge.map(a => {
            const returnValue = { ...a }

            if (a.sdg._id === sdg._id) {
              returnValue.text = this.state.newText
            }

            return returnValue
          })
          this.props.handleChallengeChange(updateChallenges)
        }
        resolve()
      } catch (error) {
        reject(error)
      }
    })
  }

  saveChallengeChange = () => {
    const { challenge, member, updateMember, removeInput } = this.props
    updateMember(member.id, { customChallenges: challenge })
    removeInput('challenge')

    this.setState({ saved: true })
  }

  deleteChallengeChange = () => {
    const { sdg, deleteChange } = this.props
    this.setState({
      newText: sdg.text,
      saved: true
    })
    deleteChange()
  }

  render() {
    const {
      value,
      classes,
      sdg,
      selected,
      disabled,
      editMode,
      input,
      dirty
    } = this.props
    const { newText, saved } = this.state

    return (
      selected && (
        <div
          role="tab"
          value={value}
          onChange={this.handleChange}
          className={editMode && classes.button}
          aria-selected={selected}
          disabled={disabled}
        >
          {editMode ? (
            dirty && input.some(i => i === 'challenge') ? (
              <FormControl
                margin="normal"
                className={classes.formControl}
                error
                key={sdg._id}
              >
                <InputLabel htmlFor="customChallenge">
                  Fill in your challenge here - save your changes
                </InputLabel>
                <Input
                  value={newText}
                  onChange={this.handleChallengeChange('customChallenge')}
                  type="string"
                  id="customChallenge"
                  name="customChallenge"
                  autoFocus
                  multiline
                />
                <FormChoice
                  saved={saved}
                  input={input}
                  onSave={this.saveChallengeChange}
                  onDelete={this.deleteChallengeChange}
                />
              </FormControl>
            ) : (
              <FormControl
                key={sdg._id}
                margin="normal"
                className={classes.formControl}
              >
                <InputLabel htmlFor="customChallenge">
                  Fill in your challenge here
                </InputLabel>
                <Input
                  value={newText}
                  onChange={this.handleChallengeChange('customChallenge')}
                  type="string"
                  id="customChallenge"
                  name="customChallenge"
                  autoFocus
                  multiline
                />
                <FormChoice
                  saved={saved}
                  input={input}
                  onSave={this.saveChallengeChange}
                  onDelete={this.deleteChallengeChange}
                />
              </FormControl>
            )
          ) : (
            <p className={classes.text} key={sdg._id}>
              {!sdg.text ? sdg.recoWhat + ' ' + sdg.recoWhy : sdg.text}
            </p>
          )}
        </div>
      )
    )
  }
}
SdgChallenge.propTypes = {
  handleChallengeChange: PropTypes.func,
  selected: PropTypes.bool,
  disabled: PropTypes.bool,
  value: PropTypes.number,
  onChange: PropTypes.func,
  classes: PropTypes.object.isRequired
}

SdgChallenge.defaultProps = {
  disabled: false,
  onChange: () => {},
  handleChallengeChange: () => {}
}

export default withStyles(styles)(SdgChallenge)
