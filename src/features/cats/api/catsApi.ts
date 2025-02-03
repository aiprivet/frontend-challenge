export const getCats = async (page: number) => {
    const headers = new Headers({
        "Content-Type": "application/json",
        "x-api-key":
            "live_5hTraJRldIDUIiyzL3Ejeozdvv4LhhEAVcifjlZoCLfhkEI7AR4vmXIpPV84kITW",
    });

    const requestOptions = {
        method: "GET",
        headers: headers,
    };

    return await fetch(
        `https://api.thecatapi.com/v1/images/search?size=mde&mime_types=jpg&format=json&has_breeds=true&order=RANDOM&page=${page}&limit=15`,
        requestOptions
    );
};
