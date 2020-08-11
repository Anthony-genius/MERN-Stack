/* eslint-disable no-underscore-dangle */
const { Entity } = require('../../models/Entity');

const {
  notFound,
  missingParameters,
  databaseFail,
} = require('../../helpers/errors');

const validate = (req, res, next) => {
  if (
    Array.isArray(req.body.types) &&
    Array.isArray(req.body.countries) &&
    Array.isArray(req.body.sdgs) &&
    Array.isArray(req.body.tags) &&
    Array.isArray(req.body.sectors) &&
    Array.isArray(req.body.industries) &&
    Array.isArray(req.body.baseAssessmentAnswers) &&
    Array.isArray(req.body.customChallenges) &&
    Number.isInteger(req.body.workersNumber) &&
    req.body.name &&
    req.body.description &&
    req.body.mission &&
    req.body.currency &&
    req.body.capacity
  ) {
    next();
  } else {
    res
      .status(missingParameters.status)
      .send({ message: missingParameters.message });
  }
};

const get = (req, res, next) => {
  Entity.findById(req.memberId)
    .then(({ id }) => {
      req.memberId = id;
      next();
    })
    .catch(() => res.sendStatus(500));
};

const getAll = (req, res) => {
  Entity.find()
    .populate({
      path: 'manager',
      select: 'username image organization',
      populate: { path: 'organization' },
    })
    .populate('countries')
    .populate('sectors')
    .populate('industries')
    .populate('sdgs')
    .populate('baseAssessmentAnswers.sdg')
    .populate('baseAssessmentAnswers.baseAssessmentFocuses')
    .then((result) => {
      res.status(200).json(result);
    })
    .catch(() => res.sendStatus(500));
};

const update = (req, res, next) => {
  Entity.findByIdAndUpdate(req.memberId, req.body, { new: true })
    .then(() => next())
    .catch(e => res.send(e));
};

const save = (req, res, next) => {
  const member = new Entity();

  member
    .save()
    .then((saved) => {
      req.memberId = saved.id;
      next();
    })
    .catch(e => console.log(e));
};

const copyFields = (member, children) => ({
  id: member.id,
  children,
  name: member.name,
  customChallenges: member.customChallenges,
  description: member.description,
  parent: member.parent,
  countries: member.countries,
  sdgs: member.sdgs,
  tags: member.tags,
  drivers: member.drivers,
  stakeholders: member.stakeholders,
  sectors: member.sectors,
  types: member.types,
  workersNumber: member.workersNumber,
  capacity: member.capacity,
  currency: member.currency,
  industries: member.industries,
  baseAssessmentAnswers: member.baseAssessmentAnswers,
  paths: member.paths,
  destinations: member.destinations,
  mission: member.mission,
});

const populate = member =>
  new Promise((resolve, reject) => {
    if (member) {
      Entity.find({
        parent: member._id, // eslint rule disabled for this line to use mongo id
      })
        .populate('manager')
        .populate('currency')
        .populate('parent')
        .populate('description')
        .populate('customChallenges')
        .populate('workersNumber')
        .populate('sectors')
        .populate('industries')
        .populate('types')
        .populate('countries')
        .populate('sdgs')
        .populate('tags')
        .populate('drivers')
        .populate('stakeholders')
        .populate('baseAssessmentAnswers')
        .populate('capacity')
        .populate('paths')
        .populate('destinations')
        .populate('mission')
        .then((children) => {
          if (children.length) {
            Promise.all(children.map(e => populate(e))).then((values) => {
              resolve(copyFields(member, values));
            });
          } else {
            resolve(copyFields(member, []));
          }
        });
    } else {
      reject();
    }
  });

const checkRootMember = (req, res, next) => {
  Entity.findOne({ _id: req.memberId }).then((member) => {
    if (member.parent) {
      next();
    } else {
      req.user.organization.rootMember = member._id;
      req.user.organization.save();
      next();
    }
  });
};

const checkUserIsOwner = (req, res, next) => {
  if (req.user.organization.rootMember.toString() === req.params.id) {
    req.memberId = req.params.id;
    return next();
  }
  res.sendStatus(401);
};

const setMemberFromPath = (req, res, next) => {
  req.memberId = req.params.id;

  Entity.findOne({ _id: req.memberId })
    .populate('destinations')
    .populate('countries')
    .then((member) => {
      req.member = member;
      next();
    })
    .catch(() => {
      res
        .status(missingParameters.status)
        .send({ message: missingParameters.message });
    });
};

const setMemberFromToken = (req, res, next) => {
  req.memberId = req.user.organization.rootMember;
  next();
};

const serialize = (req, res) => {
  Entity.findOne({ _id: req.memberId })
    .populate('manager')
    .populate('currency')
    .populate('parent')
    .populate('customChallenges.sdg')
    .populate('customChallenges')
    .populate({
      path: 'sectors',
      populate: [{ path: 'leadershipSdgs' }, { path: 'opportunitySdgs' }],
    })
    .populate('industries')
    .populate('types')
    .populate({
      path: 'countries',
      populate: { path: 'sdgs' },
    })
    .populate('sdgs')
    .populate('tags')
    .populate('drivers')
    .populate('stakeholders')
    .populate('baseAssessmentAnswers.sdg')
    .populate('baseAssessmentAnswers.baseAssessmentFocuses')
    .populate('capacity')
    .populate('paths')
    .populate('destinations')
    .then(result => populate(result))
    .then((tree) => {
      res.send(tree);
    })
    .catch(() =>
      res.status(notFound.status).send({ message: notFound.message }),
    );
};

const removeMember = (req, res, next) => {
  req.member
    .remove()
    .then(() => {
      next();
    })
    .catch(() => {
      res.status(databaseFail.status).send({ message: databaseFail.message });
    });
};

module.exports = {
  validate,
  save,
  serialize,
  checkRootMember,
  checkUserIsOwner,
  setMemberFromToken,
  setMemberFromPath,
  removeMember,
  get,
  getAll,
  update,
};
