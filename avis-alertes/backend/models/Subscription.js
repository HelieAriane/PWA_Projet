import mongoose from 'mongoose';

const subscriptionSchema = new mongoose.Schema({
  endpoint: { type: String, required: true, unique: true },
  keys: { p256dh: String, auth: String },
  subscribeAt: { type: Date, default: Date.now },
  preferences: {
    type: Object,
    default: {}
  }
});

const Subscription = mongoose.model('Subscription', subscriptionSchema);

export default Subscription;