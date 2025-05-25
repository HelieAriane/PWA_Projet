import webpush from 'web-push';
import dotenv from 'dotenv';

dotenv.config();

const publicKey = process.env.VAPID_PUBLIC_KEY;
const privateKey = process.env.VAPID_PRIVATE_KEY;
const contactEmail = process.env.VAPID_CONTACT_EMAIL;

webpush.setVapidDetails(contactEmail, publicKey, privateKey);

export function sendPushNotification(subscription, payload) {
    return webpush.sendNotification(subscription, JSON.stringify(payload));
}
