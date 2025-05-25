const webpush = require('web-push');

const vapidKeys = webpush.generateVAPIDKeys();

console.log('VAPID Public Key:\n', vapidKeys.publicKey);
console.log('VAPID Private Key:\n', vapidKeys.privateKey);
