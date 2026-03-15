import React from "react";
import EmptyFavorites from "./EmptyFavorites";

export default function Favorites({ favorites = [], removeFromFavorites }) {
  return (
    <aside
      className="favorites"
      style={{
        background: "var(--card)",
        borderRadius: 12,
        padding: 16,
        minWidth: 260,
        maxHeight: "126vh",
        overflowY: "auto",
      }}
    >
      <h2 style={{ marginBottom: 12 }}>Favorites ⭐</h2>

      {favorites.length === 0 ? (
        <EmptyFavorites />
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {favorites.map((movie) => {
            const poster =
              movie.Poster && movie.Poster !== "N/A"
                ? movie.Poster
                : "/placeholder.png";
            return (
              <div
                key={movie.imdbID}
                className="favorite-card"
                style={{ display: "flex", gap: 10, alignItems: "center" }}
              >
                <img
                  src={poster}
                  alt={movie.Title}
                  style={{
                    width: 52,
                    height: 74,
                    objectFit: "cover",
                    borderRadius: 6,
                  }}
                />
                <div style={{ flex: 1 }}>
                  <h4 style={{ margin: 0, fontSize: 14 }}>{movie.Title}</h4>
                  <p style={{ margin: 0, color: "var(--muted)", fontSize: 12 }}>
                    {movie.Year}
                  </p>
                </div>
                <button
                  className="btn"
                  onClick={() => removeFromFavorites(movie.imdbID)}
                  style={{
                    background: "var(--danger)",
                    color: "#fff",
                    borderRadius: 8,
                    padding: "6px 8px",
                    border: "none",
                  }}
                >
                  Remove
                </button>
              </div>
            );
          })}
        </div>
      )}
    </aside>
  );
}
