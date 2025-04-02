import React, { useEffect, useState, useRef } from 'react';
import ReactPlayer from 'react-player';
// import screenfull from 'screenfull';
import './Player.css';
import back from '../../assets/backk.png';
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from "react-router-dom";
import fake from '../../assets/fake.mp4';
import play_vd from '../../assets/play-vd.png';
import pause_vd from '../../assets/pause-vd.png';
import mute from '../../assets/mute.png';
import unmute from '../../assets/unmute.png';
// import fullscreen from '../../assets/fullscreen.png';
// import miniscreen from '../../assets/miniscreen.png';

export default function Player() {
  const { id } = useParams();
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
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const playerRef = useRef(null);
  const controlsTimeoutRef = useRef(null);

  const handlePlayPause = () => {
    setPlaying(!playing);
  };

  const handleVolumeChange = (e) => {
    setVolume(parseFloat(e.target.value));
  };

  const handleMute = () => {
    setMuted(!muted);
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
  };

  const handleFullScreen = () => {
    if (screenfull.isEnabled && playerRef.current?.wrapper) {
      screenfull.toggle(playerRef.current.wrapper);
      setIsFullScreen(!isFullScreen);
    }
  };

  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    controlsTimeoutRef.current = setTimeout(() => {
      setShowControls(false);
    }, 1400);
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
      setIsLoading(false);
      console.log(resp);
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

  return (
    <div className="player" onMouseMove={handleMouseMove}>
      <img src={back} alt="Back" onClick={() => navigate(-1)} className="back-btn" />
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
            width="93%"
            height="86%"
          />
         
          {showControls && (
            <div className="custom-controls">
              <button onClick={handlePlayPause}>
                {playing ? <img src={pause_vd} alt="Pause"/> : <img src={play_vd} alt="Play"/>}
              </button>
         
              <input
                type="range"
                min={0}
                max={1} 
                step={0.01}
                value={progress}
                onChange={handleSeek} 
                onMouseUp={() => setPlaying(true)} 
                style={{ accentColor: "white", cursor: "pointer", width: "50%" }}
              />
              <button onClick={handleMute}>
                {muted ? <img src={unmute} alt="Unmute" /> : <img src={mute} alt="Mute" />}
              </button>
              <input
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={volume}
                onChange={handleVolumeChange}
                style={{ accentColor: "white" }}
              />
              {/* <button onClick={handleFullScreen} >
                {isFullScreen ? <img src={miniscreen} alt="MiniScreen"/> : <img src={fullscreen} alt="FullScreen"/>}
              </button> */}
            </div>
          )}
        </div>
      )}

      <div className="like-dislike-buttons">
        <button className={`like-btn ${liked ? 'active' : ''}`} onClick={handleLike}>
          👍 {likes}
        </button>
        <button className={`dislike-btn ${disliked ? 'active' : ''}`} onClick={handleDislike}>
          👎 {dislikes}
        </button>
      </div>
      <Link to={`/trailer/${id}`}>
        <button className='watch-trailer-btn'>Watch Trailer</button>
      </Link>
    </div>
  );
}