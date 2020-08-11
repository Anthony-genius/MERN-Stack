import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const SubscriptionPlan = mongoose.model('SubscriptionPlan', new Schema({
  name: String,
  description: String,
  price: Schema.Types.Number,
}), 'subscriptionPlan');


module.exports = { SubscriptionPlan };
