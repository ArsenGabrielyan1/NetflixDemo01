// import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import ReactPlayer from 'react-player';
// import back22 from '../../assets/back23.png'
// import './Trailer.css'

// export default function Trailer() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [videoKey, setVideoKey] = useState("");

//   const options = {
//     method: 'GET',
//     headers: {
//       accept: 'application/json',
//       Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0YWE3NDMzM2VhNmNjMTE4M2E4MjQ3YTkyMDNiZjNkZiIsIm5iZiI6MTczNzIxMzI2NS4xMjksInN1YiI6IjY3OGJjNTUxZGJjZmYzM2E5YzY0ZjQ1MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BSwce8BWbnOfO4l32I6NwC8psmNjKEgZqSv9l3UqSUo'
//     }
//   };
  
//   useEffect(() => {
//     fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
//       .then(res => res.json())
//       .then(data => {
//         const trailer = data.results.find(video => video.type === "Trailer");
//         if (trailer) {
//           setVideoKey(trailer.key);
//         }
//       })
//       .catch(err => console.error(err));
//   }, [id]);
  
//   const handleBackClick = () => {
//     navigate(-1); 
//   };

//   return (
//     <div className="trailer">
//  <img src={back22} alt="Back" onClick={handleBackClick} className="back-btn" />
//     {videoKey ? (
//         <ReactPlayer
//           url={`https://www.youtube.com/watch?v=${videoKey}`}
//           playing={true}
//           controls={true}
//           width="80%"
//           height="80%"
//         />
//       ) : (
//         <p>No trailer available</p>
//       )}
//     </div>
//   );
// }







import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReactPlayer from 'react-player';
import back22 from '../../assets/back23.png';
import './Trailer.css';

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

    // TV remote key handler
    const handleKeyDown = (e) => {
      // Standard keyboard Escape key
      if (e.key === 'Escape') {
        handleBackClick();
      }
      // TV remote back button (often key code 27 or 10009)
      if (e.keyCode === 27 || e.keyCode === 10009) {
        handleBackClick();
      }
      // Some Samsung TVs use different key codes
      if (e.key === 'Backspace' || e.key === 'Back') {
        handleBackClick();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [id]);
  
  const handleBackClick = () => {
    navigate(-1); 
  };

  return (
    <div className="trailer">
      <img 
        src={back22} 
        alt="Back" 
        onClick={handleBackClick} 
        className="back-btn" 
        tabIndex="0" 
      />
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