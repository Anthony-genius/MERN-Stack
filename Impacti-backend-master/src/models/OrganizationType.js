const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const OrganizationType = mongoose.model('OrganizationType', new Schema({
  name: String,
}), 'organizationTypes');

module.exports = { OrganizationType };
