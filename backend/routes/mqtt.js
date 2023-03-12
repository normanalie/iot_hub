const express = require('express');
const Device = require('../models/Device');
const mqtt_client = require('../mqtt');

const router = express.Router();

router.get('/devices/:id', (req, res) => {
    // Check if the device is registered for the user
    Device.findById(req.params.id)
        .populate('user')
        .then((device) => {
            if (device.user._id != req.userId) {
                return res
                    .status(401)
                    .json("You don't have access to this device.");
            }
            // Subscribe to the update topic
            console.log('subscribe');
            mqtt_client.subscribe(`pcboflight/${device.sn}`, (err) => {
                if (err) {
                    return res.status(500).json({
                        message: "Can't susbcribe to MQTT topic.",
                        err,
                    });
                }
            });
            // Read state and store in DB
            console.log('On message');
            mqtt_client.on('message', (topic, message) => {
                if (topic == `pcboflight/${device.sn}`) {
                    console.log(`message in ${topic}: ${messgae}`);
                    device.state = JSON.parse(message);
                    device
                        .save()
                        .then(() => {
                            // Return state
                            console.log('Return state');
                            return res.status(200).json(JSON.parse(message));
                        })
                        .catch((err) => {
                            return res
                                .status(500)
                                .json({ message: 'Error saving state', err });
                        })
                        .finally(() => {
                            // Unsubscribe
                            console.log('Unsubscribe');
                            mqtt_client.unsubscribe(`pcboflight/${device.sn}`);
                        });
                }
            });
            // Send an empty message to force device to publish state
            console.log('Send empty');
            mqtt_client.publish(`pcboflight/${device.id}`, '{}');
        })
        .catch((err) => {
            return res.status(500).json("Can't find device in DB");
        });
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

module.exports = router;
