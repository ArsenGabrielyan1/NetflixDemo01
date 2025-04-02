import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./My_List.css";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

export default function MyList() {
  const [likedMovies, setLikedMovies] = useState([]);

  useEffect(() => {
    const storedLikedMovies = localStorage.getItem("likedMovies");
    if (storedLikedMovies) {
      setLikedMovies(JSON.parse(storedLikedMovies));
    }
  }, []);

  return (
    <div className="my-list">
      <Navbar />
      <h1 className="my-list-title">My Liked Movies</h1>
      <div className="grid-container">
        {likedMovies.map((movie, index) => (
          <div className="grid-item" key={index}>
            <Link to={`/player/${movie.id}`}>
              <img
                src={`https://image.tmdb.org/t/p/w500` + movie.backdrop_path}
                alt={movie.original_title}
              />
              <p>{movie.original_title}</p>
            </Link>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}



// import React, { useEffect, useState, useRef } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import "./My_List.css";
// import Navbar from "../../components/Navbar/Navbar";


// export default function MyList() {
//   const [likedMovies, setLikedMovies] = useState([]);
//   const [focusedIndex, setFocusedIndex] = useState(0);
//   const gridItemsRef = useRef([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const storedLikedMovies = localStorage.getItem("likedMovies");
//     if (storedLikedMovies) {
//       const movies = JSON.parse(storedLikedMovies);
//       setLikedMovies(movies);
//       gridItemsRef.current = gridItemsRef.current.slice(0, movies.length);
//     }
//   }, []);

//   // Tizen TV remote key handler
//   const handleKeyDown = (e) => {
//     // Tizen TV remote key codes
//     const KEY_LEFT = 37;
//     const KEY_UP = 38;
//     const KEY_RIGHT = 39;
//     const KEY_DOWN = 40;
//     const KEY_ENTER = 13;
//     const KEY_RETURN = 10009;
//     const KEY_PLAY_PAUSE = 10252;

//     if (likedMovies.length === 0) return;

//     switch(e.keyCode) {
//       case KEY_LEFT:
//         e.preventDefault();
//         setFocusedIndex(prev => {
//           const newIndex = (prev - 1 + likedMovies.length) % likedMovies.length;
//           focusItem(newIndex);
//           return newIndex;
//         });
//         break;

//       case KEY_RIGHT:
//         e.preventDefault();
//         setFocusedIndex(prev => {
//           const newIndex = (prev + 1) % likedMovies.length;
//           focusItem(newIndex);
//           return newIndex;
//         });
//         break;

//       case KEY_UP:
//         e.preventDefault();
//         // Move focus to Navbar
//         const navbarProfile = document.querySelector('.navbar-profile');
//         if (navbarProfile) {
//           navbarProfile.focus();
//         }
//         break;

//       case KEY_DOWN:
//         e.preventDefault();
//         // Move focus to Footer
//         const firstFooterItem = document.querySelector('.footer-icons a');
//         if (firstFooterItem) {
//           firstFooterItem.focus();
//           window.dispatchEvent(new CustomEvent('setFooterFocus', { 
//             detail: 0 
//           }));
//         }
//         break;

//       case KEY_ENTER:
//         if (focusedIndex >= 0 && focusedIndex < likedMovies.length) {
//           navigate(`/player/${likedMovies[focusedIndex].id}`);
//         }
//         break;

//       case KEY_RETURN:
//         window.history.back();
//         break;

//       case KEY_PLAY_PAUSE:
//         // Handle play/pause if needed
//         break;

//       default:
//         break;
//     }
//   };

//   const focusItem = (index) => {
//     if (gridItemsRef.current[index]) {
//       gridItemsRef.current[index].focus();
//       // Scroll into view if needed
//       gridItemsRef.current[index].scrollIntoView({
//         behavior: 'smooth',
//         block: 'nearest',
//         inline: 'center'
//       });
//     }
//   };

//   useEffect(() => {
//     // Add event listener
//     window.addEventListener('keydown', handleKeyDown);

//     // Set initial focus if there are liked movies
//     if (likedMovies.length > 0) {
//       const timer = setTimeout(() => {
//         focusItem(0);
//       }, 300);

//       return () => {
//         clearTimeout(timer);
//         window.removeEventListener('keydown', handleKeyDown);
//       };
//     }

//     return () => {
//       window.removeEventListener('keydown', handleKeyDown);
//     };
//   }, [likedMovies]);

//   return (
//     <div className="my-list">
//       <Navbar />
//       <h1 className="my-list-title">My Liked Movies</h1>
//       <div className="grid-container">
//         {likedMovies.map((movie, index) => (
//           <div 
//             className={`grid-item ${focusedIndex === index ? 'focused' : ''}`}
//             key={index}
//             ref={el => gridItemsRef.current[index] = el}
//             tabIndex="0"
//             onFocus={() => setFocusedIndex(index)}
//           >
//             <Link to={`/player/${movie.id}`}>
//               <img
//                 src={`https://image.tmdb.org/t/p/w500` + movie.backdrop_path}
//                 alt={movie.original_title}
//               />
//               <p>{movie.original_title}</p>
//             </Link>
//           </div>
//         ))}
//       </div>
  
//     </div>
//   );
// }