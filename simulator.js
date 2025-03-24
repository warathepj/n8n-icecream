// Import the MQTT client
const mqtt = require('mqtt');

// MQTT connection settings
const brokerUrl = 'mqtt://test.mosquitto.org';
const topic = 'corgidev/room/temperature';
const client = mqtt.connect(brokerUrl);

// Generate a random number between 27 and 30 (inclusive)
function generateRandomTemperature() {
    // Math.random() generates a number between 0 (inclusive) and 1 (exclusive)
    // Multiply by the range (3) and add the minimum value (27)
    // Use Math.random() * (max - min + 1) + min for inclusive range
    return Math.random() * (30 - 27) + 27;
}

// Function to generate and display a random temperature
function updateTemperature() {
    const randomTemp = generateRandomTemperature();
    const timestamp = new Date().toLocaleTimeString();
    
    // Create a message object with temperature and timestamp
    const message = {
        temperature: parseFloat(randomTemp.toFixed(2)),
        timestamp: timestamp,
        unit: 'celsius'
    };
    
    // Convert the message object to JSON string
    const messageString = JSON.stringify(message);
    
    // Publish the message to the MQTT broker
    client.publish(topic, messageString);
    
    console.log(`Random temperature: ${randomTemp.toFixed(2)}°C`);
    console.log(`Time: ${timestamp}`);
    console.log(`Published to ${topic}`);
    console.log('-------------------');
}

// Handle MQTT connection events
client.on('connect', () => {
    console.log('Connected to MQTT broker at test.mosquitto.org');
    
    // Generate temperature immediately on start
    updateTemperature();
    
    // Then generate a new temperature every 5 seconds
    setInterval(updateTemperature, 5000);
});

client.on('error', (error) => {
    console.error('MQTT connection error:', error);
});

// If you want an integer value instead, you can use:
// const randomTempInt = Math.floor(Math.random() * (30 - 27 + 1)) + 27;
// console.log(`Random temperature (integer): ${randomTempInt}°C`);