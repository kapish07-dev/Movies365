import React from "react";
import "./NoResults.css";

export default function NoResults({ message = "No results found." }) {
  return (
    <div className="no-results">
      <img src="/no-results.png" alt="No results" />
      <p>{message}</p>
    </div>
  );
}
