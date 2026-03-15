import React from "react";
import { Link } from "react-router-dom";

export default function MovieCard({ movie, addToFavorites }) {
  const poster =
    movie.Poster && movie.Poster !== "N/A" ? movie.Poster : "/placeholder.png";

  return (
    <div
      className="movie-card up-effect-max"
      style={{
        background: "var(--card)",
        borderRadius: 12,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <Link to={`/movie/${movie.imdbID}`} style={{ display: "block", flex: 1 }}>
        <img
          src={poster}
          alt={movie.Title}
          style={{
            width: "100%",
            height: 280,
            objectFit: "cover",
            display: "block",
          }}
        />
      </Link>

      <div
        className="movie-info"
        style={{
          padding: 8,
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <h3 style={{ fontSize: 15, margin: "0 0 2px" }}>{movie.Title}</h3>
        <p style={{ margin: 0, color: "var(--muted)", fontSize: 13 }}>
          {movie.Year}
        </p>
        <div
          style={{
            marginTop: "auto",
            display: "flex",
            gap: 8,
          }}
        >
          <button
            className="up-effect"
            onClick={() => addToFavorites(movie)}
            style={{
              padding: "4px 10px 8px 10px",
              marginTop: "8px",
              background: "transparent",
              border: "1px solid rgba(255,255,255,0.06)",
              color: "#fff",
              borderRadius: 8,
              fontWeight: 600,
            }}
          >
            ⭐ Favorite
          </button>

          <Link
            to={`/movie/${movie.imdbID}`}
            className="up-effect"
            style={{
              marginLeft: "auto",
              alignSelf: "center",
              color: "var(--accent)",
            }}
          >
            Details →
          </Link>
        </div>
      </div>
      {/* <div className="movie-info" style={{ padding: 8 }}>
        <h3 style={{ fontSize: 15, margin: "0 0 2px" }}>{movie.Title}</h3>
        <p style={{ margin: 0, color: "var(--muted)", fontSize: 13 }}>
          {movie.Year}
        </p>
        <div style={{ marginTop: 8, display: "flex", gap: 8 }}>
          <button
            className="up-effect"
            onClick={() => addToFavorites(movie)}
            style={{
              padding: "8px 8px",
              background: "transparent",
              border: "1px solid rgba(255,255,255,0.06)",
              color: "#fff",
              borderRadius: 8,
              fontWeight: 600,
            }}
          >
            ⭐ Favorite
          </button>
          <Link
            to={`/movie/${movie.imdbID}`}
            className="up-effect"
            style={{
              marginLeft: "auto",
              alignSelf: "center",
              color: "var(--accent)",
            }}
          >
            Details →
          </Link>
        </div>
      </div> */}
    </div>
  );
}
