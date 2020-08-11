const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const BaseAssessmentFocus = mongoose.model(
  'BaseAssessmentFocus',
  new Schema({
    focusArea: String,
    tag: String,
    sdgs: [{ type: Schema.Types.ObjectId, ref: 'Sdg' }],
    focusByPath: Array,
  }),
  'baseAssessmentFocus',
);

module.exports = { BaseAssessmentFocus };
