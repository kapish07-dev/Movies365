import React, { useState, useEffect, useRef } from "react";
import "./SearchBar.css";

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus(); // auto focus on mount
    }
  }, []);

  const handleSearch = () => {
    const trimmed = query.trim();
    if (trimmed) onSearch(trimmed);
  };

  const handleClear = () => {
    setQuery("");
    onSearch(""); // also clear results
    if (inputRef.current) {
      inputRef.current.focus(); // re-focus after clearing
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
    if (e.key === "Escape") {
      handleClear();
    }
  };

  return (
    <div className="search-bar">
      <div className="input-wrapper">
        <input
          ref={inputRef}
          type="text"
          placeholder="Search movies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          className="search-input"
        />

        {query && (
          <button
            type="button"
            onClick={handleClear}
            aria-label="Clear search"
            className="clear-btn"
          >
            ×
          </button>
        )}
      </div>

      <button onClick={handleSearch} aria-label="Search" className="search-btn">
        Search
      </button>
    </div>
  );
}
