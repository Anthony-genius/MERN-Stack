const { recursiveSave } = require('./collectionOperations');

const append = (member, add) => Object.assign(
  member, {
    destinations: [...new Set(
      [
        ...member.destinations
          .map(e => (e._id ? e._id.toString() : e.toString())), //eslint-disable-line
        ...add,
      ])],
  },
);

const remove = (member, toRemove) => Object.assign(
  member, {
    destinations: member.destinations
      .map(e => (typeof e === 'object' ? e : e.toString()))
      .filter(e => !toRemove.some(d => e === d || e.id === d)),
  },
);

const addDestinations = (req, res, next) => {
  if (Array.isArray(req.body.add)) {
    recursiveSave(req.body.propagate, req.member)(req.body.add, append).then(() => next());
  } else {
    next();
  }
};

const removeDestinations = (req, res, next) => {
  if (Array.isArray(req.body.remove)) {
    recursiveSave(req.body.propagate, req.member)(req.body.remove, remove).then(() => next());
  } else {
    next();
  }
};

module.exports = {
  addDestinations,
  removeDestinations,
};
