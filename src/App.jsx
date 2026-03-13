// services/api.jsx is optional
import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import MovieDetails from "./pages/MovieDetails";
import FavoritesPage from "./pages/FavoritesPage";
import "./App.css";

function App() {
  return (
    <div className="app">
      {/* Header with navigation */}
      <header className="app-header">
        <div className="container header-inner">
          <Link to="/" className="logo">
            🎬 KapixxMovies.io
          </Link>
          <nav className="header-nav">
            <Link className="up-effect" to="/">Home</Link>
            <Link className="up-effect" to="/favorites">Favorites</Link>
          </nav>
        </div>
      </header>

      {/* Main routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/favorites" element={<FavoritesPage />} />
      </Routes>

      {/* Footer */}
      <footer className="app-footer">
        <div className="container">
          <p>Made with 🧠 using React + OMDB API</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
