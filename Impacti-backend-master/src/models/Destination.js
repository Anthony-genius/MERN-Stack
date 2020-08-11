const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Destination = mongoose.model('Destination', new Schema({
  name: String,
  description: String,
  subscriptionPlans: [{ type: Schema.Types.ObjectId, ref: 'SubscriptionPlan' }],
  recommendedPaths: [{ type: Schema.Types.ObjectId, ref: 'Path' }],
}), 'destination');


module.exports = { Destination };
