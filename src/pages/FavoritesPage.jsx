import React, { useState, useEffect } from "react";
import MovieCard from "../components/MovieCard";
import EmptyFavorites from "../components/EmptyFavorites";

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(stored);
  }, []);

  return (
    <div className="container">
      <h2 style={{ marginBottom: "20px" }}>⭐ Your Favorites</h2>
      {favorites.length === 0 ? (
        <EmptyFavorites />
      ) : (
        <div
          className="movie-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gridTemplateRows: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: 18,
          }}
        >
          {favorites.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;
