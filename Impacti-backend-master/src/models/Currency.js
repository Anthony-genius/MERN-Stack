const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Currency = mongoose.model('Currency', new Schema({
  name: String,
  shortName: String,
}), 'currency');

module.exports = { Currency };
