// const API_KEY = "7dfbc4ab"; // another OMDB key
const API_KEY = "4a3b711b"; 
const BASE_URL = "https://www.omdbapi.com/";

export async function fetchMovies(query) {
    if (!query) return [];

    try {
        const res = await fetch(`${BASE_URL}?apikey=${API_KEY}&s=${query}`);
        const data = await res.json();

        if (data.Response === "True") {
            return data.Search;
        } else {
            return [];
        }
    } catch (error) {
        console.error("Error fetching movies:", error);
        return [];
    }
}
