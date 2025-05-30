import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import "./My_List.css";
import { useNavigate } from 'react-router-dom';
import back22 from '../../assets/back23.png';

export default function MyList() {
  const [likedMovies, setLikedMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const [isBackButtonFocused, setIsBackButtonFocused] = useState(true);
  const navigate = useNavigate();
  const gridRef = useRef(null);


  const TVKeys = {
    ENTER: 13,
    BACK: 10009,
    RED: 403,
    UP: 38,
    DOWN: 40,
    LEFT: 37,
    RIGHT: 39,
    PLAY:10252,
  };

  useEffect(() => {
    const loadLikedMovies = () => {
      const storedLikedMovies = localStorage.getItem("likedMovies");
      if (storedLikedMovies) {
        setLikedMovies(JSON.parse(storedLikedMovies));
      }
      setIsLoading(false);
    };
    
    loadLikedMovies();
    
     if (window.tizen && window.tizen.tvinputdevice) {
      try {
        tizen.tvinputdevice.registerKey("MediaPlay");
        tizen.tvinputdevice.registerKey("MediaPause");
        tizen.tvinputdevice.registerKey("MediaPlayPause");
        tizen.tvinputdevice.registerKey("MediaStop");
        tizen.tvinputdevice.registerKey("MediaRewind");
        tizen.tvinputdevice.registerKey("MediaFastForward");
        tizen.tvinputdevice.registerKey("ColorF0Red");
      } catch (error) {
        console.error("Error registering TV keys:", error);
      }
    }
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isLoading || likedMovies.length === 0) return;
      
      const keyCode = e.keyCode || e.which;
      
      switch (keyCode) {
        case TVKeys.UP:
          e.preventDefault();
          if (isBackButtonFocused) {

          } else if (focusedIndex < 0) {
            setIsBackButtonFocused(true);
            setFocusedIndex(-1);
          } else if (focusedIndex >= 4) {
           setFocusedIndex(focusedIndex - 4);
          }
          break;
          
        case TVKeys.DOWN:
          e.preventDefault();
          if (isBackButtonFocused) {
            setIsBackButtonFocused(false);
            setFocusedIndex(0);
          } else if (focusedIndex + 4 < likedMovies.length) {
            setFocusedIndex(focusedIndex + 4);
          }
          break;
          
        case TVKeys.LEFT:
          e.preventDefault();
          if (isBackButtonFocused) {
   
          } else if (focusedIndex > 0) {
            setFocusedIndex(focusedIndex - 1);
          }
          break;
          
        case TVKeys.RIGHT:
          e.preventDefault();
          if (isBackButtonFocused) {
          
          } else if (focusedIndex < likedMovies.length - 1) {
            setFocusedIndex(focusedIndex + 1);
          }
          break;
                   
        case TVKeys.ENTER: 
        e.preventDefault();
        if (focusedIndex >= 0 && focusedIndex < likedMovies.length) {
          removeFromLikedMovies(likedMovies[focusedIndex].id);
        }
        break;



        case TVKeys.PLAY: // 415
          e.preventDefault();
          if (isBackButtonFocused) {
            handleBackClick();
          } else if (focusedIndex >= 0 && focusedIndex < likedMovies.length) {
            navigate(`/player/${likedMovies[focusedIndex].id}`);
          }
          break;



          case TVKeys.BACK: // 10009
          console.log("BACK key pressed"); 
          e.preventDefault();
           handleBackClick();
           
      
          break;
          
        case TVKeys.RED:
          e.preventDefault();
          if (focusedIndex >= 0 && focusedIndex < likedMovies.length) {
            removeFromLikedMovies(likedMovies[focusedIndex].id);
          }
          break;

          default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [focusedIndex, isBackButtonFocused, likedMovies, isLoading, navigate]);

  const removeFromLikedMovies = (movieId) => {
    const updatedLikedMovies = likedMovies.filter(movie => movie.id !== movieId);
    setLikedMovies(updatedLikedMovies);
    localStorage.setItem("likedMovies", JSON.stringify(updatedLikedMovies));
    
    if (focusedIndex >= updatedLikedMovies.length) {
      setFocusedIndex(Math.max(0, updatedLikedMovies.length - 1));
    }
  };

  const handleBackClick = () => {
      navigate(-1); 
  };

  const handleRemoveClick = (e, movieId) => {
    e.preventDefault();
    e.stopPropagation();
    removeFromLikedMovies(movieId);
  };

  return (
    <div className="my-list">
<img
  src={back22}
  alt="Back"
  onClick={handleBackClick}
  className="back-btn"
  tabIndex={0} 
  onFocus={() => setIsBackButtonFocused(true)}
  onBlur={() => setIsBackButtonFocused(false)}
  style={{
    cursor: "pointer",
    border: isBackButtonFocused ? "3px solid rgb(99, 94, 94)" : "none",
    padding: isBackButtonFocused ? "3px" : "0",
    borderRadius: isBackButtonFocused ? "50%" : "0",
    position: "fixed",
    top: "20px",
    left: "20px",
    zIndex: 1000,
    width: "40px",
    height: "40px",
  }}
/>  
      <div className="header-section">
        <h1 className="my-list-title">My Liked Movies</h1>
      </div>
      
      {isLoading ? (
        <div style={{ color: 'white', textAlign: 'center' }}>Loading...</div>
      ) : likedMovies.length === 0 ? (
        <div style={{ color: 'white', textAlign: 'center', marginTop: '160px', fontSize: '28px' }}>
          You haven't liked any movies yet.
        </div>
      ) : (
        <div className="grid-container" ref={gridRef}>
          {likedMovies.map((movie, index) => (
            <div 
              className="grid-item" 
              key={movie.id}
              style={{
                borderRadius: '2px',
                transition: 'all 0.3s ease',
                boxShadow: focusedIndex === index ? '0px 2px 15px rgb(218, 209, 209)' : 'none',
                position: 'relative'
              }}
            >
              <Link to={`/player/${movie.id}`} style={{ textDecoration: 'none' }}>
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
                  alt={movie.original_title}
                  style={{
                    borderRadius: '8px',
                    width: '100%'
                  }}
                />
                <p style={{
                  color: '#fff',
                  marginTop: '8px',
                  fontSize: '16px',
                  textAlign: 'center'
                }}>{movie.original_title}</p>
              </Link>
              {focusedIndex === index && (
                <button
                  onClick={(e) => handleRemoveClick(e, movie.id)}
                  className="remove-btn"
                  style={{
                    position: 'absolute',
                    top: '15px',
                    right: '15px',
                    backgroundColor: 'rgba(255, 0, 0, 0.8)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '50%',
                    width: '30px',
                    height: '30px',
                    cursor: 'pointer',
                    fontSize: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 0 5px rgba(0,0,0,0.5)'
                  }}
                >
                  X
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}