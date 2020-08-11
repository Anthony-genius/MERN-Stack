const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Organization = mongoose.model('Organization', new Schema({
  owner: { type: Schema.Types.ObjectId, ref: 'User' },
  rootMember: { type: Schema.Types.ObjectId, ref: 'Entity' },
}));

module.exports = { Organization };
