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