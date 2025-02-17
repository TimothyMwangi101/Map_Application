const fetchAPIKEY = async () => {
    try {
        const response = await fetch('./API KEY.json');   
        if (!response.ok) {
            throw new Error(`Error Fetching API KEY: ${response.status}`);
        }
        const json = await response.json();
        return json.key;
    } catch (error) {
        console.error("Fetch Error: " + error);
    }
}
const createAPIScriptTag = async (key) => {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${key}&loading=async&callback=initMap&libraries=marker`;
        script.async = true;
        script.onload = () => {
            resolve();
        };
        script.addEventListener('error', () => {
            reject(new Error("Couldnt append map script"))
        });
        document.head.appendChild(script);
        console.log(script.src)
    });
}