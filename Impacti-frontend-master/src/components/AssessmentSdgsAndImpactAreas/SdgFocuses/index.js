import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import Typography from '@material-ui/core/Typography'
import LabelIcon from '@material-ui/icons/Label'
import AddIcon from '@material-ui/icons/Visibility'
import RemoveIcon from '@material-ui/icons/VisibilityOff'
import { uniqueId, isEqual } from 'lodash'
import ImpactiButton, { BUTTON_TYPES } from 'components/ImpactiButton'
import ViewMore from 'components/ViewMore'
import SdgFocus from './SdgFocus'
import NewFocus from './NewFocus'
import SelectFocuses from './SelectFocuses'

const styles = theme => ({
  card: {
    width: 315,
    minHeight: 410,
    margin: '10px 40px 10px 10px'
  },
  expansionPanelRoot: {
    marginBottom: theme.spacing(2)
  },
  expansionPanelDetailsRoot: {
    flexDirection: 'column'
  },
  expansionPanelSummaryRoot: {
    background: '#f5f5f5'
  },
  expansionPanelSummaryContent: {
    justifyContent: 'center'
  },
  iconRoot: {
    background: 'var(--secondaryColor)',
    borderRadius: '50%',
    color: '#fff',
    padding: theme.spacing(1),
    width: '1.4em',
    height: '1.4em'
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  },
  contentRoot: {
    padding: 0
  },
  textContainer: {
    padding: '25px 0',
    background: '#f2f2f2',
    height: 100,
    boxShadow: '0 8px 6px -6px #f2f2f2'
  },
  text: {
    margin: '0 auto',
    height: '100px',
    whiteSpace: 'normal',
    textAlign: 'center !important',
    fontWeight: 200
  },
  container: {
    margin: '15px'
  },
  labelIcon: {
    color: 'var(--secondaryColor)',
    marginRight: theme.spacing(1)
  },
  selectCardContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    [theme.breakpoints.down('xs')]: {
      display: 'inline-block'
    }
  },
  focusCardContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    maxWidth: 1040,
    margin: '0 auto'
  },
  pathText: {
    margin: '15px auto',
    whiteSpace: 'pre-line',
    textAlign: 'left',
    display: 'flex',
    fontWeight: 200
  },
  editMode: {
    display: 'flex',
    alignItems: 'center'
  },
  editButton: {
    backgroundColor: '#fff',
    minWidth: 25,
    '& svg': {
      color: '#fff',
      background: 'var(--secondaryColor)',
      borderRadius: '50%'
    },
    '&:hover': {
      backgroundColor: '#fff'
    }
  },
  '@media screen and (max-width: 768px)': {
    card: {
      width: '85vw',
      margin: '10px 15px'
    },
    container: {
      margin: '50px 0 0',
      width: '85vw'
    },
    textContainer: {
      width: '85vw',
      margin: 0
    }
  }
})
class SdgFocuses extends React.Component {
  state = {
    focuses: this.props.focuses ? this.props.focuses : [],
    newFocuses: [],
    /* baseAssessmentAnswers: this.props.baseAssessmentAnswers
      ? this.props.baseAssessmentAnswers
      : [], */
    expanded: []
  }

  componentWillMount() {
    const { baseAssessmentAnswers } = this.props

    const focusesData =
      baseAssessmentAnswers[0] &&
      baseAssessmentAnswers[0].customFocuses &&
      baseAssessmentAnswers[0].customFocuses.length !== 0
        ? baseAssessmentAnswers[0].customFocuses
        : baseAssessmentAnswers[0] &&
          baseAssessmentAnswers[0].baseAssessmentFocuses
        ? baseAssessmentAnswers[0].baseAssessmentFocuses
        : undefined
    this.setState({
      expanded: focusesData && focusesData.map(s => false)
    })
  }

