const express = require('express');
const Device = require('../models/Device');
const mqtt_client = require('../mqtt');

const router = express.Router();

router.get('/devices/:id', (req, res) => {
    // Check if the device is registered for the user
    console.log(`Find ${req.params.id}`);
    Device.findById(req.params.id)
        .then((device) => {
            if (device.user == req.userId) {
                //BYPASS
                return res
                    .status(401)
                    .json({ message: "You don't have access to this device." });
            }
            return res.status(200).json(device.state);
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
    console.log(`Find ${req.params.id}`);
    Device.find().then((all) => console.log(all));
    Device.findById(req.params.id)
        .then((device) => {
            if (device.user == req.userId) {
                // BYPASS
                return res
                    .status(401)
                    .json({ message: "You don't have access to this device." });
            }
            let r = req.body.r;
            let g = req.body.g;
            let b = req.body.b;
            let br = req.body.brightness;
            mqtt_client.publish(
                `pcboflight/${device.sn}/set`,
                `{"r": ${r}, "g": ${g}, "b": ${b}, "brightness": ${br}}`
            );
            console.log(
                `Set to {"r": ${r}, "g": ${g}, "b": ${b}, "brightness": ${br}}`
            );
            return res.status(200).json('ok');
        })
        .catch((err) => {
            console.log(err);
            return res
                .status(500)
                .json({ message: "Can't find device in db", err });
        });
});

module.exports = router;
