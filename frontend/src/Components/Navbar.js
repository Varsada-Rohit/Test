import React from 'react';
import { Link, NavLink } from 'react-router-dom';

export default function Navbar() {
   return (
      <nav className='navbar navbar-expand-lg navbar-light bg-light'>
         <div className='container'>
            <a className='navbar-brand' href='#'>
               Test
            </a>
            <button
               className='navbar-toggler'
               type='button'
               data-bs-toggle='collapse'
               data-bs-target='#navbarNav'
               aria-controls='navbarNav'
               aria-expanded='false'
               aria-label='Toggle navigation'
            >
               <span className='navbar-toggler-icon'></span>
            </button>

            <div className='collapse navbar-collapse' id='navbarNav'>
               <ul className='navbar-nav ms-auto '>
                  <li className='nav-item'>
                     <NavLink
                        to='/'
                        className='nav-link'
                        aria-current='page'
                        exact
                        activeClassName='active'
                     >
                        Home
                     </NavLink>
                  </li>
                  <li className='nav-item'>
                     <NavLink
                        to='/addproduct'
                        className='nav-link'
                        exact
                        activeClassName='active'
                     >
                        Add Product
                     </NavLink>
                  </li>
                  <li className='nav-item'>
                     <NavLink
                        className='nav-link'
                        to='/cart'
                        exact
                        activeClassName='active'
                     >
                        Cart
                     </NavLink>
                  </li>
               </ul>
            </div>
         </div>
      </nav>
   );
}