  getfocusesWithIdedActions = () => {
    const { focuses } = this.props
    let actionIndex = 0
    const focusesWithIdedActions =
      focuses &&
      focuses.map(focus => ({
        ...focus,
        focusByPath: Object.assign(
          [...focus.focusByPath],
          focus.focusByPath.map(action =>
            Object.assign({}, action, { id: actionIndex++ })
          )
        )
      }))
    return focusesWithIdedActions
  }

  handleActionChange = (actionId, sdgId, focusId, value, customTitle) => {
    const { baseAssessmentAnswers, updateMember, member } = this.props

    let newFocuses = Object.assign(
      [],
      this.getfocusesWithIdedActions().map(focus => ({
        ...focus,
        focusArea: focus.focusArea,
        sdgs: focus.sdgs,
        focusByPath: Object.assign(
          [...focus.focusByPath],
          focus.focusByPath.map(action => {
            const returnValue = { ...action }

            if (action.id === actionId) {
              returnValue.title = value
              returnValue.customTitle = customTitle
            }

            return returnValue
          })
        )
      }))
    )

    const existingAnswerIndex = baseAssessmentAnswers.findIndex(
      e => e.sdg._id === sdgId
    )

    let BaseAssessmentAnswers = [...baseAssessmentAnswers]

    if (existingAnswerIndex === -1) {
      BaseAssessmentAnswers.push({
        customFocuses: newFocuses
      })
    } else {
      const newBaseAssessmentAnswers = Object.assign(
        [...BaseAssessmentAnswers],
        BaseAssessmentAnswers.map(a =>
          a.sdg._id === sdgId
            ? {
                ...a,
                customFocuses: newFocuses
              }
            : a
        )
      )
      updateMember(member.id, {
        baseAssessmentAnswers: newBaseAssessmentAnswers
      })
    }
  }

  addAction = (sdgId, focusId, value) => {
    const { baseAssessmentAnswers, updateMember, member } = this.props

    let newFocuses = Object.assign(
      [],
      this.getfocusesWithIdedActions().map(focus =>
        focus._id === focusId
          ? {
              ...focus,
              focusArea: focus.focusArea,
              sdgs: focus.sdgs,
              focusByPath: focus.focusByPath.concat({
                id: uniqueId(),
                title: value,
                customTitle: true
              })
            }
          : focus
      )
    )

    const existingAnswerIndex = baseAssessmentAnswers.findIndex(
      e => e.sdg._id === sdgId
    )

    let BaseAssessmentAnswers = [...baseAssessmentAnswers]

    if (existingAnswerIndex === -1) {
      BaseAssessmentAnswers.push({
        customFocuses: newFocuses
      })
    } else {
      const newBaseAssessmentAnswers = Object.assign(
        [...BaseAssessmentAnswers],
        BaseAssessmentAnswers.map(a =>
          a.sdg._id === sdgId
            ? {
                ...a,
                customFocuses: newFocuses
              }
            : a
        )
      )
      updateMember(member.id, {
        baseAssessmentAnswers: newBaseAssessmentAnswers
      })
    }
  }

  deleteAction = (actionId, sdgId, focusId) => {
    const { baseAssessmentAnswers, updateMember, member } = this.props

    let newFocuses = Object.assign(
      [],
      this.getfocusesWithIdedActions().map(focus =>
        focus._id === focusId
          ? {
              ...focus,
              focusArea: focus.focusArea,
              sdgs: focus.sdgs,
              focusByPath: focus.focusByPath.filter(
                action => action.id !== actionId
              )
            }
          : focus
      )
    )

    const existingAnswerIndex = baseAssessmentAnswers.findIndex(
      e => e.sdg._id === sdgId
    )

    let BaseAssessmentAnswers = [...baseAssessmentAnswers]

    if (existingAnswerIndex === -1) {
      BaseAssessmentAnswers.push({
        customFocuses: newFocuses
      })
    } else {
      const newBaseAssessmentAnswers = Object.assign(
        [...BaseAssessmentAnswers],
        BaseAssessmentAnswers.map(a =>
          a.sdg._id === sdgId
            ? {
                ...a,
                customFocuses: newFocuses
              }
            : a
        )
      )
      updateMember(member.id, {
        baseAssessmentAnswers: newBaseAssessmentAnswers
      })
    }
  }

