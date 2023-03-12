const express = require('express');
const Device = require('../models/Device');
const mqtt_client = require('../mqtt');

const router = express.Router();

router.get('/devices/:id', (req, res) => {
    // Check if the device is registered for the user
    console.log(`Find ${req.params.id}`);
    Device.find().then((items) => console.log(items));
    Device.findById(req.params.id)
        .then((device) => {
            if (device.user == req.userId) {
                return res
                    .status(401)
                    .json({ message: "You don't have access to this device." });
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
                    console.log(`message in ${topic}: ${message.toString()}`);
                    device.state = JSON.parse(message.toString());
                    device
                        .save()
                        .then(() => {
                            // Return state
                            console.log('Return state');
                            return res
                                .status(200)
                                .json(JSON.parse(message.toString()));
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
            mqtt_client.publish(`pcboflight/${device.sn}/set`, '{}');
        })
        .catch((err) => {
            return res.status(500).json("Can't find device in DB");
        });
});

router.post('/devices/:id', (req, res) => {
    // Check if the device is registered for th user OK
    // Subscribe to the update topic OK
    // Publish state on mqtt OK
    // Read state and store in DB OK
    // Unsubscribe OK
    // Return current state OK

    Device.findById(req.params.id)
        .populate('User')
        .then((device) => {
            if (device.user.id != req.userId) {
                return res
                    .status(401)
                    .json({ message: "You can't access this devices" });
            }
            mqtt_client.subscribe(`pcboflight/${device.sn}`, (err) => {
                if (err) {
                    return res
                        .status(500)
                        .json({ message: "Can't susbcribe to device", err });
                }
            });
            mqtt_client.on('message', (topic, message) => {
                if (topic == `pcboflight/${device.sn}`) {
                    console.log(`message in ${topic}: ${message.toString()}`);
                    device.state = JSON.parse(message.toString());
                    device
                        .save()
                        .then(() => {
                            // Return state
                            console.log('Return state');
                            return res
                                .status(200)
                                .json(JSON.parse(message.toString()));
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
            let r = req.body.state.r;
            let g = req.body.state.g;
            let b = req.body.state.b;
            let br = req.body.state.brightness;
            mqtt_client.publish(
                `pcboflight/${device.sn}/test`,
                `{"r": ${r}, "g": ${g}, "b": ${b}, "brightness": ${br}}`
            );
        })
        .catch((err) => {
            return res
                .status(500)
                .json({ message: "Can't find device in DB", err });
        });
});

module.exports = router;
