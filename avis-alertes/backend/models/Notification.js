import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
  title: { type: String },
  body: { type: String },
  date: { type: Date, default: Date.now },
  success: { type: Boolean, default: false },
  error: { type: String, default: null }
});

const Notification = mongoose.model('Notification', notificationSchema);

export default Notification;
