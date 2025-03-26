import "./Navbar.css";
import logo from "../../assets/logo-netflix.jpeg";
import search from "../../assets/search-logo.png";
import bell from "../../assets/bell-icon.png";
import profile from "../../assets/Netflix-avatar.png";
import caret from "../../assets/caret.png";
import { Link } from "react-router-dom";
import { useState } from "react";
import React from "react";

export default function Navbar() {
  const [navNavList, setNavList] = useState([
    { id: 1, name: "Home", path: "/" },
    { id: 2, name: "TV Shows", path: "/Tv_shows" },
    { id: 3, name: "Movies", path: "/Movies" },
    { id: 4, name: "New & Popular", path: "/popular" },
    { id: 5, name: "My List", path: "/my_list" },
    
  ]);
   const [drop, setDrop] = useState([
    { id: 1, name: "Blockbuster Movies", idName: "" },
    { id: 2, name: "Only on Netflix", idName: "only" },
    { id: 3, name: "Upcoming", idName: "up" },
    { id: 4, name: "Top Pics for You", idName: "top" },
  ]);

  const [value, setValue] = useState("");
  const [chnageVal, setChangeVal] = useState([drop]);

  const handleChanegeValue = (e) => {
    const { value } = e.target;
    setValue(value);
    if (value.trim() === "") {
      setChangeVal([]);
      setIsOpen(false);
    } else {
      const resultSearch = drop.filter((item) =>
        item.name.toLowerCase().includes(value.toLowerCase())
      );
      setChangeVal(resultSearch);
      if (chnageVal.length > 0) {
      }
    }
  };

  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="navbar">
      <div className="navbar-left">
        <img src={logo} alt="Example Image" />
        <ul>
          {navNavList.map((item) => (
            <li key={item.id}>
              <Link to={item.path} className="nav-link">
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="navbar-right">
        <div className="box">
          <form autoComplete="off">
            <input
              value={value}
              onChange={handleChanegeValue}
              onKeyDown={toggleDropdown}
              type="text"
              className="input"
              name="txt"
              onMouseLeave={(e) => {
                e.target.value = "";
                e.target.blur();
                e.currentTarget.style.transition = ".6s";
              }}
            />
           {isOpen && (
              <div className="drop">
                {chnageVal.map((elem) => {
                  return (
                    <div className="drop-list" key={elem.id}>
                      <a href={`#${elem.idName}`} className="nav-link">
                        <p>{elem.name}</p>
                      </a>
                    </div>
                  );
                })}
              </div>
            )}
          </form>
          <img src={search} alt="Example Image" className="icons" />
        </div>
        <p className="user-nav">User</p>
        <img src={bell} alt="" className="icons" />
        <div className="navbar-profile">
          <img src={profile} alt="Example Image" className="profile" />
          <img src={caret} alt="Example Image" className="profile" />
          <Link
            to={{
              pathname: "/login",
            }}
          >
            <div className="dropdown">
              <p>Sign Out of Netflix</p> {/* onClick={logout} */}
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
