const { assert } = require('chai');
const {
  describe,
  it,
} = require('mocha');

const { findReports } = require('../../../src/components/dashboardWidgets/destinationOutputs');

describe('components/dashboardWidgets/destinationOutputs', () => {
  describe('findReports', () => {
    it('should call res.send', (done) => {
      findReports(
        {
          intersectingDestinations: [],
        },
        {
          status: (code) => {
            assert.equal(200, code);
            return {
              send: () => {
                assert.equal(1, 1);
                done();
              },
            };
          },
        },
      );
    });
  });
});
