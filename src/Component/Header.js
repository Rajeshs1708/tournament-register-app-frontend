import React from 'react'
import { Link } from 'react-router-dom'

function Header () {
  return (
    <>
      <nav
        className='navbar navbar-expand-lg'
        style={{ backgroundColor: '#e3f2fd' }}
      >
        <div className='container-fluid'>
          <Link to='/' className='navbar-brand fs-3'>
            Tournament
          </Link>
          <button
            className='navbar-toggler'
            type='button'
            data-bs-toggle='collapse'
            data-bs-target='#navbarNavAltMarkup'
            aria-controls='navbarNavAltMarkup'
            aria-expanded='false'
            aria-label='Toggle navigation'
          >
            <span className='navbar-toggler-icon'></span>
          </button>
          <div className='collapse navbar-collapse' id='navbarNavAltMarkup'>
            <div className='navbar-nav fs-5 ms-auto'>
              <Link to='/' className='nav-link' aria-current='page'>
                Tournaments List
              </Link>
              <Link to='/participant' className='nav-link'>
                Participants List
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Header
