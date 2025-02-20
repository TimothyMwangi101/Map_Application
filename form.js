function filterOnline() {
    for (let i = 0; i < markers.length; i++) {
        const status = markers[i].STATUS;
        if (status === "Offline") {
            markers[i].position = null;
        }  
    }
    document.getElementById('appliedFilter').textContent += "Online only Filter Active |";
}
function filter24hrs() {
    for (let i = 0; i < markers.length; i++) {
        const hours = markers[i].HOURS;
        if (hours !== "24 hours daily") 
            markers[i].position = null; 
    }
    
    document.getElementById('appliedFilter').innerText += "24 Hour Filter Active";
}
function filterHamiltonOnly() {
    for (let i = 0; i < markers.length; i++) {
        const location = markers[i].COMMUNITY;
        if (location !== "Hamilton") 
            markers[i].position = null;
    }
    document.getElementById('appliedFilter').innerText += "Hamilton Filter Active";
}
function filterNetworkFLO() {
    for (let i = 0; i < markers.length; i++) {
        const network = markers[i].NETWORK;
        if (network !== "FLO") 
            markers[i].position = null;
    }
    document.getElementById('appliedFilter').innerText += "FLO Filter Active";
}
function displayALL() {
    for (let i = 0; i < markers.length; i++) {
        markers[i].position = {
            lat: chargers[i].geometry.coordinates[1],
            lng: chargers[i].geometry.coordinates[0]
        }
    }
    document.getElementById('appliedFilter').innerText = "No Filters";
}
function displayPorts() {
    const ports = document.getElementById('ports');
    document.getElementById('portsValue').innerText = ports.value;
}   

//Adding onclicks
document.getElementById('online').addEventListener("click", filterOnline);
document.getElementById('hamilton').addEventListener('click', filterHamiltonOnly);
document.getElementById('24Hrs').addEventListener('click', filter24hrs);
document.getElementById('flo').addEventListener('click', filterNetworkFLO);
document.getElementById('all').addEventListener('click', displayALL);
document.getElementById('ports').addEventListener('click', displayPorts);
