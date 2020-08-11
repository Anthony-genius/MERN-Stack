const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Stakeholder = mongoose.model('Stakeholder', new Schema({
  name: String,
  imgUrl: String,
  hoverText: String,
  linkUrl: String,
}), 'stakeholder');

module.exports = { Stakeholder };
