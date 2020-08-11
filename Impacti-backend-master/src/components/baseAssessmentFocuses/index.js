const { BaseAssessmentFocus } = require('../../models/BaseAssessmentFocus');

const getFocuses = (req, res) => {
  BaseAssessmentFocus.find().then((focuses) => {
    res.status(200).json({ data: focuses });
  });
};

module.exports = {
  getFocuses,
};
