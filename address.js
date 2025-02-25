/**
 * @author Timothy Mwangi
 */

/**
 * Creates a new marker from the infomation gotten from the form
 */
function userSetAddress() {
    const address = document.getElementById('address').value;
    const geocoder = new google.maps.Geocoder();
    let position = { lat: null, lng: null };

    geocoder.geocode({ 'address': address }, function (results, status) {
        if (status === 'OK') {
            position.lat = results[0].geometry.location.lat();
            position.lng = results[0].geometry.location.lng();


            const radioStatus = document.getElementById('statusON').checked;
            const statusText = (radioStatus) ? "Online" : "Offline";
            const statusIcon = (radioStatus) ? "https://maps.google.com/mapfiles/kml/pal4/icon54.png" : "https://maps.google.com/mapfiles/kml/pal4/icon7.png";
            const ports = parseInt(document.getElementById('ports').value);
            const hours = document.getElementById('hours').value;
            const lot = document.getElementById('lot').value;
            const community = document.getElementById('community').value;
            const location = document.getElementById('locName').value;
            const network = document.getElementById('network').value;

            const marker = makeMarker(markers.length + 1, position, location, address, community, network, ports, statusText, hours, lot, statusIcon);

            if (foundGeolocation)
                displayMarkers(markers);
        } else
            window.alert('Geocode Failed');
    });
}
/**
 * For each marker, it creates an accordion item and appends it to the DOM
 * @param {AdvanceMarkerElement[]} markers The array of markers
 */
function displayMarkers(markers) {
    document.getElementById('accordion').innerHTML = "";
    for (let i = 0; i < markers.length; i++) {
        const marker = markers[i];
        const accordionItem = createAccordionItem(marker);
        document.getElementById('accordion').appendChild(accordionItem);
    }
}
/**
 * Creates an `accordion item` that stays open. It displays marker info and a `directions` to 
 * @param {AdvanceMarkerElement} marker A marker with properties that will create an accordion item
 * @returns {HTMLDivElement} A `div` with marker info as an accordion
 */
function createAccordionItem(marker) {

    const item = document.createElement('div');
    item.className = "accordion-item";
    const header = document.createElement('h2');
    header.className = "accordion-header";
    const button = document.createElement('button');
    button.className = "accordion-button collapsed fw-bold";
    button.textContent = marker.LOCATION;
    button.type = "button";
    button.setAttribute('data-bs-toggle', 'collapse');
    button.setAttribute('data-bs-target', `#address${marker.ID}`)
    button.ariaExpanded = "true";

    const destination = `${marker.ADDRESS}, ${marker.COMMUNITY}`;
    // console.log(typeof(destination));

    const container = document.createElement('div');
    container.className = "accordion-collapse collapse";
    container.id = `address${marker.ID}`;
    container.innerHTML = `
                <div class="accordion-body">
                    <h3>${marker.ID}: ${marker.LOCATION}</h3>
                    <p><strong class="badge bg-primary">${marker.STATUS}</strong></p>
                    <p><strong>Address:</strong> ${marker.ADDRESS}</p>
                    <p><strong>Community:</strong> ${marker.COMMUNITY}</p>
                    <p><strong>Ev Network:</strong> ${marker.NETWORK}</p>
                    <p><strong>No. Charging Ports:</strong> ${marker.PORTS}</p>
                    <p><strong>Hours:</strong> ${marker.HOURS}</p>
                    <button id="button${marker.ID}" class="btn btn-secondary btn-sm" onclick="calculateRoute('${destination}')">Direction</button>
                </div>`;
    header.appendChild(button);
    item.appendChild(header);
    item.appendChild(container);
    return item;
}
/**
 * Returns the path that the user should take to get to destination
 * @param {{lat: number, lng: number}} destination The coords of the position  
 * @param {string} [travelMode] Mode of travel 
 */
function calculateRoute(destination, travelMode = 'DRIVING') {
    //casing was wrong
    const directionsService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer({
        map: map
    });

    request = {
        origin: info.origin,
        destination: destination,
        travelMode: travelMode
    }

    directionsService.route(request, function (result, status) {
        if (status == "OK") {
            directionsRenderer.setDirections(result);
        }
    });
}