const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Sdg = mongoose.model('Sdg', new Schema({
  name: String,
  shortName: String,
  description: String,
  focusTitle: String,
  focusText: String,
  recoWhy: String,
  recoWhat: String,
  globalRank: Number,
  topSelected: Boolean,
}), 'sdg');

module.exports = { Sdg };
