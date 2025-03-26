import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import TitleCards from '../../components/TitleCards/TitleCards'
import Footer from '../../components/Footer/Footer'
export default function Popular() {
    return (
        <div className='Tv_Shows'>
        <Navbar/>
        <h1>Upcoming</h1>
     <div className="block">
           <TitleCards title={'Upcoming'} category={"upcoming"} idName={"up"}/>
     </div>
  <Footer/>
</div>
  )
} 