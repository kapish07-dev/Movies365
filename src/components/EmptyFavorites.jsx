import React from "react";
import "./EmptyFavorites.css";

export default function EmptyFavorites() {
  return (
    <div className="empty-favorites">
      <img src="/empty-favorites.png" alt="No favorites" />
      <p>No favorites yet ⭐</p>
      <small>Start adding movies to your favorites list!</small>
    </div>
  );
}
