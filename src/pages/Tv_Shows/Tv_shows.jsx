// import './Tv_shows.css'
// import Navbar from '../../components/Navbar/Navbar'
// import React from 'react'
// import TitleCards from '../../components/TitleCards/TitleCards'
// import Footer from '../../components/Footer/Footer'
//  export default function Tv_Shows() {
    
//     return (
//     <div className='Tv_Shows'>
//         <Navbar/>
//      <div className="block">
//        <TitleCards title={'Blockbuster Movies'} category={"top_rated"} idName={""}/>
//      </div>
//     <Footer/>
//  </div>
//   )
// }


import './Tv_shows.css'
import React, { useEffect, useRef } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import TitleCards from '../../components/TitleCards/TitleCards'
import Footer from '../../components/Footer/Footer'

export default function Tv_Shows() {
    const titleCardsRef = useRef(null)
    const navbarRef = useRef(null)
    const footerRef = useRef(null)

    // Tizen TV remote key handler
    const handleKeyDown = (e) => {
        // Tizen TV remote key codes
        const KEY_LEFT = 37
        const KEY_UP = 38
        const KEY_RIGHT = 39
        const KEY_DOWN = 40
        const KEY_ENTER = 13
        const KEY_RETURN = 10009
        const KEY_PLAY_PAUSE = 10252

        switch(e.keyCode) {
            case KEY_UP:
                e.preventDefault()
                // Move focus from TitleCards to Navbar
                if (document.activeElement.classList.contains('card')) {
                    const navbarItems = document.querySelectorAll('.navbar-left li[tabindex="0"]')
                    if (navbarItems.length > 0) {
                        navbarItems[navbarItems.length - 1].focus()
                    }
                }
                // Move focus from Footer to TitleCards
                else if (document.activeElement.closest('.footer')) {
                    const cards = document.querySelectorAll('.card')
                    if (cards.length > 0) {
                        cards[cards.length - 20].focus()
                        window.dispatchEvent(new CustomEvent('setCardFocus', { 
                            detail: cards.length - 1 
                        }))
                    }
                }
                break

            case KEY_DOWN:
                e.preventDefault()
                // Move focus from Navbar to TitleCards
                if (document.activeElement.closest('.navbar')) {
                    const firstCard = document.querySelector('.card')
                    if (firstCard) {
                        firstCard.focus()
                        window.dispatchEvent(new CustomEvent('setCardFocus', { 
                            detail: 0 
                        }))
                    }
                }
                // Move focus from TitleCards to Footer
                else if (document.activeElement.classList.contains('card')) {
                    const firstFooterItem = document.querySelector('.footer-icons a')
                    if (firstFooterItem) {
                        firstFooterItem.focus()
                        window.dispatchEvent(new CustomEvent('setFooterFocus', { 
                            detail: 0 
                        }))
                    }
                }
                break

            case KEY_LEFT:
            case KEY_RIGHT:
                // Let individual components handle their own horizontal navigation
                break

            case KEY_ENTER:
                // Trigger click on focused element
                if (document.activeElement) {
                    document.activeElement.click()
                }
                break

            case KEY_RETURN:
                // Go back in navigation history
                window.history.back()
                break

            case KEY_PLAY_PAUSE:
                // Handle play/pause if needed
                break

            default:
                break
        }
    }

    useEffect(() => {
        // Add keydown event listener
        window.addEventListener('keydown', handleKeyDown)

        // Set initial focus to first card
        const timer = setTimeout(() => {
            const firstCard = document.querySelector('.card')
            if (firstCard) {
                firstCard.focus()
                window.dispatchEvent(new CustomEvent('setCardFocus', { 
                    detail: 0 
                }))
            }
        }, 100)

        // Cleanup
        return () => {
            window.removeEventListener('keydown', handleKeyDown)
            clearTimeout(timer)
        }
    }, [])

    return (
        <div className='Tv_Shows'>
            <Navbar ref={navbarRef} />
            <div className="block">
                <TitleCards 
                    ref={titleCardsRef}
                    title={'Blockbuster Movies'} 
                    category={"top_rated"} 
                    idName={""}
                />
            </div>
            <Footer ref={footerRef} />
        </div>
    )
}