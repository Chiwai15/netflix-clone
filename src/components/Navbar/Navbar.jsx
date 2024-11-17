
import React, { useEffect, useRef, useState } from 'react'
import './Navbar.css'
import logo from '../../assets/logo.png'
import bell_icon from '../../assets/bell_icon.svg'
import caret_icon from '../../assets/caret_icon.svg'
import profile_img from '../../assets/profile_img.png'
import search_icon from '../../assets/search_icon.svg'
import { login, logout } from '../../utils/firebase'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';

const Navbar = () => {

  const navRef = useRef();
  const navigate = useNavigate();
  const [signState, setSignState] = useState("Sign In")
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(()=>{
    const handleScroll = () => {
      if (navRef.current) {  // Check if navRef.current is not null
        if (window.scrollY >= 80) {
          navRef.current.classList.add('nav-dark');
        } else {
          navRef.current.classList.remove('nav-dark');
        }
      }
    };
  
    window.addEventListener('scroll', handleScroll);
  
    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  },[])

  return (
    <div ref={navRef} className='navbar'>
      <div className="navbar-left">
        <img src={logo} alt="" onClick={() => {navigate('/')}}/>
        <ul>
            <li>Home</li>
            <li>TV Shows</li>
            <li>Movies</li>
            <li>New & Popular</li>
            <li>My List</li>
            <li>Browse by Languages</li>
        </ul>
      </div>
      
      <div className="navbar-right">
        <img src={search_icon} alt="" className='icons' />
        <p className='navbar-kids'>Kids</p>
        <img src={bell_icon} alt="" className='icons' />
        <div className="navbar-profile">
            <img src={profile_img} alt="" className='profile-img' />
            <img src={caret_icon} alt="" className='caret-icon'/>
            <div className="dropdown">
              {
                isAuthenticated 
                ? <p onClick={()=>{logout()}}>Sign Out of Netflix</p>
                : <p onClick={()=>{navigate('/login')}}>Sign in</p>
              }
            </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