  handleToggleOne = index => () => {
    const { expanded } = this.state
    if (expanded) {
      expanded[index] = !expanded[index]
    }

    this.setState({ expanded })
  }

  toggleFocus = (e, focus) => {
    e.stopPropagation()

    const {
      currentSdg,
      addOpportunityInput,
      addOpportunity,
      deleteOpportunityInput,
      updateMember,
      member,
      baseAssessmentAnswers,
      prevBaseAssessmentAnswers
    } = this.props

    const currentMemberSdg = currentSdg.shortName

    const existingAnswerIndex = baseAssessmentAnswers.find(
      e => e.sdg.shortName === currentMemberSdg
    )

    let newBaseAssessmentAnswers = [...baseAssessmentAnswers]

    const checkCustomFocuses =
      existingAnswerIndex &&
      newBaseAssessmentAnswers.find(a => a.sdg === existingAnswerIndex.sdg) &&
      existingAnswerIndex.customFocuses &&
      existingAnswerIndex.customFocuses.length !== 0

    if (existingAnswerIndex === undefined) {
      const addAnswers = async () => {
        await this.setState({
          baseAssessmentAnswers: [
            ...new Set([
              ...baseAssessmentAnswers,
              {
                sdg: { ...currentSdg },
                baseAssessmentFocuses: [focus]
              }
            ])
          ]
        })
        updateMember(member.id, {
          baseAssessmentAnswers: baseAssessmentAnswers
        })
      }
      addAnswers()
    } else {
      const newBaseAssessmentAnswersFocuses = checkCustomFocuses
        ? existingAnswerIndex.customFocuses
        : existingAnswerIndex.baseAssessmentFocuses

      if (newBaseAssessmentAnswersFocuses.some(e => e._id === focus._id)) {
        // this sdg/focus already exists, so remove it
        checkCustomFocuses
          ? (existingAnswerIndex.customFocuses = newBaseAssessmentAnswersFocuses.filter(
              e => e._id !== focus._id
            ))
          : (existingAnswerIndex.baseAssessmentFocuses = newBaseAssessmentAnswersFocuses.filter(
              e => e._id !== focus._id
            ))
      } else {
        // this sdg/focus doesn't exist, so add it
        checkCustomFocuses
          ? existingAnswerIndex.customFocuses.push(focus)
          : existingAnswerIndex.baseAssessmentFocuses.push(focus)
      }
      addOpportunity(newBaseAssessmentAnswers)

      const currentBaseAssessmentAnswerState =
        baseAssessmentAnswers &&
        baseAssessmentAnswers.find(
          e => e && e.sdg && e.sdg.shortName === this.props.sdg.shortName
        )
      const check = !isEqual(baseAssessmentAnswers, prevBaseAssessmentAnswers)
        ? addOpportunityInput()
        : deleteOpportunityInput()

      return check
    }
  }

