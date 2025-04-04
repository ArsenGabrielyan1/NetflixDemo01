import React, { useEffect, useRef, useState } from 'react';
import './TitleCards.css';
import { useNavigate } from 'react-router-dom';
import { FaHeart, FaRegHeart } from "react-icons/fa";

export default function TitleCards({ title, category, idName , }) {
  const [apiData, setApiData] = useState([]);
  const [likedMovies, setLikedMovies] = useState([]);
  const [hoveredMovieId, setHoveredMovieId] = useState(null);
  const [trailerKey, setTrailerKey] = useState("");
  const [focusedCardIndex, setFocusedCardIndex] = useState(-1);
  const [isKeyboardMode, setIsKeyboardMode] = useState(false);
  const cardsRef = useRef();
  const navigate = useNavigate();

  const options = {
    method: 'GET',
    headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0YWE3NDMzM2VhNmNjMTE4M2E4MjQ3YTkyMDNiZjNkZiIsIm5iZiI6MTczNzIxMzI2NS4xMjksInN1YiI6IjY3OGJjNTUxZGJjZmYzM2E5YzY0ZjQ1MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BSwce8BWbnOfO4l32I6NwC8psmNjKEgZqSv9l3UqSUo'
    }
  };

  useEffect(() => {
    const storedLikedMovies = JSON.parse(localStorage.getItem('likedMovies')) || [];
    setLikedMovies(storedLikedMovies);
  }, []);

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${category ? category : "top_rated"}?language=en-US&page=1`, options)
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
    if (!isKeyboardMode) {
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
    }
  };

  const handleMouseLeave = () => {
    if (!isKeyboardMode) {
      setHoveredMovieId(null);
      setTrailerKey("");
    }
  };

  const handlePlayMovie = (movieId) => {
    navigate(`/player/${movieId}`);
  };

  const handleKeyDown = (e) => {
    const KEY_LEFT = 37;
    const KEY_UP = 38;
    const KEY_RIGHT = 39;
    const KEY_DOWN = 40;
    const KEY_ENTER = 13;
    const KEY_RETURN = 10009;
    const KEY_PLAY_PAUSE = 10252;
    
    if (!apiData.length) return;
  
    switch(e.keyCode || e.which) {

      case KEY_UP:
  e.preventDefault();
  document.querySelectorAll('.TitleCards').forEach(section => {
    section.classList.remove('nav-highlight', 'nav-highlight-leave');
  });

  let prevSectionId;
  if (idName === "top") prevSectionId = "up";        
  else if (idName === "up") prevSectionId = "only";  
  else if (idName === "only") prevSectionId = "blockbuster"; 
  else prevSectionId = null;

  if (prevSectionId) {
    const prevSection = document.getElementById(prevSectionId);
    if (prevSection) {

      prevSection.classList.add('nav-highlight');
      const sectionRect = prevSection.getBoundingClientRect();
      const scrollPosition = window.scrollY + sectionRect.top - (window.innerHeight / 2) + (sectionRect.height / 2);
        window.scrollTo({
        top: scrollPosition,
        behavior: 'smooth'
      });

   
      setTimeout(() => {
        const cards = prevSection.querySelectorAll('.card');
        if (cards.length > 0) {
          const lastCardIndex = Math.max(0, cards.length - 20); 
          const lastCard = cards[lastCardIndex];
          if (lastCard) {
            lastCard.focus();
            window.dispatchEvent(new CustomEvent('setCardFocus', {
              detail: lastCardIndex,
              section: prevSectionId === "blockbuster" ? 0 : 
                      prevSectionId === "only" ? 1 :
                      prevSectionId === "up" ? 2 : 3
            }));
          }
        }
      }, 300); 
    }
  } else {

    setTimeout(() => {
      const playButton = document.querySelector('.hero-btns .btn');
      if (playButton) {
        playButton.focus();
        window.dispatchEvent(new CustomEvent('focusHeroButton', { detail: 0 }));
      }
    }, 150);
  }
  break;

 
      case KEY_DOWN:
        e.preventDefault();
        if (idName === "top") {
          const footer = document.querySelector('.footer a');
          if (footer) {
            document.getElementById(idName)?.classList.remove('nav-highlight');
            footer.focus();
          }
          break;
        }
        document.querySelectorAll('.TitleCards').forEach(section => {
          section.classList.remove('nav-highlight', 'nav-highlight-leave');
        });
      
        const currentSection = document.getElementById(idName);
        if (currentSection) {
          currentSection.classList.add('nav-highlight-leave');
        }
      
        setTimeout(() => {
          if (idName === "blockbuster") {
            const nextSection = document.querySelector('#only');
            if (nextSection) {
              nextSection.classList.add('nav-highlight');
              const firstCard = nextSection.querySelector('.card');
              if (firstCard) {
                firstCard.focus();
                window.dispatchEvent(new CustomEvent('setCardFocus', {
                  detail: 0,
                  section: 1
                }));
              }
            }
          } 
          else if (idName === "only") {
            const nextSection = document.querySelector('#up');
            if (nextSection) {
              nextSection.classList.add('nav-highlight');
              const firstCard = nextSection.querySelector('.card');
              if (firstCard) {
                firstCard.focus();
                window.dispatchEvent(new CustomEvent('setCardFocus', {
                  detail: 0,
                  section: 2
                }));
              }
            }
          }
          else if (idName === "up") {
            const nextSection = document.querySelector('#top');
            if (nextSection) {
              nextSection.classList.add('nav-highlight');
              const firstCard = nextSection.querySelector('.card');
              if (firstCard) {
                firstCard.focus();
                window.dispatchEvent(new CustomEvent('setCardFocus', {
                  detail: 0,
                  section: 3
                }));
              }
            }
          }
          else {
            // Loop back to Blockbuster
            const nextSection = document.querySelector('#blockbuster');
            if (nextSection) {
              nextSection.classList.add('nav-highlight');
              const firstCard = nextSection.querySelector('.card');
              if (firstCard) {
                firstCard.focus();
                window.dispatchEvent(new CustomEvent('setCardFocus', {
                  detail: 0,
                  section: 0
                }));
              }
            }
          }
        }, 150); 
        break;

     case KEY_RIGHT:
        e.preventDefault();
        setFocusedCardIndex(prev => {
          const newIndex = prev === -1 ? 0 : (prev + 1) % apiData.length;
          scrollToCard(newIndex);
          return newIndex;
        });
        break;
  
      case KEY_LEFT:
        e.preventDefault();

        setFocusedCardIndex(prev => {
          const newIndex = prev === -1 ? 0 : (prev - 1 + apiData.length) % apiData.length;
          scrollToCard(newIndex);
          return newIndex;
        });
        break;

   case KEY_ENTER:
        if (focusedCardIndex >= 0 && focusedCardIndex < apiData.length) {
          handlePlayMovie(apiData[focusedCardIndex].id);
        }
        break;
        
      case KEY_PLAY_PAUSE:
        if (focusedCardIndex >= 0 && focusedCardIndex < apiData.length) {
          e.preventDefault();
          handleLike(apiData[focusedCardIndex]);
        }
        break;
        
      default:
        break;
    }
  };


  const scrollToCard = (index) => {
    if (cardsRef.current) {
      const cardElements = cardsRef.current.querySelectorAll('.card');
      if (cardElements[index]) {
        cardElements[index].scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center'
        });
      }
    }
  };
  



  useEffect(() => {
    const cards = cardsRef.current;
    
    const handleSetFocus = (e) => {
      setFocusedCardIndex(e.detail);
      scrollToCard(e.detail);
    };

    cards?.addEventListener('setCardFocus', handleSetFocus);
    cards?.addEventListener('keydown', handleKeyDown);
    
    const handleMouseMove = () => setIsKeyboardMode(false);
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      cards?.removeEventListener('setCardFocus', handleSetFocus);
      cards?.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [apiData, focusedCardIndex]);

  useEffect(() => {
    if (apiData.length > 0 && cardsRef.current && focusedCardIndex >= 0) {
      const cardElements = cardsRef.current.querySelectorAll('.card');
      if (cardElements[focusedCardIndex]) {
        cardElements[focusedCardIndex].focus();
        
        if (isKeyboardMode) {
          setHoveredMovieId(apiData[focusedCardIndex].id);
          fetch(`https://api.themoviedb.org/3/movie/${apiData[focusedCardIndex].id}/videos?language=en-US`, options)
            .then(res => res.json())
            .then(data => {
              const trailer = data.results.find(video => video.type === "Trailer");
              if (trailer) {
                setTrailerKey(trailer.key);
              }
            });
        }
      }
    }
  }, [focusedCardIndex, apiData, isKeyboardMode]);


  useEffect(() => {
    return () => {
 
      const section = document.getElementById(idName);
      if (section) {
        section.classList.remove('nav-highlight', 'nav-highlight-leave');
      }
    };
  }, [idName]);



  return (
    <div className="TitleCards" id={idName}>
      { <h2>{title ? title : 'Popular on Netflix'}</h2> }
    
      <div className="card-list"  ref={cardsRef} tabIndex="-1">
        {apiData.map((card, index) => {
          const isLiked = likedMovies.some((likedMovie) => likedMovie.id === card.id);
          const isFocused = focusedCardIndex === index;
          const showTrailer = (hoveredMovieId === card.id && !isKeyboardMode) || 
            (isFocused && isKeyboardMode && trailerKey);
          
          return (
             <div 
             className={`card ${isFocused ? 'focused' : ''}`}
               key={card.id}
             id={idName}
             tabIndex="0"
             onMouseEnter={() => handleMouseEnter(card.id)}
             onMouseLeave={handleMouseLeave}
             onFocus={() => {
               setFocusedCardIndex(index);
               setIsKeyboardMode(true);
             }}
              >
         <div className='all-img'>
                <img 
                  src={`https://image.tmdb.org/t/p/w500${card.backdrop_path}`}
                  alt={card.original_title} 
                /> 
                <p>{card.original_title}</p>
              </div>
     
              <button 
                onClick={() => handlePlayMovie(card.id)} 
                className="btn-show-movie"
              >
                Watch Movie 
              </button>
           
              <button 
                onClick={() => handleLike(card)} 
                className='btn-like'
                aria-label={isLiked ? "Unlike this movie" : "Like this movie"}
              >
                {isLiked ? <FaHeart color="red" /> : <FaRegHeart color="white"/>}
              </button>
     </div>
          );
        })}
        
      </div>
      
    </div>
  );}
