import React from 'react'
import './Nav.css'
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <>
      <nav className='nav'>
        <ul className='nav--ul'>
            <li className='nav--ul-li'>
              <Link className='nav--ul-li-a'to="/">Parts</Link>
            </li>
            <li className='nav--ul-li'>
              <Link className='nav--ul-li-a' to="parts/create">Create</Link>
            </li>
        </ul>
       
      </nav>
    </>
  )
}

export default Nav