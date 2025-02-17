const fetchAPIKEY = async () => {
    try {
        const response = await fetch('./API_KEY.json');   
        if (!response.ok) {
            throw new Error(`Error Fetching API KEY: ${response.status}`);
        }
        const json = await response.json();
        console.log(json)
        return await json.API_LINK;
    } catch (Error) {
        console.error("Fetch Error: " + error);
    }
}