import { expect } from 'chai'
import { ROUTE_RANKING } from 'constants/routes'
import Selector from './auth'

describe('Selectors/Auth', () => {
  describe('getTheLatestUri', () => {
    it('returns current value for unrecoginsed next value', () => {
      expect(
        Selector.getTheLatestUri('/spanish-inquisition', ROUTE_RANKING[0])
      ).to.equal(ROUTE_RANKING[0])
    })

    it('returns next value for next value that has a higher place in route ranking', () => {
      expect(
        Selector.getTheLatestUri(ROUTE_RANKING[3], ROUTE_RANKING[2])
      ).to.equal(ROUTE_RANKING[3])
    })

    it('returns current value for next value that has a lower place in route ranking', () => {
      expect(
        Selector.getTheLatestUri(ROUTE_RANKING[1], ROUTE_RANKING[4])
      ).to.equal(ROUTE_RANKING[4])
    })

    it('does not suprise anybody if the current route is the same as the next route', () => {
      expect(
        Selector.getTheLatestUri(ROUTE_RANKING[3], ROUTE_RANKING[3])
      ).to.equal(ROUTE_RANKING[3])
    })

    it("returns first available (lowest) route from the ranking if both params aren't quite right", () => {
      expect(Selector.getTheLatestUri('/ireland', '/strawberry')).to.equal(
        ROUTE_RANKING[0]
      )
    })

    it('gently falls back to first available route in case of any serious trouble', () => {
      expect(Selector.getTheLatestUri(null, undefined)).to.equal(
        ROUTE_RANKING[0]
      )
    })
  })
})
