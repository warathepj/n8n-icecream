# Room Temperature Monitor

A Node.js application that monitors room temperature data using MQTT and automatically logs it to Google Sheets via n8n automation.

## Overview

This project consists of two main components:

1. A temperature simulator that generates and publishes random temperature readings
2. A server that receives the temperature data and forwards it to n8n for Google Sheets integration

## Prerequisites

- Node.js (v16.0.0 or higher)
- n8n instance running locally or hosted
- Google account for Google Sheets integration

## Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

## Configuration

### MQTT Settings

Both the simulator and server use these MQTT settings:

- Broker: test.mosquitto.org
- Topic: corgidev/room/temperature (The topic name should be changed to unique because Broker: test.mosquitto.org is public and used for testing only.)
- Protocol: mqtt (unencrypted)

### Webhook Configuration

The server forwards data to an n8n webhook. Update the webhook URL in `server.js`:

```javascript
const webhookUrl = "your-webhook-url";
```

## Usage

1. Start the temperature simulator:

```bash
node simulator.js
```

2. Start the server in a separate terminal:

```bash
node server.js
```

## n8n Workflow Setup

1. Create a new workflow in n8n
2. Add a Webhook node:

   - Method: POST
   - Path: your-webhook-url
   - Response: JSON

3. Add a Google Sheets node:

   - Operation: Append
   - Sheet ID: Your Google Sheet ID
   - Range: Sheet name and range (e.g., 'Sheet1!A:C')
   - Fields to map:
     - Temperature
     - Timestamp

4. Connect the nodes and activate the workflow

## Data Format

The temperature data is sent in JSON format:

```json
{
  "temperature": 28.45,
  "timestamp": "10:30:15 AM",
  "unit": "celsius"
}
```

## License

MIT
