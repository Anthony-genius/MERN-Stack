const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Capacity = mongoose.model('Capacity', new Schema({
  name: String,
}), 'capacity');

module.exports = { Capacity };
