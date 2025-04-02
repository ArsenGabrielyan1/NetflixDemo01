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

  // Tizen TV remote key handler
  const handleKeyDown = (e) => {
    // Tizen TV remote specific key codes
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
        if (document.activeElement === playButtonRef.current || 
            document.activeElement === infoButtonRef.current) {
          document.querySelector('.navbar-profile')?.focus();
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
        // Move focus to first TitleCard
        const firstCard = document.querySelector('.card');
        if (firstCard) {
          firstCard.focus();
          // Dispatch event to set focus on first card
          window.dispatchEvent(new CustomEvent('setCardFocus', { 
            detail: 0
          }));
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
    
    // Add both keydown and keypress for Tizen compatibility
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
        <TitleCards title={'Blockbuster Movies'} category={"top_rated"} idName={""}/>
        <TitleCards title={'Only on Netflix'} category={"popular"} idName={"only"}/>
        <TitleCards title={'Upcoming'} category={"upcoming"} idName={"up"}/>
        <TitleCards title={'Top Pics for You'} category={"now_playing"} idName={"top"}/>
      </div>

   
      
      <Footer/>
    </div>
  );
}

