// import React from 'react'
// import Navbar from '../../components/Navbar/Navbar'
// import TitleCards from '../../components/TitleCards/TitleCards'
// import Footer from '../../components/Footer/Footer'
// export default function Popular() {
//     return (
//         <div className='Tv_Shows'>
//         <Navbar/>
       
//      <div className="block">
//            <TitleCards title={'Upcoming'} category={"upcoming"} idName={"up"}/>
//      </div>
//   <Footer/>
// </div>
//   )
// } 


import React, { useEffect, useRef } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import TitleCards from '../../components/TitleCards/TitleCards';
import Footer from '../../components/Footer/Footer';

export default function Popular() {
  const titleCardsRef = useRef(null);
  const navbarRef = useRef(null);
  const footerRef = useRef(null);

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
        // Move focus from TitleCards to Navbar
        if (document.activeElement.classList.contains('card')) {
          const navbarItems = document.querySelectorAll('.navbar-left li[tabindex="0"]');
          if (navbarItems.length > 0) {
            navbarItems[navbarItems.length - 1].focus();
          }
        }
        // Move focus from Footer to TitleCards
        else if (document.activeElement.closest('.footer')) {
          const cards = document.querySelectorAll('.card');
          if (cards.length > 0) {
            cards[cards.length - 1].focus();
            window.dispatchEvent(new CustomEvent('setCardFocus', { 
              detail: cards.length - 1 
            }));
          }
        }
        break;

      case KEY_DOWN:
        e.preventDefault();
        // Move focus from Navbar to TitleCards
        if (document.activeElement.closest('.navbar')) {
          const firstCard = document.querySelector('.card');
          if (firstCard) {
            firstCard.focus();
            window.dispatchEvent(new CustomEvent('setCardFocus', { 
              detail: 0 
            }));
          }
        }
        // Move focus from TitleCards to Footer
        else if (document.activeElement.classList.contains('card')) {
          const firstFooterItem = document.querySelector('.footer-icons a');
          if (firstFooterItem) {
            firstFooterItem.focus();
            window.dispatchEvent(new CustomEvent('setFooterFocus', { 
              detail: 0 
            }));
          }
        }
        break;

      case KEY_LEFT:
      case KEY_RIGHT:
        // Handle left/right navigation within components
        // The individual components (TitleCards, Navbar, Footer) will handle their own horizontal navigation
        break;

      case KEY_ENTER:
        // Handle enter key for the focused element
        if (document.activeElement) {
          document.activeElement.click();
        }
        break;

      case KEY_RETURN:
        // Handle return/back button
        window.history.back();
        break;

      case KEY_PLAY_PAUSE:
        // Handle play/pause button if needed
        break;

      default:
        break;
    }
  };

  useEffect(() => {
    // Add event listener when component mounts
    window.addEventListener('keydown', handleKeyDown);

    // Set initial focus to the first TitleCard
    const firstCard = document.querySelector('.card');
    if (firstCard) {
      firstCard.focus();
      window.dispatchEvent(new CustomEvent('setCardFocus', { 
        detail: 0 
      }));
    }

    // Clean up event listener when component unmounts
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className='Tv_Shows' ref={titleCardsRef}>
      <Navbar ref={navbarRef} />
      
      <div className="block">
        <TitleCards 
          title={'Upcoming'} 
          category={"upcoming"} 
          idName={"up"}
          ref={titleCardsRef}
        />
      </div>
      
      <Footer ref={footerRef} />
    </div>
  );
}