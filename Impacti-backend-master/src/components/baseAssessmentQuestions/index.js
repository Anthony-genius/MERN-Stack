const { BaseAssessmentQuestion } = require('../../models/BaseAssessmentQuestion');

const getQuestions = (req, res) => {
  BaseAssessmentQuestion.find().then((questions) => {
    res.status(200).json({ data: questions });
  });
};

module.exports = {
  getQuestions,
};
