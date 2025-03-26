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
