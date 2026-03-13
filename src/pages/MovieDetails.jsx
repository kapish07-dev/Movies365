import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Spinner from "../components/Spinner";
import NoResults from "../components/NoResults";
import "../App.css";

const API_KEY = "4a3b711b";

export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) {
      setError("Invalid movie id.");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError("");
    setMovie(null);

    fetch(
      `https://www.omdbapi.com/?apikey=${API_KEY}&i=${encodeURIComponent(id)}&plot=full`,
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.Response === "True") {
          setMovie(data);
        } else {
          setError(data.Error || "Unable to fetch movie details.");
        }
      })
      .catch(() => setError("Something went wrong. Please try again."))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading)
    return (
      <div className="container">
        <Spinner />
      </div>
    );
  if (error)
    return (
      <div className="container">
        <NoResults message={error} />
      </div>
    );

  const poster =
    movie.Poster && movie.Poster !== "N/A" ? movie.Poster : "/placeholder.png";

  return (
    <div
      className="container"
      style={{ paddingTop: "3.5rem", paddingBottom: 40 }}
    >
      <Link
        to="/"
        style={{
          color: "var(--accent)",
          display: "inline-block",
          marginBottom: 16,
        }}
      >
        ← Back to search
      </Link>

      <div
        style={{ display: "grid", gridTemplateColumns: "280px 1fr", gap: 24 }}
      >
        <div
          style={{ background: "var(--card)", borderRadius: 12, padding: 12 }}
        >
          <img
            src={poster}
            alt={movie.Title}
            style={{ width: "100%", borderRadius: 8 }}
          />
        </div>

        <div>
          <h1 style={{ marginBottom: 8 }}>
            {movie.Title}{" "}
            <span style={{ color: "var(--muted)", fontSize: 14 }}>
              ({movie.Year})
            </span>
          </h1>
          <p style={{ color: "var(--muted)", marginTop: 6 }}>
            {movie.Genre} • {movie.Runtime} • {movie.Released}
          </p>

          <section style={{ marginTop: 18 }}>
            <h3>Plot</h3>
            <p style={{ color: "#ddd" }}>{movie.Plot}</p>
          </section>

          <section
            style={{
              marginTop: 12,
              display: "flex",
              gap: 16,
              flexWrap: "wrap",
            }}
          >
            <div>
              <strong>Director:</strong> {movie.Director}
            </div>
            <div>
              <strong>Writer:</strong> {movie.Writer}
            </div>
            <div>
              <strong>Actors:</strong> {movie.Actors}
            </div>
          </section>

          {movie.Ratings && movie.Ratings.length > 0 && (
            <section style={{ marginTop: 12 }}>
              <h3>Ratings</h3>
              <ul>
                {movie.Ratings.map((r) => (
                  <li key={r.Source} style={{ color: "var(--muted)" }}>
                    {r.Source}: {r.Value}
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
