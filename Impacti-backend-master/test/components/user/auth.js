import { assert } from 'chai';
import { describe, it } from 'mocha';
import sha from 'js-sha256';
import proxyquire from 'proxyquire';

const { authenticateUser, validateSignUp, validateLogin, createUser } = proxyquire('../../../src/components/user/auth', {
  '../../models/User': { User() { this.save = () => new Promise(resolve => resolve({ id: 1 })); }, '@noCallThru': true },
  '../../models/Organization': { Organization() { this.save = () => new Promise(resolve => resolve({ id: 1 })); }, '@noCallThru': true },
  '../../config/config': () => 'test',
  '../../helpers/mailer': { sendMail() { return new Promise(resolve => resolve({ })); } },
});

describe('Create user', () => {
  it('should authenticate user', () =>
    createUser({ password: 'test', email: 'email@test.com', username: 'test' }).then((result) => {
      assert.equal(result.status, 'ok', 'Status should be success');
      assert.exists(result.token, 'There should be a token generated');
    }),
  );
});

describe('Authenticate user', () => {
  it('should authenticate user if password hashes match', () =>
    authenticateUser({ password: sha('test') }, { password: 'test' }).then((result) => {
      assert.equal(result.status, 'ok', 'Status should be success');
      assert.exists(result.token, 'There should be a token generated');
    }),
  );

  it('should fail when password hashes mismatch', () =>
    authenticateUser({ password: sha('foo') }, { password: 'bar' }).then(() => {
      assert.equal(true, false, 'Should reject');
    }).catch((error) => {
      assert.equal(error.message, 'Invalid credentials');
    }),
  );
});

describe('Validate register input', () => {
  const params = { password: 'test', email: 'email@test.com', username: 'test' };

  it('Should pass params on successful validation', () =>
    validateSignUp(params).then((result) => {
      assert.deepEqual(result, params);
    }),
  );

  it('Should not append extra parameters', () =>
    validateSignUp({ ...params, test: 'test' }).then((result) => {
      assert.notExists(result.test, 'No added parameters');
    }),
  );

  it('Should reject if email is missing', () =>
    validateSignUp({ ...params, email: undefined }).then(() => {
      assert.equal(true, false, 'Should reject');
    }).catch((error) => {
      assert.equal(error.message, 'Some parameters are missing or invalid');
    }),
  );

  it('Should reject if email is not correct', () =>
    validateLogin({ ...params, email: 'test' }).then(() => {
      assert.equal(true, false, 'Should reject');
    }).catch((error) => {
      assert.equal(error.message, 'Some parameters are missing or invalid');
    }),
  );

  it('Should reject if password is missing', () =>
    validateSignUp({ ...params, password: undefined }).then(() => {
      assert.equal(true, false, 'Should reject');
    }).catch((error) => {
      assert.equal(error.message, 'Some parameters are missing or invalid');
    }),
  );

  it('Should reject if username is missing', () =>
    validateSignUp({ ...params, username: undefined }).then(() => {
      assert.equal(true, false, 'Should reject');
    }).catch((error) => {
      assert.equal(error.message, 'Some parameters are missing or invalid');
    }),
  );
});

describe('Validate login input', () => {
  const params = { password: 'test', email: 'email@test.com' };

  it('Should pass params on successful validation', () =>
    validateLogin(params).then((result) => {
      assert.deepEqual(result, params);
    }),
  );

  it('Should not append extra parameters', () =>
    validateLogin({ ...params, test: 'test' }).then((result) => {
      assert.notExists(result.test, 'No added parameters');
    }),
  );

  it('Should reject if email is missing', () =>
    validateSignUp({ ...params, email: undefined }).then(() => {
      assert.equal(true, false, 'Should reject');
    }).catch((error) => {
      assert.equal(error.message, 'Some parameters are missing or invalid');
    }),
  );

  it('Should reject if email is not correct', () =>
    validateSignUp({ ...params, email: 'test' }).then(() => {
      assert.equal(true, false, 'Should reject');
    }).catch((error) => {
      assert.equal(error.message, 'Some parameters are missing or invalid');
    }),
  );

  it('Should reject if password is missing', () =>
    validateSignUp({ ...params, password: undefined }).then(() => {
      assert.equal(true, false, 'Should reject');
    }).catch((error) => {
      assert.equal(error.message, 'Some parameters are missing or invalid');
    }),
  );
});
