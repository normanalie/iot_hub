const express = require('express');

const router = express.Router();

router.get('/devices/:id', (req, res) => {
    // Check if the device is registered for the user
    // Subscribe to the update topic
    // Send an empty message to force device to publish state
    // Schedule a cron to unsubscribe
    // Read state and store in DB
    // Return state
});

router.post('/devices/:id', (req, res) => {
    // Check if the device is registered for th user
    // Subscribe to the update topic
    // Publish state on mqtt
    // Schedule a cron to unsubscribe
    // Read state and store in DB
    // Compare request state and current state
    // Return current state and comparasion
});
