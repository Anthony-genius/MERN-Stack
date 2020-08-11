const baseAssessmentFocuses = require('./baseAssessmentFocusesJson');

const { BaseAssessmentFocus } = require('../models/BaseAssessmentFocus');
const { Sdg } = require('../models/Sdg');

const resolved = 0;
module.exports = {
  loadBaseAssessmentFocuses: mongoose =>
    new Promise((resolve) => {
      BaseAssessmentFocus.insertMany(baseAssessmentFocuses.map(({ sdgId, ...b }) => b)).then(
        (result) => {},
      );
    }),
  baseAssessmentFocuses,
};
