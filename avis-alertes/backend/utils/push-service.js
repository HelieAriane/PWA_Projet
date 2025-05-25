import webpush from 'web-push';

const publicKey = "BPRvd5Guryvbw3eMSZvId6edGBx3_VKRKmEsIMLK3rKTxPggSzL4KilmdCIsDXOOEP-B8dN-eMsXoCfNdu7qbL0";
const privateKey = "LXhW9vpIDNUh8cEJYgvvGNYJs1LGJdOii3Nyxbjc5mk";
const contactEmail = "mailto:arianehelie@gmail.com";

webpush.setVapidDetails(contactEmail, publicKey, privateKey);

export function sendPushNotification(subscription, payload) {
    return webpush.sendNotification(subscription, JSON.stringify(payload));
}
