/* Using the debounce() function, we can search the moviescard automatically without onclick or pressing enter key. 
It means debounce() can make some delay to hit the api call.
So it can wait untill the user can type any value in the input box.
*/
import React, { useState } from "react";
import MovieCard from "./MovieCard";
import "./App.css";

//API key : 3ec333e6

const API_URL = "https://www.omdbapi.com?apikey=3ec333e6";

const App = () => {
  const [movies, setMovies] = useState([]);

  const debounce = (func, delay) => {
    let debounceTimer;
    return function () {
      const context = this;
      const args = arguments;
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => func.apply(context, args), delay);
    };
  };

  const handleText = debounce(async function (e) {
    console.log(e.target.value,"target value");
    const response = await fetch(`${API_URL}&s=${e.target.value}`);
    const data = await response.json();
    console.log(data.Search, "data");
    setMovies(data.Search);
  }, 1000);

  return (
    <div className="app">
      <div className="headContainer">
        <h1 className="header">MovieLand</h1>
      </div>

      <div className="search sticky">
        <input
          onChange={(e) =>{ e.persist(); handleText(e);}}
          placeholder="Search for movies"
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

export default App;
