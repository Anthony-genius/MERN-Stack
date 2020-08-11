import { expect } from 'chai'
import Reducer from './assessmentWizard'
import ACTION_KEYS from 'constants/actionKeys/assessmentWizard'

describe('Reducers/AssessmentWizard', () => {
  it(`Action: ${ACTION_KEYS.ASSESSMENT_INITIALIZE_HASHES_LOOKUP}`, () => {
    const pairs = [{ name: 'Whatever', hash: '123!@#123$%23!@#534^$5^%#$@4' }]
    const state = {
      pairs: [],
      currentName: ''
    }
    const action = {
      type: ACTION_KEYS.ASSESSMENT_INITIALIZE_HASHES_LOOKUP,
      data: pairs
    }

    const expectedState = {
      pairs,
      currentName: pairs[0].name
    }
    expect(Reducer(state, action)).to.deep.equal(expectedState)
  })

  it(`Action: ${ACTION_KEYS.ASSESSMENT_NEXT_STEP}`, () => {
    const pairs = [
      { name: 'Whatever', hash: '123!@#123$%23!@#534^$5^%#$@4' },
      { name: 'Whatever2', hash: '123!@#123$%23!@#534^$5^%#$@5' }
    ]
    const state = {
      pairs,
      currentName: pairs[0].name
    }
    const action = {
      type: ACTION_KEYS.ASSESSMENT_NEXT_STEP
    }

    const expectedState = {
      pairs,
      currentName: pairs[1].name
    }
    expect(Reducer(state, action)).to.deep.equal(expectedState)
  })

  it(`Action: ${ACTION_KEYS.ASSESSMENT_PREVIOUS_STEP}`, () => {
    const pairs = [
      { name: 'Whatever', hash: '123!@#123$%23!@#534^$5^%#$@4' },
      { name: 'Whatever2', hash: '123!@#123$%23!@#534^$5^%#$@5' }
    ]
    const state = {
      pairs,
      currentName: pairs[1].name
    }
    const action = {
      type: ACTION_KEYS.ASSESSMENT_PREVIOUS_STEP
    }

    const expectedState = {
      pairs,
      currentName: pairs[0].name
    }
    expect(Reducer(state, action)).to.deep.equal(expectedState)
  })

  it(`Action: ${ACTION_KEYS.ASSESSMENT_ON_EXTERNAL_URL_CHANGE}`, () => {
    const pairs = [
      { name: 'Whatever', hash: '123!@#123$%23!@#534^$5^%#$@4' },
      { name: 'Whatever2', hash: '123!@#123$%23!@#534^$5^%#$@5' }
    ]
    const state = {
      pairs,
      currentName: ''
    }
    const action = {
      type: ACTION_KEYS.ASSESSMENT_ON_EXTERNAL_URL_CHANGE,
      data: pairs[1].hash
    }

    const expectedState = {
      pairs,
      currentName: pairs[1].name
    }
    expect(Reducer(state, action)).to.deep.equal(expectedState)
  })
})
