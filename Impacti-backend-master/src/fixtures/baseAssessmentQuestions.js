const baseAssessmentQuestions = require('./baseAssessmentQuestionsJson');

const { BaseAssessmentQuestion } = require('../models/BaseAssessmentQuestion');
const { Sdg } = require('../models/Sdg');

const resolved = 0;
module.exports = {
  loadBaseAssessmentQuestions: mongoose =>
    new Promise((resolve) => {
      BaseAssessmentQuestion.insertMany(baseAssessmentQuestions.map(({ sdgs, ...b }) => b)).then(
        (result) => {},
      );
    }),
  baseAssessmentQuestions,
};
