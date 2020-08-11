const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Driver = mongoose.model('Driver', new Schema({
  name: String,
  imgUrl: String,
  hoverText: String,
  linkUrl: String,
}), 'driver');

module.exports = { Driver };
