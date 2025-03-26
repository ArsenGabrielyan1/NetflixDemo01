import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReactPlayer from 'react-player';
import back from '../../assets/backk.png';
import './Trailer.css'

export default function Trailer() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [videoKey, setVideoKey] = useState("");

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0YWE3NDMzM2VhNmNjMTE4M2E4MjQ3YTkyMDNiZjNkZiIsIm5iZiI6MTczNzIxMzI2NS4xMjksInN1YiI6IjY3OGJjNTUxZGJjZmYzM2E5YzY0ZjQ1MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BSwce8BWbnOfO4l32I6NwC8psmNjKEgZqSv9l3UqSUo'
    }
  };
  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
      .then(res => res.json())
      .then(data => {
        const trailer = data.results.find(video => video.type === "Trailer");
        if (trailer) {
          setVideoKey(trailer.key);
        }
      })
      .catch(err => console.error(err));
  }, [id]);

  return (
    <div className="trailer">
 <img src={back} alt="Back" onClick={() => navigate(-1)} className="back-btn" />
    {videoKey ? (
        <ReactPlayer
          url={`https://www.youtube.com/watch?v=${videoKey}`}
          playing={true}
          controls={true}
          width="80%"
          height="80%"
        />
      ) : (
        <p>No trailer available</p>
      )}
    </div>
  );
}
