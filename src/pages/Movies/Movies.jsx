// import React from 'react'
// import Navbar from '../../components/Navbar/Navbar'
// import TitleCards from '../../components/TitleCards/TitleCards'
// import Footer from '../../components/Footer/Footer'

// export default function Movies() {
//     return (
//        <div className='Tv_Shows'>
//     <Navbar/>
//        <div className="block">
//       <TitleCards title={'Only on Netflix'} category={"popular"}  idName={"only"}/>
//      </div>
//   <Footer/>
// </div>
//   )
// }


import React, { useEffect, useRef } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import TitleCards from '../../components/TitleCards/TitleCards'
import Footer from '../../components/Footer/Footer'

export default function Movies() {
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
                // Navigation from TitleCards to Navbar
                if (document.activeElement.classList.contains('card')) {
                    const navbarProfile = document.querySelector('.navbar-profile')
                    if (navbarProfile) {
                        navbarProfile.focus()
                    }
                }
                // Navigation from Footer to TitleCards
                else if (document.activeElement.closest('.footer')) {
                    const lastCard = document.querySelector('.card:last-child')
                    if (lastCard) {
                        lastCard.focus()
                        window.dispatchEvent(new CustomEvent('setCardFocus', {
                            detail: document.querySelectorAll('.card').length - 1
                        }))
                    }
                }
                break

            case KEY_DOWN:
                e.preventDefault()
                // Navigation from Navbar to TitleCards
                if (document.activeElement.closest('.navbar')) {
                    const firstCard = document.querySelector('.card')
                    if (firstCard) {
                        firstCard.focus()
                        window.dispatchEvent(new CustomEvent('setCardFocus', {
                            detail: 0
                        }))
                    }
                }
                // Navigation from TitleCards to Footer
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

            case KEY_ENTER:
                if (document.activeElement) {
                    document.activeElement.click()
                }
                break

            case KEY_RETURN:
                window.history.back()
                break

            case KEY_PLAY_PAUSE:
                // Handle play/pause functionality if needed
                break

            default:
                break
        }
    }

    useEffect(() => {
        // Add event listeners
        window.addEventListener('keydown', handleKeyDown)

        // Set initial focus to first card after slight delay
        const focusTimer = setTimeout(() => {
            const firstCard = document.querySelector('.card')
            if (firstCard) {
                firstCard.focus()
                window.dispatchEvent(new CustomEvent('setCardFocus', {
                    detail: 0
                }))
            }
        }, 300)

        // Cleanup
        return () => {
            window.removeEventListener('keydown', handleKeyDown)
            clearTimeout(focusTimer)
        }
    }, [])

    return (
        <div className='Tv_Shows'>
            <Navbar ref={navbarRef} />
            <div className="block">
                <TitleCards 
                    ref={titleCardsRef}
                    title={'Only on Netflix'} 
                    category={"popular"} 
                    idName={"only"}
                />
            </div>
            <Footer ref={footerRef} />
        </div>
    )
}