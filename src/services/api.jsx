// const API_KEY = "7dfbc4ab"; // OMDB key
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
// to use this, lower code is needed in home.jsx

// import React, { useState, useEffect } from "react";
// import SearchBar from "../components/SearchBar";
// import MovieList from "../components/MovieList";
// import { fetchMovies } from "../services/api"; // now this will work ✅

// export default function Home() {
//   const [movies, setMovies] = useState([]);
//   const [loading, setLoading] = useState(false);

//   // Default movies to load when search is empty
//   const defaultMovies = ["Inception", "Avengers", "Titanic", "Interstellar", "Joker"];

//   const loadDefaultMovies = async () => {
//     setLoading(true);
//     try {
//       const results = await Promise.all(
//         defaultMovies.map((title) => fetchMovies(title))
//       );

//       setMovies(results.flat().filter(Boolean));
//     } catch (err) {
//       console.error("Error loading default movies:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSearch = async (query) => {
//     if (!query) {
//       loadDefaultMovies();
//       return;
//     }

//     setLoading(true);
//     try {
//       const results = await fetchMovies(query);
//       setMovies(results || []);
//     } catch (err) {
//       console.error("Search error:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     loadDefaultMovies();
//   }, []);

//   return (
//     <div className="home-page">
//       <SearchBar onSearch={handleSearch} />

//       {loading ? (
//         <p>Loading...</p>
//       ) : movies.length > 0 ? (
//         <MovieList movies={movies} />
//       ) : (
//         <p>No movies found</p>
//       )}
//     </div>
//   );
// }
