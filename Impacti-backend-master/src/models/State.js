const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const State = mongoose.model(
  'State',
  new Schema({
    route: String, // example: 'assessment'
    member: { type: Schema.Types.ObjectId, ref: 'Entity' },
    stage: String, // example: 'business-and-goals'
    step: String, // example: 'sustainability'
  }),
);

module.exports = { State };
