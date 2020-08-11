import { expect } from 'chai'
import Selector from './assessmentWizard'

const state = {
  pairs: [
    { name: 'Component0Name', hash: 0 },
    { name: 'Component1Name', hash: 1 },
    { name: 'Component2Name', hash: 2 },
    { name: 'Component3Name', hash: 3 },
    { name: 'Component4Name', hash: 4 }
  ],
  currentName: 'Component0Name'
}

describe('Selectors/AssessmentWizard', () => {
  describe('getNextHashByCurrentName', () => {
    it('works relatively fine for an unknown previous name', () => {
      expect(
        Selector.getNextHashByCurrentName(state.pairs)('Potato')()
      ).to.equal(state.pairs[0].hash)
    })

    it("doesn't blow up when pairs array is empty", () => {
      expect(Selector.getNextHashByCurrentName([])('Potato')()).to.equal(
        undefined
      )
    })

    it("doesn't blow up when pairs are not defined", () => {
      expect(Selector.getNextHashByCurrentName(undefined)('Potato')()).to.equal(
        undefined
      )
    })

    it('correctly returns next hash for the nth element', () => {
      expect(
        Selector.getNextHashByCurrentName(state.pairs)(state.pairs[2].name)()
      ).to.equal(state.pairs[3].hash)
    })

    it('falls back to the current element when asked for the next after the last', () => {
      expect(
        Selector.getNextHashByCurrentName(state.pairs)(
          state.pairs[state.pairs.length - 1].name
        )()
      ).to.equal(state.pairs[state.pairs.length - 1].hash)
    })
  })

  describe('getPreviousHashByCurrentName', () => {
    it('works relatively fine for an unknown previous name', () => {
      expect(
        Selector.getPreviousHashByCurrentName(state.pairs)('Potato')()
      ).to.equal(state.pairs[0].hash)
    })

    it("doesn't blow up when pairs array is empty", () => {
      expect(Selector.getPreviousHashByCurrentName([])('Potato')()).to.equal(
        undefined
      )
    })

    it("doesn't blow up when pairs are not defined", () => {
      expect(
        Selector.getPreviousHashByCurrentName(undefined)('Potato')()
      ).to.equal(undefined)
    })

    it('correctly returns next hash for the nth element', () => {
      expect(
        Selector.getPreviousHashByCurrentName(state.pairs)(
          state.pairs[2].name
        )()
      ).to.equal(state.pairs[1].hash)
    })

    it('falls back to the current element when asked for the previous, before the first', () => {
      expect(
        Selector.getPreviousHashByCurrentName(state.pairs)(
          state.pairs[0].name
        )()
      ).to.equal(state.pairs[0].hash)
    })
  })

  describe('getNextNameByCurrentName', () => {
    it('works relatively fine for an unknown previous name', () => {
      expect(
        Selector.getNextNameByCurrentName(state.pairs)('Potato')()
      ).to.equal(state.pairs[0].name)
    })

    it("doesn't blow up when pairs array is empty", () => {
      expect(Selector.getNextNameByCurrentName([])('Potato')()).to.equal(
        undefined
      )
    })

    it("doesn't blow up when pairs are not defined", () => {
      expect(Selector.getNextNameByCurrentName(undefined)('Potato')()).to.equal(
        undefined
      )
    })

    it('correctly returns next hash for the nth element', () => {
      expect(
        Selector.getNextNameByCurrentName(state.pairs)(state.pairs[2].name)()
      ).to.equal(state.pairs[3].name)
    })

    it('falls back to the current element when asked for the next after the last', () => {
      expect(
        Selector.getNextHashByCurrentName(state.pairs)(
          state.pairs[state.pairs.length - 1].name
        )()
      ).to.equal(state.pairs[state.pairs.length - 1].hash)
    })
  })

  describe('getPreviousNameByCurrentName', () => {
    it('works relatively fine for an unknown previous name', () => {
      expect(
        Selector.getPreviousNameByCurrentName(state.pairs)('Potato')()
      ).to.equal(state.pairs[0].name)
    })

    it("doesn't blow up when pairs array is empty", () => {
      expect(Selector.getPreviousNameByCurrentName([])('Potato')()).to.equal(
        undefined
      )
    })

    it("doesn't blow up when pairs are not defined", () => {
      expect(
        Selector.getPreviousNameByCurrentName(undefined)('Potato')()
      ).to.equal(undefined)
    })

    it('correctly returns next hash for the nth element', () => {
      expect(
        Selector.getPreviousNameByCurrentName(state.pairs)(
          state.pairs[2].name
        )()
      ).to.equal(state.pairs[1].name)
    })

    it('falls back to the current element when asked for the previous, before the first', () => {
      expect(
        Selector.getPreviousHashByCurrentName(state.pairs)(
          state.pairs[0].name
        )()
      ).to.equal(state.pairs[0].hash)
    })
  })
})
