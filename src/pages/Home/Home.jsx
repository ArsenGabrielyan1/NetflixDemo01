import React from 'react'
import'./Home.css'
import Navbar from '../../components/Navbar/Navbar'
import home_bg from '../../assets/bg.png'
import Prot from '../../assets/img-prott.png'
import Play from '../../assets/play-47.png'
import Info from '../../assets/icon.png'
import TitleCards from '../../components/TitleCards/TitleCards'
import Footer from '../../components/Footer/Footer'

export default function Home() {
    return (
   <div className="home">
      <Navbar/>
      <div className="hero">
        <img src={home_bg} alt=""  className='banner-img'/>
      <div className="hero-capiton">
        <img src={Prot} alt=""  className='capiton-img'/>
        <p>Discovering his ties to a secret ancient
          order,a young man living in mordern Instambul embarks on a quest
          says the city from an immortal enemy.
        </p>
      <div className="hero-btns">
       <a href="https://www.youtube.com/watch?v=80dqOwAOhbo" target='blank'> <button className='btn'><img src={Play} alt=""/>Play</button></a>  
          <a href="https://about.netflix.com/en"><button  className='btn dark-btn'><img src={Info} alt=""/>  More Info</button></a>
        </div>
  </div>
    </div>
  <div className="more-cards">
    <TitleCards title={'Blockbuster Movies'} category={"top_rated"} idName={""}/>
    <TitleCards title={'Only on Netflix'} category={"popular"}  idName={"only"}/>
    <TitleCards title={'Upcoming'} category={"upcoming"} idName={"up"}/>
    <TitleCards title={'Top Pics for You'} category={"now_playing"} idName={"top"}/>
   </div>
  <Footer/>
   </div>
  )
}