  render() {
    const {
      classes,
      baseAssessmentFocuses,
      baseAssessmentAnswers,
      focuses,
      value,
      selected,
      editMode,
      currentSdg,
      addFocusInput,
      removeInput,
      sdg,
      input,
      dirty,
      editOpportunities
    } = this.props
    const { expanded } = this.state

    const customFocuses = baseAssessmentAnswers
      .filter(a => a.sdg.shortName === currentSdg.shortName)
      .map(answer => answer.customFocuses)
      .flat(2)

    const mergedFocuses = [
      ...new Set([
        ...customFocuses,
        ...baseAssessmentFocuses.filter(focus => {
          const focusesSdgs = focus.sdgs.map(({ shortName }) => shortName)

          return focusesSdgs.some(e => e === currentSdg.shortName)
        })
      ])
    ]

    const filteredFocuses = mergedFocuses.filter(
      (s => o =>
        (k => !s.has(k) && s.add(k))(['_id'].map(k => o[k]).join('|')))(
        new Set()
      )
    )

    const currentBaseAssessmentAnswer =
      baseAssessmentAnswers &&
      baseAssessmentAnswers.find(
        e => e && e.sdg && e.sdg.shortName === sdg.shortName
      )

    return selected && focuses && !editOpportunities
      ? this.getfocusesWithIdedActions().map((focus, focusInd) => (
          <div
            value={value}
            role="tab"
            onChange={this.handleChange}
            aria-selected={selected}
            key={focus._id}
          >
            <ExpansionPanel
              classes={{
                root: classes.expansionPanelRoot,
                expanded: classes.expansionPanelRoot
              }}
              square
              expanded={expanded ? expanded[focusInd] : false}
            >
              <ExpansionPanelSummary
                onClick={this.handleToggleOne(focusInd)}
                expandIcon={
                  expanded && expanded[focusInd] ? (
                    <RemoveIcon
                      classes={{
                        root: classes.iconRoot
                      }}
                    />
                  ) : (
                    <AddIcon
                      classes={{
                        root: classes.iconRoot
                      }}
                    />
                  )
                }
                classes={{
                  root: classes.expansionPanelSummaryRoot,
                  content: classes.expansionPanelSummaryContent
                }}
              >
                <Typography className={classes.heading}>
                  {focus.focusArea}
                </Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails
                classes={{
                  root: classes.expansionPanelDetailsRoot
                }}
              >
                <div>
                  {editMode
                    ? focus.focusByPath.map(action => (
                        <SdgFocus
                          action={action}
                          key={action.id}
                          value={action}
                          sdg={sdg}
                          focus={focus._id}
                          onChange={this.handleActionChange}
                          onDelete={this.deleteAction}
                          addFocusInput={addFocusInput}
                          removeInput={removeInput}
                          input={input}
                          dirty={dirty}
                        />
                      ))
                    : focus.focusByPath.map(action => (
                        <p key={action.id} className={classes.pathText}>
                          <LabelIcon className={classes.labelIcon} />{' '}
                          <ViewMore
                            text={action.title}
                            charLimit={250}
                            viewMoreText=" view more"
                            viewLessText=" view less"
                          />
                        </p>
                      ))}
                </div>
                {editMode && focus.focusByPath.length < 6 && (
                  <div className={classes.container}>
                    <NewFocus
                      sdg={sdg}
                      focus={focus._id}
                      onSave={this.addAction}
                      key={focus._id}
                      addFocusInput={addFocusInput}
                      removeInput={removeInput}
                      input={input}
                    />
                  </div>
                )}
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </div>
        ))
      : selected && editOpportunities && (
          <div className={classes.selectCardContainer}>
            <div className={classes.focusCardContainer}>
              {filteredFocuses.map((focus, i) => (
                <SelectFocuses
                  focus={focus}
                  index={i}
                  key={focus._id}
                  toggleFocus={e => this.toggleFocus(e, focus)}
                  isFocusSelected={
                    currentBaseAssessmentAnswer &&
                    currentBaseAssessmentAnswer.customFocuses &&
                    currentBaseAssessmentAnswer.customFocuses.length !== 0
                      ? currentBaseAssessmentAnswer.customFocuses.some(
                          e => e._id === focus._id
                        )
                      : currentBaseAssessmentAnswer &&
                        currentBaseAssessmentAnswer.baseAssessmentFocuses &&
                        currentBaseAssessmentAnswer.baseAssessmentFocuses
                          .length !== 0
                      ? currentBaseAssessmentAnswer.baseAssessmentFocuses.some(
                          e => e._id === focus._id
                        )
                      : undefined
                  }
                />
              ))}
            </div>
          </div>
        )
  }
}
SdgFocuses.propTypes = {
  selected: PropTypes.bool,
  disabled: PropTypes.bool,
  value: PropTypes.number,
  classes: PropTypes.object.isRequired
}

SdgFocuses.defaultProps = {
  disabled: false
}

export default withStyles(styles)(SdgFocuses)
