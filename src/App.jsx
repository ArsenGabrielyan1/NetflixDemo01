import './App.css'
import Home from './pages/Home/Home'
import {Routes,Route,} from 'react-router-dom'
import Login from './pages/Login/Login'
import Player from './pages/Player/Player'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import Tv_Shows from './pages/Tv_Shows/Tv_Shows'
import Movies from './pages/Movies/Movies'
import Popular from './pages/Popular/Popular'
import My_list from './pages/My_List/My_list'
import Trailer from './pages/Player/Trailer'

function App() {
  return (
  <div className="App">
  <ToastContainer  theme='dark'/>
  <Routes>
    <Route path='/' element={<Home/>} />
    <Route path='/login' element={<Login/>}/>
    <Route path='/player/:id' element={<Player/>}/>
    <Route path='/Tv_shows' element={<Tv_Shows/>} /> 
    <Route path='/Movies' element={<Movies/>} /> 
    <Route path='/popular' element={<Popular/>}/>
    <Route path='/my_list' element={<My_list/>}/>
    <Route path="/trailer/:id" element={<Trailer />} />
</Routes>
</div>
  )
}

export default App
