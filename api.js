/**
 * @author Timothy Mwangi - 000937691
 */

/**
 * Holds all functions needed to get the map API
 */
window.addEventListener('DOMContentLoaded', () => {
    
    /**
     * Fetches the API key from API KEY.json
     * @see {@link https://github.com/TimothyMwangi101/Map_Application/blob/main/REAMDME.md}
     * @returns {string} The API key
     */
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
    /**
     * Creates a `<script>` element and sets the `src` and `async` attributes
     * @param {string} key - API key @see{@link fetchAPIKEY}
     * @returns {Promise<HTMLScriptElement>} The maps API link script
     */
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
            //console.log(script) //Debugging
        });
    }
    
    /**
     * Main method in this event listener. 
     */
    (async () => {
        try {
            //🤡"'await' has no effect on the type of this expression" 🤡
            await createAPIScriptTag(await fetchAPIKEY());
            
        }catch(error) {
            console.error("Error:" + error);
        }
    })();
});
