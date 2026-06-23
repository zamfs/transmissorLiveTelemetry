# Assetto Corsa Telemetry Transmitter

## Overview
This repository contains the backend service for the **Live Telemetry** dashboard. It is a lightweight Node.js server that acts as a real-time bridge between Assetto Corsa and the web-based frontend application.

Since web browsers cannot natively listen to local UDP ports for security reasons, this transmitter solves the problem by receiving the raw UDP telemetry data from the game and broadcasting it securely via WebSockets to the web dashboard.

## Architecture
1. **Assetto Corsa (Python Script):** Reads the game's shared memory data and sends it via UDP to `127.0.0.1:9996`.
2. **Telemetry Transmitter (This Node.js App):** Listens to UDP port `9996` and parses the incoming JSON payloads.
3. **Socket.io Server:** Broadcasts the parsed telemetry data on `localhost:3000`.
4. **Web Dashboard:** The remote web application connects to this local WebSocket server to render track maps, tyre data, and car physics in real-time.

---

## Prerequisites
If you are running the source code directly, you will need:
* [Node.js](https://nodejs.org/) (v14 or higher)

*(Note: If you are using the pre-compiled `.exe` standalone version, no installation is required. You can find it here: https://drive.google.com/file/d/15WCacnMPL4BgfJvhaQsOyZD5ZDxrf55e/view?usp=sharing).*

## Installation
1. Clone this repository or download the source code.
2. Open your terminal in the project directory.
3. Install the required WebSocket dependencies:
   ```bash
   npm install