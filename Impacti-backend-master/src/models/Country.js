const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Country = mongoose.model('Country', new Schema({
  name: String,
  alpha2: String,
  sdgs: [{ type: Schema.Types.ObjectId, ref: 'Sdg' }],
}), 'country');

module.exports = { Country };
