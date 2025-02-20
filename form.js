
function appendBadge(text) {
    const span = document.createElement('span');
    span.className = "badge bg-secondary";
    span.innerHTML += text;
    document.getElementById('appliedFilter').appendChild(span);
}

function filterOnline() {
    for (let i = 0; i < markers.length; i++) {
        const status = markers[i].STATUS;
        if (status === "Offline") {
            markers[i].position = null;
        }  
    }
    appendBadge("Filter: Online");  
}
function filter24hrs() {
    for (let i = 0; i < markers.length; i++) {
        const hours = markers[i].HOURS;
        if (hours !== "24 hours daily") 
            markers[i].position = null; 
    }
    appendBadge("Filter: 24hrs");
}
function filterHamiltonOnly() {
    for (let i = 0; i < markers.length; i++) {
        const location = markers[i].COMMUNITY;
        if (location !== "Hamilton") 
            markers[i].position = null;
    }
    appendBadge("Filter: Hamilton");
}
function filterNetworkFLO() {
    for (let i = 0; i < markers.length; i++) {
        const network = markers[i].NETWORK;
        if (network !== "FLO") 
            markers[i].position = null;
    }
    appendBadge("Filer: FLO");
}
function displayALL() {
    document.getElementById('appliedFilter').innerHTML = "";
    for (let i = 0; i < markers.length; i++) {
        markers[i].position = {
            lat: chargers[i].geometry.coordinates[1],
            lng: chargers[i].geometry.coordinates[0]
        }
    }
    appendBadge("Filer: Display");
}
function displayPorts() {
    const ports = document.getElementById('ports');
    document.getElementById('portsValue').innerText = ports.value;
}   

