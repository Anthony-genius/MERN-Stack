const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Tab = mongoose.model('Tab', new Schema({
  name: String,
  widgets: [{ type: String }],
  isDefault: Schema.Types.Boolean,
  index: Number,
}), 'tab');

module.exports = { Tab };
