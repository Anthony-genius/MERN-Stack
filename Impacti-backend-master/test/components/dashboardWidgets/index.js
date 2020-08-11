const proxyquire = require('proxyquire');
const { assert } = require('chai');
const {
  describe,
  it,
  beforeEach,
} = require('mocha');
const sinon = require('sinon');

const emptyPath = null;

const mockPath = {
  id: 1,
};

const member = {
  destinations: [
    {
      id: 1,
      name: 'test',
      recommendedPaths: [1, 2],
    },
    {
      id: 2,
      name: 'test2',
      recommendedPaths: [3],
    },
  ],
};

const reformatedDestinations = [
  {
    id: 1,
    destination: 'test',
  },
  {
    id: 2,
    destination: 'test2',
  },
];

const filteredDestinations = [
  {
    id: 1,
    destination: 'test',
  },
];

describe('Components/DashboardWidgets', () => {
  let dashboardWidgets;
  let entityMock;
  let pathMock;
  beforeEach(() => {
    entityMock = {
      findOne() { return { populate: () => Promise.resolve({}) }; },
    };
    pathMock = {
      findOne() { return Promise.resolve({}); },
    };

    dashboardWidgets = proxyquire('../../../src/components/dashboardWidgets', {
      '../../models/Path': { '@noCallThru': true, Path: pathMock },
      '../../models/Entity': { Entity: entityMock, '@noCallThru': true },
    });
  });

  describe('setMemberFromQuery', () => {
    it('calls next if member can be found', (done) => {
      const req = {
        query: {
          member: 1,
        },
      };

      entityMock.findOne = () => ({
        populate: () => Promise.resolve({ id: 1 }),
      });
      const res = {};
      const next = sinon.spy();
      dashboardWidgets.setMemberFromQuery(req, res, next);
      setTimeout(() => {
        assert.isTrue(next.called);
        assert.deepEqual(req.chosenMember, { id: 1 });
        done();
      }, 0);
    });

    it('responds with 404 when member cannot be found', (done) => {
      const req = {
        query: {
          member: 1,
        },
      };

      entityMock.findOne = () => ({
        populate: () => Promise.resolve(undefined),
      });
      const res = {
        status: sinon.stub().returns({
          send() {},
        }),
      };
      dashboardWidgets.setMemberFromQuery(req, res, () => {});
      setTimeout(() => {
        assert.isTrue(res.status.calledWith(404));
        done();
      }, 0);
    });

    it('responds with 400 for incorrect param type', (done) => {
      const req = {
        query: {
          member: 'duck',
        },
      };

      entityMock.findOne = () => ({
        populate: () => Promise.reject(undefined),
      });
      const res = {
        status: sinon.stub().returns({
          send() {},
        }),
      };
      dashboardWidgets.setMemberFromQuery(req, res, () => {});
      setTimeout(() => {
        assert.isTrue(res.status.calledWith(400));
        done();
      }, 0);
    });
  });

  describe('setPathFromQuery', () => {
    it('calls next if path can be found', (done) => {
      const req = {
        query: {
          path: 1,
        },
      };

      pathMock.findOne = () => Promise.resolve({ id: 1 });
      const res = {};
      const next = sinon.spy();
      dashboardWidgets.setPathFromQuery(req, res, next);
      setTimeout(() => {
        assert.isTrue(next.called);
        assert.deepEqual(req.chosenPath, { id: 1 });
        done();
      }, 0);
    });

    it('responds with 404 when member cannot be found', (done) => {
      const req = {
        query: {
          path: 1,
        },
      };

      pathMock.findOne = () => Promise.resolve(undefined);
      const res = {
        status: sinon.stub().returns({
          send() {},
        }),
      };
      dashboardWidgets.setPathFromQuery(req, res, () => {});
      setTimeout(() => {
        assert.isTrue(res.status.calledWith(404));
        done();
      }, 0);
    });

    it('responds with 400 for incorrect param type', (done) => {
      const req = {
        query: {
          path: 'dog',
        },
      };

      pathMock.findOne = () => Promise.reject(undefined);
      const res = {
        status: sinon.stub().returns({
          send() {},
        }),
      };
      dashboardWidgets.setPathFromQuery(req, res, () => {});
      setTimeout(() => {
        assert.isTrue(res.status.calledWith(400));
        done();
      }, 0);
    });
  });

  describe('findProperDestinations', () => {
    it('should return all destinations if no path was given', () => {
      const req = {
        chosenPath: emptyPath,
        chosenMember: member,
      };

      dashboardWidgets.findProperDestinations(
        req,
        {},
        () => {},
      );

      assert.deepEqual(req.intersectingDestinations, reformatedDestinations);
    });

    it('should return only intersecting destinations if path is set', () => {
      const req = {
        chosenPath: mockPath,
        chosenMember: member,
      };

      dashboardWidgets.findProperDestinations(
        req,
        {},
        () => {},
      );

      assert.deepEqual(req.intersectingDestinations, filteredDestinations);
    });
  });
});
