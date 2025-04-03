import React, { useState, useEffect, useRef } from 'react';
import './Footer.css';
import face from '../../assets/11.png';
import vk from '../../assets/44.png';
import twiter from '../../assets/33.png';
import instagram from '../../assets/22.png';

export default function Footer() {
  const [footerlist] = useState([
    {id: 1, name: 'Audio Description'},
    {id: 2, name: 'Help Centre'},
    {id: 3, name: 'Gift Cards'},
    {id: 4, name: 'Media Center'},
    {id: 5, name: 'Investor Relations'},
    {id: 6, name: 'Jobs'},
    {id: 7, name: 'Terms of Use'},
    {id: 8, name: 'Privacy'},
    {id: 9, name: 'Legal Notices'},
    {id: 10, name: 'Cookie Preferences'},
    {id: 11, name: 'Corporate Information'},
    {id: 12, name: 'Contact Us'},
  ]);
  
  const totalSocialItems = 4;
  const totalListItems = footerlist.length;
  const totalItems = totalSocialItems + totalListItems + 1;
  
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const socialIconsRef = useRef([]);
  const listItemsRef = useRef([]);
  const footerRef = useRef(null);

  useEffect(() => {
    socialIconsRef.current = socialIconsRef.current.slice(0, totalSocialItems);
    listItemsRef.current = listItemsRef.current.slice(0, totalListItems);
  }, [footerlist]);

  useEffect(() => {
    if (footerRef.current) {
      footerRef.current.setAttribute('tabindex', '-1');
    }
  }, []);

  const focusElement = (index) => {
    if (index < totalSocialItems) {
      socialIconsRef.current[index]?.focus();
    } else if (index < totalSocialItems + totalListItems) {
      listItemsRef.current[index - totalSocialItems]?.focus();
    } else {
      document.querySelector('.copyright-text')?.focus();
    }
  };

  const handleKeyDown = (e) => {

    const KEY_LEFT = 37;
    const KEY_UP = 38;
    const KEY_RIGHT = 39;
    const KEY_DOWN = 40;
    const KEY_ENTER = 13;
    const KEY_RETURN = 10009;
    
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

      case KEY_UP:
        e.preventDefault();
        // Navigate to Top Picks section
        const topSection = document.getElementById('top');
        if (topSection) {
          const cards = topSection.querySelectorAll('.card');
          if (cards.length > 0) {
            // Focus last card of Top Picks section
            cards[cards.length - 1].focus();
            topSection.classList.add('nav-highlight');
            topSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            // Dispatch focus event
            window.dispatchEvent(new CustomEvent('setCardFocus', {
              detail: cards.length - 1,
              section: 3 // 3 corresponds to Top Picks
            }));
          }
        }
        break;

      case KEY_DOWN:
        e.preventDefault();
        // Navigate back to hero buttons
        const playButton = document.querySelector('.hero-btns .btn');
        if (playButton) {
          playButton.focus();
          window.dispatchEvent(new CustomEvent('focusHeroButton', { detail: 0 }));
        }
        break;
        
      case KEY_ENTER:
        if (focusedIndex >= 0 && focusedIndex < totalSocialItems) {
          socialIconsRef.current[focusedIndex]?.click();
        }
        break;
        
      default:
        break;
    }
  };

  useEffect(() => {
    const footer = footerRef.current;
    
    const handleSetFocus = (e) => {
      setFocusedIndex(e.detail);
      focusElement(e.detail);
    };

    footer?.addEventListener('setFooterFocus', handleSetFocus);
    footer?.addEventListener('keydown', handleKeyDown);
    
    return () => {
      footer?.removeEventListener('setFooterFocus', handleSetFocus);
      footer?.removeEventListener('keydown', handleKeyDown);
    };
  }, [focusedIndex]);

  return (
    <div className="footer" ref={footerRef}>
      <div className="footer-icons">
        <a 
          href="https://www.facebook.com/netflix/?locale=ru_RU" 
          target="_blank"
          rel="noopener noreferrer"
          ref={el => socialIconsRef.current[0] = el}
          tabIndex="0"
          className={focusedIndex === 0 ? 'focused' : ''}
        >
          <img src={face} alt="Facebook" />
        </a>
        <a 
          href="https://vk.com/netflix18" 
          target="_blank"
          rel="noopener noreferrer"
          ref={el => socialIconsRef.current[1] = el}
          tabIndex="0"
          className={focusedIndex === 1 ? 'focused' : ''}
        >
          <img src={vk} alt="VK" />
        </a>
        <a 
          href="https://x.com/netflix?&mx=2" 
          target="_blank"
          rel="noopener noreferrer"
          ref={el => socialIconsRef.current[2] = el}
          tabIndex="0"
          className={focusedIndex === 2 ? 'focused' : ''}
        >
          <img src={twiter} alt="Twitter"/>
        </a>
        <a 
          href="https://www.instagram.com/netflix/" 
          target="_blank"
          rel="noopener noreferrer"
          ref={el => socialIconsRef.current[3] = el}
          tabIndex="0"
          className={focusedIndex === 3 ? 'focused' : ''}
        >
          <img src={instagram} alt="Instagram" />
        </a>
      </div>
      <ul>
        {footerlist.map((item, index) => (
          <li 
            key={item.id}
            ref={el => listItemsRef.current[index] = el}
            tabIndex="0"
            className={focusedIndex === index + totalSocialItems ? 'focused' : ''}
          >
            {item.name}
          </li>
        ))}
      </ul>
      <p 
        tabIndex="0"
        ref={el => {
          if (el) {
            listItemsRef.current[totalListItems] = el;
          }
        }}
        className={`copyright-text ${focusedIndex === totalItems - 1 ? 'focused' : ''}`}
      >
        @ 1997-2023 Netflix, Inc.
      </p>
    </div>
  );
}