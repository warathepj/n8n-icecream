# Ice Cream Storage Temperature Monitor

A Node.js application that monitors freezer temperature and sends alerts via Telegram when temperature rises above safe levels for ice cream storage (-12°C).

## System Overview

This system consists of:

- Temperature simulator (`simulator.js`) - Generates random temperature data
- MQTT broker (test.mosquitto.org) (for test only!!!) - Handles message routing
- Server (`server.js`) - Processes temperature data and forwards to n8n
- n8n workflow - Handles temperature threshold checks and Telegram notifications

## Prerequisites

- Node.js 16.0.0 or higher
- n8n instance running on port 5678
- Telegram bot token and chat ID
- MQTT broker access (using test.mosquitto.org)

## Installation

1. Clone the repository:

```bash
git clone https://github.com/warathepj/n8n-icecream.git
cd n8n-icecream
```

2. Install dependencies:

```bash
npm install
```

3. Configure n8n:
   - Import the workflow
   - Set up Telegram node with your bot credentials
   - Update webhook URL in `server.js` if needed

## Usage

1. Start the temperature simulator:

```bash
node simulator.js
```

2. Start the server:

```bash
node server.js
```

## How It Works

1. `simulator.js` generates random temperature readings between -20°C and -8°C
2. Data is published to MQTT topic: `corgidev/room/temperature` (Must change to unique topic)
3. `server.js` subscribes to the topic and forwards data to n8n webhook
4. n8n workflow:
   - Checks if temperature > -12°C
   - Sends Telegram alert if temperature is unsafe
   - Safe temperature range: -20°C to -12°C

## Alert Conditions

- Temperature > -12°C: ALERT (unsafe for ice cream storage)
- Temperature ≤ -12°C: OK (safe zone)

## License

MIT License - see [LICENSE](LICENSE) file for details

## Author

warathepj
