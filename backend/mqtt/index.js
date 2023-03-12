const mqtt = require('mqtt');

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

mqtt_client.on('message', (topic, buffer) => {
    const message = buffer.toString();
    console.log(`[MQTT] New message on <${topic}>: ${message}`);
    // TODO: Update object state in DB
});

mqtt_client.on('error', (error) => {
    console.log(`[MQTT] Error ${error}`);
});

module.exports = mqtt_client;
