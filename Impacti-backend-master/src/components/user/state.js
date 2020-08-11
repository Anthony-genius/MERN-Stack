const { User } = require('../../models/User');
const { State } = require('../../models/State');

const createState = (userId, memberId) =>
  new Promise((resolve, reject) => {
    if (!userId) return reject();

    const state = new State({ memberId });

    User.findByIdAndUpdate(
      userId,
      { $push: { states: state } },
      {
        new: true,
      },
    )
      .then(() => resolve(state._id))
      .catch(reject);
  });

const updateState = (stateId, stage, step) =>
  State.findByIdAndUpdate(stateId, { stage, step }, { new: true });

const getState = stateId => State.findById(stateId);

module.exports = {
  createState,
  updateState,
  getState,
};
