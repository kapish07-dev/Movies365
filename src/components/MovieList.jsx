import React from "react";
import MovieCard from "./MovieCard";

export default function MovieList({ movies = [], addToFavorites }) {
  return (
    <div
      className="movie-grid"
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
        gap: 18,
      }}
    >
      {movies.map((movie) => (
        <MovieCard
          key={movie.imdbID}
          movie={movie}
          addToFavorites={addToFavorites}
        />
      ))}
    </div>
  );
}
