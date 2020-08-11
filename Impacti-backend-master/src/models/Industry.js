const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Industry = mongoose.model('Industry', new Schema({
  name: String,
}), 'industry');


module.exports = { Industry };
