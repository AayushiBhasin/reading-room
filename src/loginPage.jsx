import { useState } from 'react';
import './loginPage.css';
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
   const navigate = useNavigate();
   let[pass ,setpass]=useState("");
   let[num, setnum]=useState("");

   let AdminPass = import.meta.env.VITE_ADMIN_PASS

  let submitlogin =() => {
    
  if(pass==AdminPass){
     navigate("/home");
  }else{
   alert("Enter Correct Password!")
  }
  }

  let validatepass =(event)=>{
    setpass(event.target.value);
  }
  

  
  return (
    <div className="login-container">
      <div className="login-card">

        <div className="login-icon">
          <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      className="book-icon"
      stroke="#2f6ed37"
      fill="none"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 4h5a4 4 0 0 1 4 4v12a4 4 0 0 0-4-4H3z" />
      <path d="M21 4h-5a4 4 0 0 0-4 4v12a4 4 0 0 1 4-4h5z" />
    </svg>

        </div>

        <h1 className="title">Library Portal</h1>
        <p className="subtitle">
          Enter your credentials to access the library management system
        </p>

        <label> Number</label>
        <input className='login-input' type="text" placeholder="Enter your Number" value={num} onChange={(e)=>setnum(e.target.value)} />

        <label>Password</label>
        <div className="password-field">
          <input className='login-input' type="password" placeholder="Enter your password" value={pass} onChange={validatepass}  />
          

        </div>

        <button className="signIn-btn" onClick={submitlogin}>Sign In</button>

        
      </div>
    </div>
  );
}
