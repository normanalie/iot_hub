const express = require('express');
const Device = require('../models/Device');
const mqtt_client = require('../mqtt');

const router = express.Router();

router.get('/devices/:id', (req, res) => {
    // Check if the device is registered for the user
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
    Device.findById(req.params.id)
        .then((device) => {
            if (device.user == req.userId) {
                // BYPASS
                return res
                    .status(401)
                    .json({ message: "You don't have access to this device." });
            }
            let data = '{';
            data += 'r' in req.body ? `"r":${req.body.r}` : '';
            data += 'g' in req.body ? `"g":${req.body.g}` : '';
            data += 'b' in req.body ? `"b":${req.body.b}` : '';
            data +=
                'brightness' in req.body
                    ? `"brightness":${req.body.brightness}`
                    : '';
            data += 'is_on' in req.body ? `"is_on":${req.body.is_on}` : '';
            data += '}';
            mqtt_client.publish(`pcboflight/${device.sn}/set`, data);
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
