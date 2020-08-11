const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Path = mongoose.model(
  'Path',
  new Schema({
    order: Number,
    name: String,
    tag: String,
    description: String,
    displayColor: String,
    imagePath: String,
    shortDescription: String,
    iconLocation: String,
    tabs: [{ type: Schema.Types.ObjectId, ref: 'Tab' }],
    widgets: [{ type: String }],
  }),
  'path',
);

module.exports = { Path };
