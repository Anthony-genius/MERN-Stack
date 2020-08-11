import {
  assert,
} from 'chai';
import {
  describe,
  it,
  beforeEach,
  afterEach,
} from 'mocha';
import proxyquire from 'proxyquire';
import sinon from 'sinon';

describe('Member/Destination', () => {
  let recursiveSave;
  let Destination;

  beforeEach(() => {
    recursiveSave = sinon.stub()
      .returns(() => Promise.resolve());

    Destination = proxyquire(
      '../../../src/components/member/destination', {
        './collectionOperations': { recursiveSave, '@noCallThru': true },
      },
    );
  });

  afterEach(() => {
    recursiveSave.reset();
  });

  describe('addDestinations', () => {
    let req;
    let res;
    let next;

    beforeEach(() => {
      next = sinon.spy();
      res = {
      };
      req = {
        body: {},
        member: {
          destinations: [{
            id: 123,
          }],
        },
      };
    });

    it('calls recursive save if body.add is an array', () => {
      req = {
        ...req,
        body: {
          add: [],
        },
      };
      Destination.addDestinations(req, res, next);
      assert.isTrue(recursiveSave.called);
    });

    it('gently prepares an array of ids to add respecting newly added id as well as already existing ones', () => {
      req = {
        ...req,
        member: {
          destinations: [{ _id: '123' }, { _id: '456' }],
        },
        body: {
          add: ['789', '012', '456'],
          remove: [],
          propagate: true,
        },
      };

      let updatedMember;

      recursiveSave
        .callsFake((propagate, member) =>
          (toAdd, fn) => {
            updatedMember = fn(member, toAdd);
            return Promise.resolve();
          });

      Destination.addDestinations(req, res, next);
      assert.isTrue(recursiveSave.calledWith(req.body.propagate, req.member));

      assert.deepEqual(updatedMember, {
        ...req.member,
        destinations: ['123', '456', '789', '012'],
      });
    });
  });
});
