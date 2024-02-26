import React from 'react'
import { NavLink } from 'react-router-dom'
import "./Header.css"

const Header = () => {
  return (
    <div className='navBar'>

<NavLink to = '/'>
        <img src='/Images/p1.png' className='logo'/>
    </NavLink>

        <ul className='nav-elements'>
            <li>
                <NavLink to ='/'>Home </NavLink>
            </li>

            <li>
                <NavLink to ='/about'>About </NavLink>
            </li>

            <li>
                <NavLink to ='/services'>Services</NavLink>
            </li>

            <li>
                <NavLink to ='/contact'>Contact</NavLink>
            </li>
            <div className="choose-button">
                <button>Choose for me</button>
              </div>

            <div className="sign-button">
                <button>Sign In</button>
              </div>
           

        </ul>

        </div>
   
  )
}

export default Header