import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import TitleCards from '../../components/TitleCards/TitleCards'
import Footer from '../../components/Footer/Footer'

export default function Movies() {
    return (
       <div className='Tv_Shows'>
        <Navbar/>
        <h1>Only on Netflix</h1>
     <div className="block">
       <TitleCards title={'Only on Netflix'} category={"popular"}  idName={"only"}/>
     </div>
  <Footer/>
</div>
  )
}
