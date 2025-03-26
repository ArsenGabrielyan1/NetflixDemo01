import './Tv_shows.css'
import Navbar from '../../components/Navbar/Navbar'
import React from 'react'
import TitleCards from '../../components/TitleCards/TitleCards'
import Footer from '../../components/Footer/Footer'
 export default function Tv_Shows() {
    
    return (
    <div className='Tv_Shows'>
        <Navbar/>
        <h1>Blockbuster Movies</h1>
     <div className="block">
       <TitleCards title={'Blockbuster Movies'} category={"top_rated"} idName={""}/>
     </div>
    <Footer/>
 </div>
  )
}
