const { recursiveSave } = require('./collectionOperations');

const append = (member, add) => Object.assign(
  member,
  {
    paths: [...new Set([...member.paths.map(e => e.toString()), ...add])],
  },
);

const remove = (member, removed) => Object.assign(
  member,
  {
    paths: member.paths.map(e => e.toString()).filter(e => removed.indexOf(e) === -1),
  },
);


const addPaths = (req, res, next) => {
  if (Array.isArray(req.body.add)) {
    recursiveSave(req.body.propagate, req.member)(req.body.add, append).then(() => next());
  } else {
    next();
  }
};

const removePaths = (req, res, next) => {
  if (Array.isArray(req.body.remove)) {
    recursiveSave(req.body.propagate, req.member)(req.body.remove, remove).then(() => next());
  } else {
    next();
  }
};

module.exports = {
  addPaths,
  removePaths,
};
