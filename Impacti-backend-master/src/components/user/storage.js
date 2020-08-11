const { User } = require('../../models/User');

const updateObjectFromBody = (body) => {
  const updateObj = {};

  body.forEach((pair) => {
    updateObj[pair.key] = pair.value;
  });

  return updateObj;
};

const addToStorage = id => (body, currentStorage) => new Promise((resolve, reject) => {
  if (!id) {
    reject();
    return;
  }

  User.findByIdAndUpdate(
    id,
    { storage: Object.assign({}, currentStorage, updateObjectFromBody(body)) },
  )
    .then(resolve, reject);
});

module.exports = {
  addToStorage,
};
