import React, { useState, useEffect, useRef } from 'react';
import './Home.css';
import Navbar from '../../components/Navbar/Navbar';
import home_bg from '../../assets/bg.png';
import Prot from '../../assets/img-prott.png';
import Play from '../../assets/play-47.png';
import Info from '../../assets/icon.png';
import TitleCards from '../../components/TitleCards/TitleCards';
import Footer from '../../components/Footer/Footer';

export default function Home() {
  const playButtonRef = useRef(null);
  const infoButtonRef = useRef(null);
  const heroButtonsRef = useRef(null);
  const titleCardsRef = useRef(null);
  const [focusedButton, setFocusedButton] = useState(0);
  const [showFocusOutline, setShowFocusOutline] = useState(false);

  const titleCardSections = [
    { title: "Blockbuster Movies", category: "top_rated", idName: "blockbuster" },
    { title: "Only on Netflix", category: "popular", idName: "only" },
    { title: "Upcoming", category: "upcoming", idName: "up" },
    { title: "Top Pics for You", category: "now_playing", idName: "top" }
  ];

  const handleKeyDown = (e) => {
    const KEY_LEFT = 37;
    const KEY_UP = 38;
    const KEY_RIGHT = 39;
    const KEY_DOWN = 40;
    const KEY_ENTER = 13;
    const KEY_RETURN = 10009;
    const KEY_PLAY_PAUSE = 10252;
    
    switch(e.keyCode || e.which) {
      case KEY_UP:
        e.preventDefault();
        const netflixLogo = document.querySelector('.navbar-left img');
        if (netflixLogo) {
          netflixLogo.focus();
          window.dispatchEvent(new CustomEvent('navbarFocus', { detail: 0 }));
        }
        break;
        
        
      case KEY_RIGHT:
        e.preventDefault();
        setFocusedButton(prev => (prev + 1) % 2);
        break;
        
      case KEY_LEFT:
        e.preventDefault();
        setFocusedButton(prev => (prev - 1 + 2) % 2);
        break;

        case KEY_DOWN:
  e.preventDefault();
  if (focusedButton === 0 || focusedButton === 1) {
    // First down press from hero buttons - focus first section (Blockbuster)
    setTimeout(() => {
      const firstSection = document.querySelector(`#${titleCardSections[0].idName}`);
      if (firstSection) {
        firstSection.classList.add('nav-highlight');
        const firstCard = firstSection.querySelector('.card');
        if (firstCard) {
          firstCard.focus();
          window.dispatchEvent(new CustomEvent('setCardFocus', {
            detail: 0,
            section: 0
          }));
        }
      }
    }, 50);
  }
  break;

        
      case KEY_ENTER:
      case KEY_PLAY_PAUSE:
        if (focusedButton === 0) {
          window.open("https://www.youtube.com/watch?v=80dqOwAOhbo", "_blank");
        } else {
          window.open("https://about.netflix.com/en", "_blank");
        }
        break;
        
      case KEY_RETURN:
        // Handle back button if needed
        break;
        
      default:
        break;
    }
  };

  const handleNavbarFocusEnd = () => {
    setFocusedButton(0);
    setTimeout(() => playButtonRef.current?.focus(), 100);
  };

  useEffect(() => {
    const buttons = heroButtonsRef.current;
  
    buttons?.addEventListener('keydown', handleKeyDown);
    buttons?.addEventListener('keypress', handleKeyDown);
    
    return () => {
      buttons?.removeEventListener('keydown', handleKeyDown);
      buttons?.removeEventListener('keypress', handleKeyDown);
    };
  }, [focusedButton]);

  useEffect(() => {
    if (focusedButton === 0) {
      playButtonRef.current?.focus();
    } else {
      infoButtonRef.current?.focus();
    }
  }, [focusedButton]);

  
  return (
    <div className="home">
      <Navbar onNavbarFocusEnd={handleNavbarFocusEnd} />
      
      <div className="hero">
        <img src={home_bg} alt="" className='banner-img'/>
        <div className="hero-capiton">
          <img src={Prot} alt="" className='capiton-img'/>
          <p>Discovering his ties to a secret ancient order, a young man living in modern Istanbul embarks on a quest to save the city from an immortal enemy.</p>
          <div className="hero-btns" ref={heroButtonsRef}>
            <button 
              ref={playButtonRef}
              className={`btn ${focusedButton === 0 ? 'focused' : ''}`}
              tabIndex="0"
              onFocus={() => {
                setFocusedButton(0);
                setShowFocusOutline(true);
              }}
              onBlur={() => setShowFocusOutline(false)}
            >
              <img src={Play} alt="Play"/>
              Play
            </button>
            <button 
              ref={infoButtonRef}
              className={`btn dark-btn ${focusedButton === 1 ? 'focused' : ''}`}
              tabIndex="0"
              onFocus={() => {
                setFocusedButton(1);
                setShowFocusOutline(true);
              }}
              onBlur={() => setShowFocusOutline(false)}
            >
              <img src={Info} alt="Info"/>
              More Info
            </button>
          </div>
        </div>
      </div>

      <div className="more-cards" ref={titleCardsRef}>
        {titleCardSections.map(({ title, category, idName }) => (
          <TitleCards 
            key={idName} 
            title={title} 
            category={category} 
            idName={idName} 
          />
        ))}
      </div>

      <Footer/>
    </div>
  );
}