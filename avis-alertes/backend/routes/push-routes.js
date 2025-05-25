import express from 'express';
import fetch from 'node-fetch';
import { sendPushNotification } from '../utils/push-service.js';
import Subscription from '../models/Subscription.js';
import Notification from '../models/Notification.js';

const router = express.Router();
const API_URL_GEOJSON = "https://donnees.montreal.ca/dataset/556c84af-aebf-4ca9-9a9c-2f246601674c/resource/d249e452-46f5-422f-91ae-898c98eea6cc/download/avis-alertes.geojson"

router.get('/alerts', async (req, res) => {
    console.log('Received alerts request');

    try {
        const response = await fetch(API_URL_GEOJSON);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const json = await response.json();
        const alerts = json.features.map((feature, index) => ({
            ...feature.properties,
            geometry: feature.geometry,
            id: index
        }));

        res.status(200).json(alerts.reverse());
    } catch (error) {
        console.error('Error fetching alerts:', error.message);
    res.status(500).json({ message: 'Error fetching alerts', error: error.message });
    }
});


router.post('/subscribe', async (req, res) => {
    console.log('Received subscription request:', req.body);

    const subscription = req.body;

    try {
        const existingSubscription = await Subscription.findOne({ endpoint: subscription.endpoint });
        if (existingSubscription) {
            console.log('/!\\ Subscription already exists in DB:', subscription.endpoint);
            return res.status(200).json({ message: 'Already subscribed' });
        }

        await Subscription.create({
            endpoint: subscription.endpoint,
            keys: {
                p256dh: subscription.keys.p256dh,
                auth: subscription.keys.auth
            },
            preferences: subscription.preferences || {}
        });

        console.log('=> New subscription added and saved to DB:', subscription);
        res.status(201).json({ message: 'Subscribed' });
    } catch (error) {
        console.error('Error saving subscription to DB:', error);
        res.status(500).json({ message: 'Error saving subscription' });
    }
});

router.post('/send-notification', async (req, res) => {
    console.log('Received notification request:', req.body);

    const { title, body } = req.body;
    const payload = { title, body };

    try {
        const subscriptions = await Subscription.find();
        console.log('Payload:', payload);

        const results = await Promise.allSettled(
            subscriptions.map(sub => sendPushNotification(sub, payload))
        );

        let successCount = 0;
        let errorCount = 0;

        for (let i = 0; i < results.length; i++) {
            const result = results[i];
            const subscription = subscriptions[i];
            if (result.status === 'fulfilled') {
                successCount++;
                console.log(`Notification sent to ${subscription.endpoint}`);
            } else {
                errorCount++;
                console.error(`Failed to send notification to ${subscription.endpoint}:`, result.reason);

                await Notification.create({
                    title,
                    body,
                    success: false,
                    error: result.reason.message
                });
            }
        }

        res.status(200).json({ message: 'Push sent', successCount, errorCount });
    } catch (error) {
        console.error('Error sending notification:', error);
        res.status(500).json({ message: 'Error sending notification' });
    }
});

router.post('/unsubscribe', async (req, res) => {
    console.log('Received unsubscribe request:', req.body);

    const { endpoint } = req.body;

    if (!endpoint) {
        console.error('No endpoint provided for unsubscription');
        return res.status(400).json({ message: 'No endpoint provided' });
    }

    try {
        const result = await Subscription.deleteOne({ endpoint });
        if (result.deletedCount === 0) {
            console.log('/!\\ Subscription not found in DB:', endpoint);
            return res.status(404).json({ message: 'Subscription not found' });
        }

        console.log('=> Subscription removed from DB:', endpoint);
        res.status(200).json({ message: 'Unsubscribed' });
    } catch (error) {
        console.error('Error removing subscription from DB:', error);
        res.status(500).json({ message: 'Error removing subscription' });
    }
});

export default router;
