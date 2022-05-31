// Using the Search icon onclick, we can search the movies card.
import React, { useState, useEffect } from "react";
import MovieCard from "./MovieCard";
import SearchIcon from "./search.svg";
import "./App.css";

//API key : 3ec333e6

const API_URL = "http://www.omdbapi.com?apikey=3ec333e6";

const App1 = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    searchMovies();
  }, []);

  const searchMovies = async (title) => {
    // console.log(title, "title");
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
    // console.log(data.Search, "data");
    setMovies(data.Search);
  };

  return (
    <div className="app">
      <div className="headContainer">
        <h1 className="header">MovieLand</h1>
      </div>

      <div className="search sticky">
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for movies"
        />
        <img
          src={SearchIcon}
          alt="search"
          onClick={() => searchMovies(searchTerm)}
        />
      </div>

      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No Movies found!</h2>
        </div>
      )}
    </div>
  );
};

export default App1;
