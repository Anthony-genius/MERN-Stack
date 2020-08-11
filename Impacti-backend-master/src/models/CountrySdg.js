
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CountrySdg = mongoose.model(
  'CountrySdg',
  new Schema({
    country: String,
    sdgs: Array,
  }),
  'countrySdg',
);

module.exports = { CountrySdg };
