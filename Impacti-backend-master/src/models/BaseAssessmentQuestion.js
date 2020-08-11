const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const BaseAssessmentQuestion = mongoose.model(
  'BaseAssessmentQuestion',
  new Schema({
    section: String,
    sectionIcon: String,
    sdgs: [{ type: Schema.Types.ObjectId, ref: 'Sdg' }],
    text: String,
    hoverText: String,
  }),
  'baseAssessmentQuestion',
);

module.exports = { BaseAssessmentQuestion };
