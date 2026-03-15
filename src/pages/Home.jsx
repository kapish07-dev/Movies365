import React, { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import MovieList from "../components/MovieList";
import Favorites from "../components/Favorites";
import Spinner from "../components/Spinner";
import NoResults from "../components/NoResults";
import "../App.css";

// const API_KEY = "4a3b711b";
const API_KEY = "7dfbc4ab";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState(() => {
    try {
      return localStorage.getItem("lastSearchTerm") || "";
    } catch {
      return "";
    }
  });

  const [movies, setMovies] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("lastMovies")) || [];
    } catch {
      return [];
    }
  });

  const [favorites, setFavorites] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("favorites")) || [];
    } catch {
      return [];
    }
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ⭐ Save favorites
  useEffect(() => {
    try {
      localStorage.setItem("favorites", JSON.stringify(favorites));
    } catch {}
  }, [favorites]);

  // ⭐ Save last search
  useEffect(() => {
    try {
      localStorage.setItem("lastSearchTerm", searchTerm);
      localStorage.setItem("lastMovies", JSON.stringify(movies));
    } catch {}
  }, [searchTerm, movies]);

  const fetchMovies = async (term) => {
    const query = (term || "").trim();
    if (!query) return;

    setLoading(true);
    setError("");
    setMovies([]);

    try {
      const res = await fetch(
        `https://www.omdbapi.com/?apikey=${API_KEY}&s=${encodeURIComponent(query)}`,
      );

      const data = await res.json();

      if (data.Response === "True") {
        // ⭐ Show only 8 movies on homepage
        const movieResults =
          query === "2025" ? data.Search.slice(0, 8) : data.Search;

        setMovies(movieResults);
        setError("");
      } else {
        setMovies([]);
        setError(data.Error || "No movies found.");
      }
    } catch {
      setMovies([]);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ⭐ Refresh homepage
  const refreshHomepage = () => {
    setSearchTerm("");
    setMovies([]);

    localStorage.removeItem("lastSearchTerm");
    localStorage.removeItem("lastMovies");

    fetchMovies("2025");
  };

  // ⭐ First load
  useEffect(() => {
    if (!searchTerm && movies.length === 0) {
      fetchMovies("2025");
    }
  }, []);

  const addToFavorites = (movie) => {
    if (!favorites.find((f) => f.imdbID === movie.imdbID)) {
      setFavorites((prev) => [movie, ...prev]);
    }
  };

  const removeFromFavorites = (id) => {
    setFavorites((prev) => prev.filter((m) => m.imdbID !== id));
  };

  const handleSearch = (term) => {
    const query = term.trim();

    setSearchTerm(query);

    if (query === "") {
      fetchMovies("2025");
    } else {
      fetchMovies(query);
    }
  };

  return (
    <div className="container">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1>Movie Search</h1>

        <button
          className="btn"
          onClick={refreshHomepage}
          style={{
            padding: "8px 16px",
            background: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Refresh Homepage
        </button>
      </div>

      <SearchBar onSearch={handleSearch} />

      {loading && <Spinner />}

      {error && !loading && <NoResults message={error} />}

      <div
        className="content"
        style={{
          display: "grid",
          gridTemplateColumns: "3fr 1fr",
          gap: 20,
        }}
      >
        <div className="movies">
          {movies.length > 0 && (
            <MovieList movies={movies} addToFavorites={addToFavorites} />
          )}
        </div>

        <Favorites
          favorites={favorites}
          removeFromFavorites={removeFromFavorites}
        />
      </div>
    </div>
  );
}
