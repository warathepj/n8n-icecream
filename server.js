// Import the MQTT client
const mqtt = require('mqtt');
const https = require('https');
const http = require('http');

// MQTT connection settings - using the same broker and topic as the simulator
const brokerUrl = 'mqtt://test.mosquitto.org';
const topic = 'corgidev/room/temperature';
const webhookUrl = 'your-webhook-url';

// Connect to the MQTT broker
const client = mqtt.connect(brokerUrl);

// Handle connection events
client.on('connect', () => {
    console.log('Connected to MQTT broker at test.mosquitto.org');
    
    // Subscribe to the temperature topic
    client.subscribe(topic, (err) => {
        if (!err) {
            console.log(`Subscribed to ${topic}`);
        } else {
            console.error('Subscription error:', err);
        }
    });
});

// Handle incoming messages
client.on('message', (topic, message) => {
    try {
        // Parse the JSON message
        const data = JSON.parse(message.toString());
        
        // Log the received data
        console.log('Received temperature data:');
        console.log(`Temperature: ${data.temperature}°C`);
        console.log(`Timestamp: ${data.timestamp}`);
        console.log(`Unit: ${data.unit}`);
        console.log('-------------------');
        
        // Forward to webhook
        const postData = JSON.stringify(data);
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(postData)
            }
        };

        const req = http.request(webhookUrl, options, (res) => {
            console.log(`Webhook response status: ${res.statusCode}`);
        });

        req.on('error', (error) => {
            console.error('Error forwarding to webhook:', error);
        });

        req.write(postData);
        req.end();
        
    } catch (error) {
        console.error('Error processing message:', error);
        console.error('Raw message:', message.toString());
    }
});

// Handle errors
client.on('error', (error) => {
    console.error('MQTT connection error:', error);
});

// Handle close event
client.on('close', () => {
    console.log('Connection to MQTT broker closed');
});

console.log('MQTT client started. Waiting for messages...');
