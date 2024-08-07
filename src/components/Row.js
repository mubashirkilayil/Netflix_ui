import React, { useState, useEffect } from 'react';
import './Row.css';
import instance from '../instance';

const base_url = 'https://image.tmdb.org/t/p/original/';

function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const request = await instance.get(fetchUrl);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);

//   console.log('our data is', movies);

  return (
    <div className='row'>
      <h2>{title}</h2>
      <div className="row__posters">
        {movies.map((movie) => (
          <div key={movie.id} className='row__movie'>
            <img
              className={`row__poster ${isLargeRow && "row__poster_large"}`}
              src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
              alt={movie.name || movie.title}
            />
            <h6 className="
            ">{movie.name || movie.title}</h6>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Row;
