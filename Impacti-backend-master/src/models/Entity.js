const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CustomFocus = new Schema({
  focusArea: String,
  sdgs: [{ type: Schema.Types.ObjectId, ref: 'Sdg' }],
  focusByPath: Array,
});

const BaseAssessmentAnswer = new Schema({
  sdg: { type: Schema.Types.ObjectId, ref: 'Sdg' },
  baseAssessmentFocuses: [{ type: Schema.Types.ObjectId, ref: 'BaseAssessmentFocus' }],
  customFocuses: [CustomFocus],
});

const CustomChallenge = new Schema({
  sdg: { type: Schema.Types.ObjectId, ref: 'Sdg' },
  text: { type: String },
});

const Entity = mongoose.model(
  'Entity',
  new Schema({
    name: { type: String },
    workersNumber: { type: Number },
    manager: { type: Schema.Types.ObjectId, ref: 'User' },
    currency: { type: Schema.Types.ObjectId, ref: 'Currency' },
    parent: { type: Schema.Types.ObjectId, ref: 'Entity' },
    description: { type: String },
    mission: { type: String },
    sectors: [{ type: Schema.Types.ObjectId, ref: 'Sector' }],
    industries: [{ type: Schema.Types.ObjectId, ref: 'Industry' }],
    types: [{ type: Schema.Types.ObjectId, ref: 'OrganizationType' }],
    countries: [{ type: Schema.Types.ObjectId, ref: 'Country' }],
    sdgs: [{ type: Schema.Types.ObjectId, ref: 'Sdg' }],
    drivers: [{ type: Schema.Types.ObjectId, ref: 'Driver' }],
    stakeholders: [{ type: Schema.Types.ObjectId, ref: 'Stakeholder' }],
    paths: [{ type: Schema.Types.ObjectId, ref: 'Path' }],
    destinations: [{ type: Schema.Types.ObjectId, ref: 'Destination' }],
    capacity: { type: Schema.Types.ObjectId, ref: 'Capacity' },
    baseAssessmentAnswers: [BaseAssessmentAnswer],
    customChallenges: [CustomChallenge],
  }),
);

module.exports = { Entity };
