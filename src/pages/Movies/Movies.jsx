import React, { useEffect, useRef } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import TitleCards from '../../components/TitleCards/TitleCards'
import Footer from '../../components/Footer/Footer'

export default function Movies() {
    const titleCardsRef = useRef(null)
    const navbarRef = useRef(null)
    const footerRef = useRef(null)

    
    const handleKeyDown = (e) => {
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
           
                if (document.activeElement.classList.contains('card')) {
                    const navbarProfile = document.querySelector('.navbar-profile')
                    if (navbarProfile) {
                        navbarProfile.focus()
                    }
                }
      
                else if (document.activeElement.closest('.footer')) {
                    const lastCard = document.querySelector('.card')
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

                if (document.activeElement.closest('.navbar')) {
                    const firstCard = document.querySelector('.card')
                    if (firstCard) {
                        firstCard.focus()
                        window.dispatchEvent(new CustomEvent('setCardFocus', {
                            detail: 0
                        }))
                    }
                }
    
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
 
                break

            default:
                break
        }
    }

    useEffect(() => {

        window.addEventListener('keydown', handleKeyDown)


        const focusTimer = setTimeout(() => {
            const firstCard = document.querySelector('.card')
            if (firstCard) {
                firstCard.focus()
                window.dispatchEvent(new CustomEvent('setCardFocus', {
                    detail: 0
                }))
            }
        }, 300)


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