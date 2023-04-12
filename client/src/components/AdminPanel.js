import React from 'react'
import styled from 'styled-components'
function AdminPanel() {
    return (

        <nav>
            <ul className='navbar-nav'>
                <li className='nav-item'>
                    <a className='nav-link' href="/client/adminReviews">Admin Reviews</a>
                </li>
                <li className='nav-item'>
                    <a className='nav-link' href="/client/adminMovies">Admin Movies</a>
                </li>

            </ul>
        </nav>

    )
}
const nav = styled.nav`
 
  display: flex;
  align-items: left;
  justify-content: left;
 
`
export default AdminPanel