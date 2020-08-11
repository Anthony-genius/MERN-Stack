import sinon from 'sinon'
import { expect } from 'chai'
import applicationContext from './applicationContext'

describe('Actions/ApplicationContext', () => {
  describe('selectMemberByItsId', () => {
    it('select member by its id', () => {
      const dispatch = sinon.spy()
      applicationContext.selectMemberByItsId(dispatch)(12)
      expect(
        dispatch.calledWith({
          type: 'SELECT_MEMBER',
          data: 12
        })
      ).to.equal(true)
    })
  })

  describe('selectMember', () => {
    const member = {
      id: 21,
      paths: [{ _id: 1 }, { _id: 2 }]
    }
    const dispatch = sinon.spy()

    it('selects member', () => {
      applicationContext.selectMemberByItsId = sinon.spy()
      applicationContext.selectMember(dispatch)(member)

      expect(
        dispatch.calledWith({
          type: 'SELECT_MEMBER',
          data: 21
        })
      ).to.equal(true)
    })

    it('selects paths', () => {
      applicationContext.selectMember(dispatch)(member)

      expect(
        dispatch.calledWith({
          type: 'PRESELECT_PATHS',
          data: [{ _id: 1 }, { _id: 2 }]
        })
      )
    })
  })

  describe('selectPath', () => {
    it('selects path', () => {
      const dispatch = sinon.spy()
      applicationContext.selectPath(dispatch)(145)
      expect(
        dispatch.calledWith({
          type: 'SELECT_PATH_CONTEXT',
          data: 145
        })
      ).to.equal(true)
    })
  })
})
