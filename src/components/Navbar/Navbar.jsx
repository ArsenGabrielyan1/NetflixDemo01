import "./Navbar.css";
import logo from "../../assets/logo-netflix.jpeg";
import search from "../../assets/search-logo.png";
import bell from "../../assets/bell-icon.png";
import profile from "../../assets/Netflix-avatar.png";
import caret from "../../assets/caret.png";
import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

export default function Navbar({ onNavbarFocusEnd }) {
  const [navNavList] = useState([
    { id: 1, name: "Home", path: "/" },
    { id: 2, name: "TV Shows", path: "/Tv_shows" },
    { id: 3, name: "Movies", path: "/Movies" },
    { id: 4, name: "New & Popular", path: "/popular" },
    { id: 5, name: "My List", path: "/my_list" },
  ]);
  
  const [drop] = useState([
    { id: 1, name: "Blockbuster Movies", idName: "" },
    { id: 2, name: "Only on Netflix", idName: "only" },
    { id: 3, name: "Upcoming", idName: "up" },
    { id: 4, name: "Top Pics for You", idName: "top" },
  ]);

  const [value, setValue] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(0);
  const navRefs = useRef([]);
  const rightSectionRefs = useRef([]);
  const navbarRef = useRef(null);
  const searchInputRef = useRef(null);

  // Calculate total items
  const totalLeftItems = navNavList.length + 1; // Logo + nav items
  const totalRightItems = 3; // Search, bell, profile
  const totalItems = totalLeftItems + totalRightItems;

  useEffect(() => {
    navRefs.current = navRefs.current.slice(0, navNavList.length + 1);
    rightSectionRefs.current = rightSectionRefs.current.slice(0, totalRightItems);
  }, [navNavList.length]);

  const handleKeyDown = (e) => {
    // Tizen TV remote specific key codes
    const KEY_LEFT = 37;
    const KEY_UP = 38;
    const KEY_RIGHT = 39;
    const KEY_DOWN = 40;
    const KEY_ENTER = 13;
    const KEY_RETURN = 10009;
    
    const handleNavbarFocusEnd = () => {}

    switch(e.keyCode || e.which) {
      case KEY_RIGHT:
        e.preventDefault();
        setFocusedIndex(prev => {
          const newIndex = (prev + 1) % totalItems;
          focusElement(newIndex);
          return newIndex;
        });
        break;
        
      case KEY_LEFT:
        e.preventDefault();
        setFocusedIndex(prev => {
          const newIndex = (prev - 1 + totalItems) % totalItems;
          focusElement(newIndex);
          return newIndex;
        });
        break;

      case KEY_DOWN:
        e.preventDefault();
        if (onNavbarFocusEnd) {
          onNavbarFocusEnd();
        }
        break;

      case KEY_ENTER:
        if (focusedIndex >= 0 && focusedIndex < totalLeftItems) {
          if (focusedIndex === 0) {
            // Logo click - navigate home
            window.location.href = "/";
          } else {
            // Navigation item click
            const link = navRefs.current[focusedIndex]?.querySelector('a');
            if (link) {
              link.click();
            }
          }
        } else if (focusedIndex === totalLeftItems) {
          // Search button
          toggleSearch();
        } else if (focusedIndex === totalLeftItems + 1) {
          // Bell icon
          handleBellClick();
        } else if (focusedIndex === totalLeftItems + 2) {
          // Profile
          toggleProfile();
        }
        break;
        
      case KEY_RETURN:
        if (isSearchOpen) {
          setIsSearchOpen(false);
          setFocusedIndex(totalLeftItems); 
        } else if (isProfileOpen) {
          setIsProfileOpen(false);
          setFocusedIndex(totalLeftItems + 2); 
        }
        break;
        
      default:
        break;
    }
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    setIsProfileOpen(false);
    if (!isSearchOpen) {
      setTimeout(() => {
        searchInputRef.current?.focus();
        setFocusedIndex(totalLeftItems);
      }, 0);
    }
  };

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
    setIsSearchOpen(false);
  };

  const handleBellClick = () => {
    console.log("Notifications clicked");
  };

  const focusElement = (index) => {
    if (index < totalLeftItems) {
      // Left side items (logo + nav links)
      if (navRefs.current[index]) {
        navRefs.current[index].focus();
      }
    } else {
      // Right side items (search, bell, profile)
      const rightIndex = index - totalLeftItems;
      if (rightSectionRefs.current[rightIndex]) {
        rightSectionRefs.current[rightIndex].focus();
      }
    }
  };
  useEffect(() => {
    const handleNavbarFocus = (e) => {
      setFocusedIndex(e.detail);
    };
  
    window.addEventListener('navbarFocus', handleNavbarFocus);
    
    return () => {
      window.removeEventListener('navbarFocus', handleNavbarFocus);
    };
  }, []);

  useEffect(() => {
    const navbarElement = navbarRef.current;
    
    // Add both keydown and keypress for better TV compatibility
    navbarElement?.addEventListener('keydown', handleKeyDown);
    navbarElement?.addEventListener('keypress', handleKeyDown);
    
    return () => {
      navbarElement?.removeEventListener('keydown', handleKeyDown);
      navbarElement?.removeEventListener('keypress', handleKeyDown);
    };
  }, [focusedIndex, isSearchOpen, isProfileOpen, totalItems]);

  useEffect(() => {
    // Set initial focus on logo
    if (navRefs.current[0]) {
      navRefs.current[0].focus();
      setFocusedIndex(0);
    }
  }, []);

  return (
    <div className="navbar" ref={navbarRef} tabIndex="-1">
      <div className="navbar-left">
        <img 
          src={logo} 
          alt="Netflix Logo" 
          tabIndex="0" 
          ref={el => navRefs.current[0] = el}
          className={focusedIndex === 0 ? 'focused' : ''}
          onClick={() => window.location.href = "/"}
        />
        <ul>
          {navNavList.map((item, index) => (
            <li 
              key={item.id}
              ref={el => navRefs.current[index + 1] = el}
              tabIndex="0"
              className={focusedIndex === index + 1 ? 'focused' : ''}
            >
              <Link to={item.path} className="nav-link">
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="navbar-right">
        <div 
          className={`box ${focusedIndex === totalLeftItems ? 'focused' : ''} ${isSearchOpen ? 'active' : ''}`}
          tabIndex="0"
          ref={el => rightSectionRefs.current[0] = el}
          onClick={toggleSearch}
        >
          <form autoComplete="off">
            <input
              ref={searchInputRef}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              type="text"
              className="input"
              name="txt"
              style={{ width: isSearchOpen ? '300px' : '40px' }}
              onFocus={() => {
                setFocusedIndex(totalLeftItems);
                setIsSearchOpen(true);
              }}
              onBlur={() => {
                if (value.trim() === "") {
                  setIsSearchOpen(false);
                }
              }}
            />
          </form>
          <img src={search} alt="Search" className="icons" />
          {isSearchOpen && (
            <div className="drop">
              {drop.map((elem) => (
                <div className="drop-list" key={elem.id}>
                  <a href={`#${elem.idName}`} className="nav-link">
                    <p>{elem.name}</p>
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>
         
       <img 
          src={bell} 
          alt="Notifications" 
          className={`icons ${focusedIndex === totalLeftItems + 1 ? 'focused' : ''}`}
          tabIndex="0"
          ref={el => rightSectionRefs.current[1] = el}
          onClick={handleBellClick}
        />
        
        <div 
          className={`navbar-profile ${focusedIndex === totalLeftItems + 2 ? 'focused' : ''}`}
          tabIndex="0"
          ref={el => rightSectionRefs.current[2] = el}
          onClick={toggleProfile}
        >
          <img src={profile} alt="Profile" className="profile" />
          <img src={caret} alt="Menu" className="profile" />
          {isProfileOpen && (
            <div className="dropdown">
              <Link to="/login">
                <p>Sign Out of Netflix</p>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}