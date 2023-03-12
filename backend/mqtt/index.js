const mqtt = require('mqtt');
const Device = require('../models/Device');

const mqtt_client = mqtt.connect(`mqtts://${process.env.MQTT_URL}`, {
    clientId: process.env.MQTT_ID || 'dev-server-196473',
    clean: false,
    port: process.env.MQTT_PORT || 8883,
    username: process.env.MQTT_USER || '',
    password: process.env.MQTT_PASSWORD || '',
});

mqtt_client.on('connect', (connack) => {
    mqtt_client.publish('test', 'Hello from server');
    console.log(`[MQTT] Connected ${mqtt_client.connected}`);
});

// Subscribe to the state topic
mqtt_client.subscribe('pcboflight/+', (err) => {
    if (err) {
        console.log(`[MQTT] Can't subscribe to pcboflight/+ : ${err}`);
    }
});

mqtt_client.on('message', (topic, buffer) => {
    const message = buffer.toString();
    console.log(`[MQTT] New message on <${topic}>: ${message}`);
    const devicetype = topic.split('/')[0];
    if (devicetype == 'pcboflight') {
        const sn = topic.split('/')[1]; // Topic format: pcboflight/<sn>
        Device.findOne({ sn })
            .then((device) => {
                device.state = JSON.parse(message);
                device.save();
                console.log(
                    `[MQTT] Update device ${device.id} with state ${message}`
                );
            })
            .catch((err) => {
                console.log(`[MQTT] ERROR Can't find device in DB: ${error}`);
            });
    }
});

mqtt_client.on('error', (error) => {
    console.log(`[MQTT] Error ${error}`);
});

module.exports = mqtt_client;
