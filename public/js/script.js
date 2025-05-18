// Check if the browser supports geolocation.
// Set options for high accuracy, a 5-second timeout, and no caching.
// Use watchPosition to track the users location continuously.
// Emit the latitude and longitude via a socket with "send-location". Log any errors to the console
// Initialize a map centered at coordinates (0, 0) with a zoom level of 15 using Leaflet. Add OpenStreetMap tiles to the map
// Create an empty object markers.
// When receiving location data via the socket, extract id, latitude, and longitude, and center the map on the new coordinates.
// If a marker for the id exists, update its position, otherwise, create a new marker at the given coordinates and add it to the map. When a user disconnects, remove their marker from the map and delete it from markers.

let selectedUserId = null;
const socket = io();

const map = L.map("map").setView([0, 0], 10);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "Abhishek Rawat",
}).addTo(map);

const markers = {};
const users = new Set();

if (navigator.geolocation) {
    navigator.geolocation.watchPosition(
        (position) => {
            const { latitude, longitude } = position.coords;
            socket.emit('send-location', { latitude, longitude });
        },
        (error) => {
            console.error(error);
        },
        {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        }
    );
}


const miniMapContainer = document.createElement("div");
miniMapContainer.classList.add("mini-map");
document.getElementById("map-container").appendChild(miniMapContainer);


const miniMap = L.map(miniMapContainer, {
    attributionControl: false,
    zoomControl: false,
    dragging: false,
    scrollWheelZoom: false,
    doubleClickZoom: false,
    boxZoom: false,
    keyboard: false,
    tap: false
}).setView([0, 0], 15);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(miniMap);


function fitAllMarkers() {
    const allMarkers = Object.values(markers);
    if (allMarkers.length > 0) {
        const group = L.featureGroup(allMarkers);
        map.fitBounds(group.getBounds().pad(0.3));
    }
}


function updateUserList() {
    const list = document.getElementById("user-list");
    list.innerHTML = "";

    users.forEach((id) => {
        const li = document.createElement("li");
        li.textContent = id;

        if (id === selectedUserId) {
            li.classList.add("active-user");
        }

        li.addEventListener("click", () => {
            selectedUserId = id;
            updateUserList();

            if (markers[id]) {
                const latLng = markers[id].getLatLng();
                map.setView(latLng, 17, { animate: true });
                markers[id].openPopup();
            }
        });

        list.appendChild(li);
    });
}


socket.on("receive-location", (data) => {
    const { id, latitude, longitude } = data;

    if (!users.has(id)) {
        users.add(id);
        updateUserList();
    }

    if (markers[id]) {
        markers[id].setLatLng([latitude, longitude]);
    } else {
        const marker = L.marker([latitude, longitude]).addTo(map);
        marker.bindPopup(`<b>User ID:</b> ${id}`);
        marker.on("mouseover", () => {
            miniMap.setView([latitude, longitude], 15);
            miniMapContainer.style.display = "block";
        });
        marker.on("mouseout", () => {
            miniMapContainer.style.display = "none";
        });
        markers[id] = marker;
        fitAllMarkers();
    }
});


socket.on("user-disconnected", (data) => {
    const id = data.id;

    if (markers[id]) {
        map.removeLayer(markers[id]);
        delete markers[id];
    }

    if (users.has(id)) {
        users.delete(id);
        updateUserList();
    }

    fitAllMarkers();
});
