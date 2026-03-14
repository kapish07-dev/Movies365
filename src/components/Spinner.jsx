import React from "react";
import "./Spinner.css";

export default function Spinner() {
  return (
    <div className="spinner-container" aria-label="Loading">
      <div className="spinner"></div>
    </div>
  );
}
