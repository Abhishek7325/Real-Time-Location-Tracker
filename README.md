# Real-Time-Location-Tracker

## Overview

This project is a real-time location tracking system that utilizes geolocation, WebSockets, and QR-based device pairing to track connected users and display their movement on a live map. It uses Node.js, Express, Socket.io, and Leaflet.js for server-client communication and map rendering with enhanced interactivity.

## Features

Real-time location tracking across multiple devices
Unique QR code-based connection for device pairing
Distinct markers for admin (laptop) and users (phones)
Color-coded movement paths per user
Interactive map with live marker updates
Visibility restrictions: admin sees all, users only see their own
Auto marker removal on disconnect

## Technologies Used

Node.js
Express.js
Socket.io
Leaflet.js
EJS (Embedded JavaScript templating)
Helmet (for HTTP security headers)

## Project Structure


```bash
.
├── public
│   ├── css
│   │   └── style.css
│   └── js
│       └── script.js
├── views
│   └── index.ejs
├── app.js
├── package.json
└── README.md
```

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/Abhishek7325/Real-Time-Location-Tracker.git
    ```
2. Navigate to the project directory:
    ```bash
    cd realtime-device-tracker
    ```
3. Install the dependencies:
    ```bash
    npm install

## Usage

Start the server:
node app.js
Open your web browser and navigate to:
http://localhost:3000
## tools

**Git**: Used to manage version control and collaborate on changes.
**npm**: Node’s package manager, used for handling all project dependencies.

# Working

## Backend

**Server Initialization**: The Express-based server initializes an HTTP connection and integrates Socket.io for real-time data handling.

**Socket.io Integration**: Upon client connection, a socket ID is created. Each device is identified uniquely and can be tracked or managed.

**QR-Based Identification**: Devices scan a unique QR code to establish connection and identity for tracking purposes.

**Geolocation Handling**: The server listens for incoming geolocation updates and distributes them to relevant clients.

**Admin/User Access Control**: Admin devices see all users and their paths, while regular users only view their own data and marker.

**Client Disconnection**: When users disconnect, the server removes their marker from the map in real-time and notifies the admin client.

## Frontend

**Geolocation Tracking**: Utilizes the browser’s Geolocation API to continuously monitor the user’s movement.

**Socket.io Client**: A real-time connection is established to send/receive location data.

**QR Scanning and Pairing**: A built-in QR scanner allows the user to initiate secure pairing with the tracking system.

**Map Rendering**: Leaflet.js generates a live map with distinct colored paths for each device. Each device's movement is traced visually.

**Real-time Marker Management**: Marker positions are continuously updated based on server broadcasts. Disconnected users are removed instantly.

**User Role-Based View**: The frontend dynamically renders markers and controls based on whether the device is an admin or a regular user.

## Conclusion

With real-time geolocation streaming, role-based visibility, and enhanced tracking visuals, this project offers a practical solution for monitoring multiple devices. It's lightweight, scalable, and easy to integrate into scenarios like delivery tracking, field team coordination, or campus monitoring.
