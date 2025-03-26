import React, { useEffect, useRef, useState } from 'react';
import './TitleCards.css';
import { Link, useNavigate } from 'react-router-dom';
 import { FaHeart, FaRegHeart } from "react-icons/fa";
 import ReactPlayer from 'react-player';

 
export default function TitleCards({ title, category, idName }) {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0YWE3NDMzM2VhNmNjMTE4M2E4MjQ3YTkyMDNiZjNkZiIsIm5iZiI6MTczNzIxMzI2NS4xMjksInN1YiI6IjY3OGJjNTUxZGJjZmYzM2E5YzY0ZjQ1MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BSwce8BWbnOfO4l32I6NwC8psmNjKEgZqSv9l3UqSUo'
    }
  };

  const [apiData, setApiData] = useState([]);
  const [likedMovies, setLikedMovies] = useState([]);
  const [hoveredMovieId, setHoveredMovieId] = useState(null);
  const [trailerKey, setTrailerKey] = useState("");
  const cardsRef = useRef();
  const navigate = useNavigate(); 

  useEffect(() => {
    const storedLikedMovies = JSON.parse(localStorage.getItem('likedMovies')) || [];
    setLikedMovies(storedLikedMovies);
  }, []);

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${category ? category : "now_playing"}?language=en-US&page=1`, options)
      .then(res => res.json())
      .then(res => setApiData(res.results))
      .catch(err => console.error(err));
  }, [category]);

   const handleLike = (movie) => {
    const isLiked = likedMovies.some((likedMovie) => likedMovie.id === movie.id);
    let updatedLikedMovies;
    if (isLiked) {
     updatedLikedMovies = likedMovies.filter((likedMovie) => likedMovie.id !== movie.id);
    } else {
      updatedLikedMovies = [...likedMovies, movie];
    }
    setLikedMovies(updatedLikedMovies);
    localStorage.setItem('likedMovies', JSON.stringify(updatedLikedMovies));
  };

  const handleMouseEnter = (movieId) => {
    setHoveredMovieId(movieId);
    fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`, options)
      .then(res => res.json())
      .then(data => {
        const trailer = data.results.find(video => video.type === "Trailer");
        if (trailer) {
          setTrailerKey(trailer.key);
        }
      })
      .catch(err => console.error(err));
      
  };

  const handleMouseLeave = () => {
    setHoveredMovieId(null);
    setTrailerKey("");
  };

  const handlePlayMovie = (movieId) => {
    navigate(`/player/${movieId}`);
  };
 
  return (
    <div className="TitleCards" id={idName}>
    <h2>{title ? title : 'Popular on Netflix'}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card, index) => {
          const isLiked = likedMovies.some((likedMovie) => likedMovie.id === card.id);
          
          return (
            <div 
              className="card" 
              key={index} 
                onMouseLeave={ handleMouseLeave }
                  >
            <div className='all-img'>
              <img src={`https://image.tmdb.org/t/p/w500${card.backdrop_path}`}
               alt={card.original_title} 
               onMouseEnter={() => handleMouseEnter(card.id)} 
              /> 
              <p>{card.original_title}</p>
              </div>
     
            <button onClick={() => handlePlayMovie(card.id)} className="btn-show-movie">
               Watch Movie 
              </button>
           
              <button onClick={() => handleLike(card)} className='btn-like'>
              {isLiked ? <FaHeart color="red" /> : <FaRegHeart color="white"/>}
              </button>
   
             {hoveredMovieId === card.id && trailerKey && (
               <div className="trailer-overlay">
              <ReactPlayer
                    url={`https://www.youtube.com/watch?v=${trailerKey}`}
                    playing={false}
                    controls={true}
                    width="420px" 
                    height="200px"
                  />
              </div>
            )}
          </div>
          );
         })}
      </div>
 </div>
  );
}

