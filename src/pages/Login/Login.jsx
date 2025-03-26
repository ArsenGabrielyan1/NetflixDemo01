import React, { useState } from 'react'
import './Login.css'
import logon from '../../assets/logo-netflix.jpeg'

import netflix_spinner from '../../assets/gifs/netflix-gif.gif'
import { useNavigate } from 'react-router-dom'


export default function Login() {
  const [signState,setSignState] = useState("Sign In")
  const [name,setName] = useState("")
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  
  const user_auth = async (event) => {
    event.preventDefault();
     setLoading(true)
    if(signState==="Sign In"){
  await login(email, password)
     navigate(-1)
    } else{
    await signup(name,email,password)
    }
    setLoading(false)
  }
   const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
   }

  return (
  loading?<div className='login-spinner'>
  <img src={netflix_spinner} alt="" />
</div> :
   <div className="login">
    <img src={logon} alt="" className='login-logo' />
    <div className="login-form">
    <h1>{signState}</h1>
    
    <form>
        {signState === "Sign Up" ?
        <input type="text" placeholder='Your Name' 
        value={name}  onChange={(e)=>{setName(e.target.value)}}/>:
        <></>  }
       <input type="email" placeholder='Email'  value={email}
       onChange={(e)=>{setEmail(e.target.value)}}/>
       <input type="password" placeholder='password'  value={password}
       onChange={(e)=>{setPassword(e.target.value)}}/>
       <button onClick={user_auth} type='submit' >{signState}</button>
      
      <div className="form-help">
        <div className="remember">
          <input type="checkbox"
        id="checkbox"
        checked={isChecked}
        onChange={handleCheckboxChange}
      />
      <label htmlFor="checkbox">
        {isChecked ? "Remember Me" : "Remember Me"}
      </label>
         </div>
       <p>Need Help?</p>
     </div>
     </form>
    
     <div className="form-switch">
     { signState=== "Sign In" ?  
      <p>New to Netflix <span onClick={()=>{setSignState("Sign Up ")}}>Sign Up Now</span></p> 
      :<p>Already have account <span onClick={()=>{setSignState("Sign In ")}}>Sign In Now</span></p>
     } 
     </div>
   </div>
   </div>
)
}