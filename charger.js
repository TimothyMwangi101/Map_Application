/**
 * @author Timothy Mwangi - 000937691
 */
// import { chargers } from "./chargers";
// const chargers = require("./chargers");
const fetchChargerInfo = async () => {
    try {
        const response = await fetch('./chargers.json');   
        if (!response.ok) {
            throw new Error(`Error Fetching Charger json: ${response.status}`);
        }
        const json = await response.json();
        return json;
    } catch (error) {
        console.error("Fetch Error: " + error);
        return;
    }
}

function displayChargerInfo(chargers) {

    let position = {lat: 0, lng: 0};
    let iconSrc, location, network, lotName, address, ports, status, hours, community;
    
    for (let i = 0; i < chargers.length; i++) {

        position.lat = chargers[i].geometry.coordinates[0];
        position.lng = chargers[i].geometry.coordinates[1];
        location = chargers[i].properties.LOCATION_NAME;
        lotName = chargers[i].properties.LOT_NAME;
        network = chargers[i].properties.EV_NETWORK;
        address = chargers[i].properties.ADDRESS;
        location = chargers[i].properties.LOCATION_NAME;
        ports = chargers[i].properties.TOTAL_CHARGING_PORTS;
        hours = chargers[i].properties.HOURS;
        community = chargers[i].properties.COMMUNITY;
        status = chargers[i].properties.STATUS;

        if (status === "Online") {
            iconSrc = "https://maps.google.com/mapfiles/kml/pal4/icon62.png";
        } else  
            iconSrc = "https://maps.google.com/mapfiles/kml/pal4/icon15.png";

    }
    return [position, iconSrc, location, network, lotName, address, ports, status, hours, community];
}
export async function runChargerScript() {
    try{
        let j = await fetchChargerInfo();
        console.log(j);
        const chargerInfo = displayChargerInfo(j);
        return chargerInfo;
    }catch(error) {
        console.error(error);
        return;
    }
}