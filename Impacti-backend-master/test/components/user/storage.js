import {
  assert,
} from 'chai';
import {
  describe,
  it,
  beforeEach,
} from 'mocha';
import proxyquire from 'proxyquire';
import sinon from 'sinon';

describe('User/Storage', () => {
  let Storage;
  let User;

  beforeEach(() => {
    User = {
      findByIdAndUpdate: sinon.stub().resolves({}),
    };

    Storage = proxyquire(
      '../../../src/components/user/storage', {
        '../../models/User': { User, '@noCallThru': true },
      },
    );
  });


  describe('addToStorage', () => {
    it('returns a function that returns a promise', () => {
      const fn = Storage.addToStorage('123');

      assert.isFunction(fn);
      assert.isFunction(
        fn(
          [{ key: 'someKey', value: 'someValue' }],
          { someOtherKey: 'someValuableValue' })
          .then);
    });

    it('actually adds to storage, respecting the current values and overriding those present in update object', () => {
      User.findByIdAndUpdate
        .callsFake((id, update) => Promise.resolve(update));

      return Storage.addToStorage('123')(
        [{ key: 'someKey', value: 'someValue' }, { key: 'someOtherKey', value: 'brandNewValue' }],
        { someOtherKey: 'someValuableValue' },
      ).then((update) => {
        assert.deepEqual(update, {
          storage: {
            someKey: 'someValue',
            someOtherKey: 'brandNewValue',
          },
        });
      });
    });
  });
});
