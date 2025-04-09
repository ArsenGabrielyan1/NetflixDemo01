import React, { useEffect, useState, useRef } from 'react';
import ReactPlayer from 'react-player';
import './Player.css';
import back22 from '../../assets/back23.png';
import { useNavigate, useParams } from 'react-router-dom';
import fake from '../../assets/fake.mp4';
import play_vd from '../../assets/play-vd.png';
import pause_vd from '../../assets/pause-vd.png';
import mute from '../../assets/mute.png';
import unmute from '../../assets/unmute.png';

export default function Player() {
  const {id} = useParams();
  const navigate = useNavigate();
  const [apiData, setApiData] = useState({
    name: "",
    key: "",
    published_at: "",
    typeof: ""
  });
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [muted, setMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const playerRef = useRef(null);
  const controlsTimeoutRef = useRef(null);
  const controlsRef = useRef(null);

  const KEY_CODES = {
    ENTER: 13,
    LEFT: 37,
    RIGHT: 39,
    UP: 38,
    DOWN: 40,
    BACK: 10009,
    VOLUME_UP: 447,
    VOLUME_DOWN: 448,
    PLAY_PAUSE: 10252,
  };

  const getAllFocusableElements = () => {
    const controls = controlsRef.current;
    if (!controls) return [];
    
    const focusableElements = Array.from(controls.querySelectorAll('button, input[type="range"]'));
    const trailerButton = document.querySelector('.watch-trailer-btn');
    const backButton = document.querySelector('.back-btn');
    const likeButtons = document.querySelectorAll('.like-btn, .dislike-btn');
    
    if (backButton) focusableElements.unshift(backButton);
    if (trailerButton) focusableElements.push(trailerButton);
    likeButtons.forEach(btn => focusableElements.push(btn));
    
    return focusableElements.filter(el => el.tabIndex >= 0);
  };
  const handleKeyDown = (e) => {
    const focusableElements = getAllFocusableElements();
    if (focusableElements.length === 0) return;
  
    let currentIndex = focusableElements.indexOf(document.activeElement);
    const activeElement = document.activeElement;
  
    switch (e.keyCode) {
      case KEY_CODES.ENTER:
        if (activeElement.tagName === 'BUTTON') {
          activeElement.click();
        }
        break;
        
      case KEY_CODES.LEFT:
        e.preventDefault();
        if (activeElement.classList.contains('progress-slider')) {
          const newValue = Math.max(0, progress - 0.05);
          setProgress(newValue);
          playerRef.current.seekTo(newValue, 'fraction');
        } else if (activeElement.classList.contains('volume-slider')) {
          setVolume(prev => Math.max(0, prev - 0.05));
        } else if (currentIndex > 0) {
          focusableElements[currentIndex - 1].focus();
        }
        break;
        
      case KEY_CODES.RIGHT:
        e.preventDefault();
        if (activeElement.classList.contains('progress-slider')) {
          const newValue = Math.min(1, progress + 0.05);
          setProgress(newValue);
          playerRef.current.seekTo(newValue, 'fraction');
        } else if (activeElement.classList.contains('volume-slider')) {
          setVolume(prev => Math.min(1, prev + 0.05));
        } else if (currentIndex < focusableElements.length - 1) {
          focusableElements[currentIndex + 1].focus();
        }
        break;
        
      case KEY_CODES.UP:
        e.preventDefault();
        if (currentIndex > 0) {
          focusableElements[currentIndex - 1].focus();
        } else {
          focusableElements[focusableElements.length - 1].focus();
        }
        break;
        
      case KEY_CODES.DOWN:
        e.preventDefault();
        if (currentIndex < focusableElements.length - 1) {
          focusableElements[currentIndex + 1].focus();
        } else {
          focusableElements[0].focus();
        }
        break;
        
      case KEY_CODES.BACK:
        navigate(-1);
        break;
        
      case KEY_CODES.PLAY_PAUSE:
        handlePlayPause();
        break;
        
      case KEY_CODES.VOLUME_UP:
        setVolume(prev => Math.min(1, prev + 0.1));
        break;
        
      case KEY_CODES.VOLUME_DOWN:
        setVolume(prev => Math.max(0, prev - 0.1));
        break;
        
      // Like/Dislike functionality only when buttons are focused
      case KEY_CODES.ENTER:
        if (activeElement.classList.contains('like-btn')) {
          handleLike();
        } else if (activeElement.classList.contains('dislike-btn')) {
          handleDislike();
        }
        break;
        
      default:
        break;
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [progress, volume]);

  const handlePlayPause = () => {
    setPlaying(!playing);
    setShowControls(true);
    // resetControlsTimeout();
  };

  const handleVolumeChange = (e) => {
    setVolume(parseFloat(e.target.value));
  };

  const handleMute = () => {
    setMuted(!muted);
    setShowControls(true);
    // resetControlsTimeout();
  };

  const handleProgress = (state) => {
    setProgress(state.played);
  };

  const handleSeek = (e) => {
    const seekTo = parseFloat(e.target.value);
    if (playerRef.current) {
      playerRef.current.seekTo(seekTo, 'fraction');
      setProgress(seekTo);
    }
    setShowControls(true);
    // resetControlsTimeout();
  };

  // const resetControlsTimeout = () => {
  //   if (controlsTimeoutRef.current) {
  //     clearTimeout(controlsTimeoutRef.current);
  //   }
  //   controlsTimeoutRef.current = setTimeout(() => {
  //     setShowControls(false);
  //   }, 3000);
  // };

  const handleMouseMove = () => {
    setShowControls(true);
    // resetControlsTimeout();
  };

  useEffect(() => {
    return () => {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    };
  }, []);

  const handelSendReq = async (id) => {
    setIsLoading(true);
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0YWE3NDMzM2VhNmNjMTE4M2E4MjQ3YTkyMDNiZjNkZiIsIm5iZiI6MTczNzIxMzI2NS4xMjksInN1YiI6IjY3OGJjNTUxZGJjZmYzM2E5YzY0ZjQ1MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BSwce8BWbnOfO4l32I6NwC8psmNjKEgZqSv9l3UqSUo'
      }
    };
    try {
      const req = await fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options);
      if (!req.ok) {
        throw new Error('Network was error');
      }
      const resp = await req.json();
      setApiData({
        name: resp.results[0]?.name || "",
        key: resp.results[0]?.key || "",
        published_at: resp.results[0]?.published_at || "",
        typeof: resp.results[0]?.type || ""
      });
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    handelSendReq(id);
  }, [id]);

  const handleLike = () => {
    if (!liked) {
      setLikes(likes + 1);
      setLiked(true);
      if (disliked) {
        setDislikes(dislikes - 1);
        setDisliked(false);
      }
    } else {
      setLikes(likes - 1);
      setLiked(false);
    }
  };

  const handleDislike = () => {
    if (!disliked) {
      setDislikes(dislikes + 1);
      setDisliked(true);
      if (liked) {
        setLikes(likes - 1);
        setLiked(false);
      }
    } else {
      setDislikes(dislikes - 1);
      setDisliked(false);
    }
  };

  const handleBackClick = () => {
    navigate(-1); 
  };

  return (
    <div className="player" onMouseMove={handleMouseMove}>
      <img 
        src={back22} 
        alt="Back" 
        onClick={handleBackClick} 
        className="back-btn"
        tabIndex="0"
      />
      
      <div className="player-info">
        <p>{apiData.published_at ? apiData.published_at.slice(0, 10) : ''}</p>
        <p>{apiData.name}</p>
        <p>{apiData.typeof}</p>
      </div>

      {isLoading ? <p style={{ color: 'white' }}>Loading...</p> : (
        <div className="video-wrapper">
          <ReactPlayer
            ref={playerRef}
            url={fake}
            playing={playing}
            volume={volume}
            muted={muted}
            onProgress={handleProgress}
            onReady={() => console.log('Player is ready')}
            width="100%"
            height="100%"
          />
         
          {showControls && (
            <div className="custom-controls" ref={controlsRef}>
              <button 
                onClick={handlePlayPause}
                tabIndex="0"
                className="play-pause-btn"
              >
                {playing ? <img src={pause_vd} alt="Pause"/> : <img src={play_vd} alt="Play"/>}
              </button>
         
              <input
                type="range"
                min={0}
                max={1} 
                step={0.01}
                value={progress}
                onChange={handleSeek}
                style={{ accentColor: "white", cursor: "pointer", width: "50%" }}
                tabIndex="0"
                className="progress-slider"
              />
              <button 
                onClick={handleMute}
                tabIndex="0"
                className="mute-btn"
              >
                {muted ? <img src={mute} alt="Unmute" /> : <img src={unmute} alt="Mute" />}
              </button>
              <input
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={volume}
                onChange={handleVolumeChange}
                style={{ accentColor: "white" }}
                tabIndex="0"
                className="volume-slider"
              />
            </div>
          )}
        </div>
      )}
      <button 
        className='watch-trailer-btn' 
        onClick={() => navigate(`/trailer/${id}`)}
        tabIndex="0"
      >
        Watch Trailer
      </button>
    </div>
  );
}