import React, { useState, useEffect } from 'react';
import instance from '../instance';
import requests from '../request';
import './Banner.css';

function Banner() {
  const base_url = 'https://image.tmdb.org/t/p/original/';
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const request = await instance.get(requests.fetchNetflixOriginals);
      setMovie(request.data.results[Math.floor(Math.random() * request.data.results.length - 1)]);
      return request;
    }
    fetchData();
  }, []);

    console.log('our banner is', movie);
    function truncate(str,n){
        return str?.length > n? str.substr(0,n-1)+"...":str;
    }
  return (
    <header
      className='banner'
      style={{
        backgroundSize: 'cover',
        backgroundImage: `url(${base_url}${movie?.backdrop_path})`,
        backgroundPosition: 'center center'
      }}
    >
      <div className='banner__contents'>
        <h1 className='banner__title'>
          {movie.title || movie.name || movie.original_name}
        </h1>
        <div className='banner__buttons'>
          <button className='banner__button'>Play</button>
          <button className='banner__button'>More Info</button>
        </div>
        <div className='banner_description'>{truncate(movie?.overview,150)}</div>
      </div>
    </header>
  );
}

export default Banner;
