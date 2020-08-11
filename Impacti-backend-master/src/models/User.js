const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const User = mongoose.model(
  'User',
  new Schema({
    email: { type: String, unique: true, sparse: true },
    username: { type: String, unique: true, sparse: true },
    password: String,
    emailConfirmed: Boolean,
    reminderSent: Boolean,
    verificationCode: String,
    storage: Object,
    image: String,
    heroImage: String,
    organization: { type: Schema.Types.ObjectId, ref: 'Organization' },
    states: [{ type: Schema.Types.ObjectId, ref: 'State' }],
  }),
);

module.exports = { User };
