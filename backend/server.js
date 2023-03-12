require('dotenv').config({ path: '../.env' });
const express = require('express');
const mqtt = require('mqtt');
const app = express();
const mqtt_client = mqtt.connect(`mqtts://${process.env.MQTT_URL}`, {
    clientId: 'clientId-Q1djB2lxpm',
    clean: false,
    port: 8883,
    username: process.env.MQTT_USER,
    password: process.env.MQTT_PASSWORD,
});

mqtt_client.on('connect', (payload) => {
    console.log(payload);
    mqtt_client.subscribe('pcboflight/test', (err) => {
        if (err) {
            console.log(`[MQTT] Error, can't subscribe: ${err}`);
        } else {
            console.log(`[MQTT] Subscribed successfully`);
            mqtt_client.publish('pcboflight/test/set', 'Hello from server');
        }
    });
});

mqtt_client.on('message', (topic, buffer) => {
    const message = buffer.toString();
    console.log(`[MQTT] New message on <${topic}>: ${message}`);
});

mqtt_client.on('error', (error) => {
    console.log("Can't connect" + error);
});

console.log(`Connected ${mqtt_client.connected}`);

app.listen(3000, () => {
    console.log('[BACKEND] Listenning on http://localhost:3000/');
});
