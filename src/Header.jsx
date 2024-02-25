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

        </ul>

        </div>
   
  )
}

export default Header