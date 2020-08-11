const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Sector = mongoose.model(
  'Sector',
  new Schema({
    name: String,
    tag: String,
    industries: [{ type: Schema.Types.ObjectId, ref: 'Industry' }],
    opportunitySdgs: [{ type: Schema.Types.ObjectId, ref: 'Sdg' }],
    leadershipSdgs: [{ type: Schema.Types.ObjectId, ref: 'Sdg' }],
  }),
  'sector',
);

module.exports = { Sector };
