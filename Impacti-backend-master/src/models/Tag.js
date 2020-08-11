const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Tag = mongoose.model(
  'Tag',
  new Schema({
    label: { type: String, unique: true, required: true, minlength: 3 },
    userCreated: Boolean,
    createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
  }),
);

module.exports = { Tag };
