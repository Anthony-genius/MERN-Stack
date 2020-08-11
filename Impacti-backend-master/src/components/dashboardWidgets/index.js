const { Path } = require('../../models/Path');
const { Entity } = require('../../models/Entity');
const { wrongParamType, notFound } = require('../../helpers/errors');

const setPathFromQuery = (req, res, next) => {
  if (!req.query.path) {
    req.chosenPath = null;

    next();
  } else {
    Path.findOne({ _id: req.query.path })
      .then(
        (result) => {
          if (result) {
            req.chosenPath = result;

            next();
          } else {
            res.status(notFound.status).send(notFound);
          }
        },
      ).catch(() => {
        res.status(wrongParamType.status).send(wrongParamType);
      });
  }
};

const setMemberFromQuery = (req, res, next) => {
  Entity.findOne({ _id: req.query.member })
    .populate('destinations')
    .then(
      (result) => {
        if (result) {
          req.chosenMember = result;

          next();
        } else {
          res.status(notFound.status).send(notFound);
        }
      },
    ).catch(() => {
      res.status(wrongParamType.status).send(wrongParamType);
    });
};

const findProperDestinations = (req, res, next) => {
  if (!req.chosenPath) {
    req.intersectingDestinations = req.chosenMember.destinations.map(
      e => ({
        id: e.id,
        destination: e.name,
      }),
    );

    next();
  } else {
    req.intersectingDestinations = req.chosenMember.destinations.filter(
      e => e.recommendedPaths.some(x => x.toString() === req.chosenPath.id.toString()),
    ).map(
      e => ({
        id: e.id,
        destination: e.name,
      }),
    );

    next();
  }
};

module.exports = {
  setPathFromQuery,
  setMemberFromQuery,
  findProperDestinations,
};
