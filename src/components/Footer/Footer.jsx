import React from 'react'
import './Footer.css'
import face from '../../assets/11.png'
import vk from '../../assets/44.png'
import twiter from '../../assets/33.png'
import instagram from '../../assets/22.png'
import { useState } from 'react'

 export default function Footer() {
  const [footerlist, setFooterList] = useState([
    {id: 1, name: 'Audio Description'},
    {id: 2, name: 'Help Centre'},
    {id: 3, name: 'Gift Cards'},
    {id: 4, name: 'Media Center'},
    {id: 5, name: 'Investor Realations'},
    {id: 6, name: 'Jobs'},
    {id: 7, name: 'Terms of Use'},
    {id: 8, name: 'Privacy'},
    {id: 9, name: 'Legal Notices'},
    {id: 10, name: 'Cookie Preferencec'},
    {id: 11, name: 'Corporate Information'},
    {id: 12, name: 'Contact Us'},
  ])
  return (
  <div className="footer">
   <div className="footer-icons">
  <a href="https://www.facebook.com/netflix/?locale=ru_RU" target='blank'>  <img src={face} alt=""  /></a>
  <a href="https://vk.com/netflix18" target='blank'> <img src={vk} alt="" /></a>
  <a href="https://x.com/netflix?&mx=2" target='blank'> <img src={twiter} alt=""/></a>
  <a href="https://www.instagram.com/netflix/" target='blank'> <img src={instagram} alt="" /></a>
 </div>
  <ul>
    {footerlist.map((item) => (
     <li key={item.id}>{item.name}</li>
   ))}
  </ul>
<p className='copyright-text'>@ 1997-2023 Netflix,Inc.</p>
</div>
  )
}