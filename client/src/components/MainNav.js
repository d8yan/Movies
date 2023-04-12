import styled from 'styled-components'
import logo from '../assets/iconn.svg'
import { FaBars } from 'react-icons/fa';
import { links } from '../data'
import axios from 'axios'

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const MainNav = ({ use, setUse }) => {

  const [showLinks, setShowLinks] = useState(false)
  const [currentuser, setCurrentUser] = useState('')
  // navigate = useNavigate();

  useEffect(() => {

    const initializePage = async () => {
      try {
        const data = await axios.get('/apime/user/userCheck')
        setCurrentUser(data.data.user.role);
      }
      catch (error) {
        console.log(error)
      }
    }

    initializePage();

  })
  //}) - run use effect everytime a useState's value is updated
  //}[]) - run useEffect only once when the component is mounted/loaded
  //},[showLinks]) - run useEffect only when the value of showLinks is updated


  const HandleDoLogout = async (e) => {
    e.preventDefault()
    try {
      const result = await axios.get("/apime/user/logout");
      setUse('')
      window.location.href = '/client/';
    }
    catch (error) {
      console.log(error)
    }

  }

  const HandleAdmin = (e) => {
    e.preventDefault()
    window.location.href = '/client/adminReviews';
  }
  return (
    <nav>
      <div className='nav-center'>
        <div className='nav-header'>
          <img src={logo} alt="logo" />
          <button className='nav-toggle' onClick={() => setShowLinks(!showLinks)}>

            <FaBars />
          </button>
        </div>

        <div className='links-container show-container'>
          <ul className='links'>
            {links.map((link) => {
              const { id, url, text, icon } = link
              if (id === 3) {
                return (
                  <div className="dropdown" key={id}>
                    <a key={id}> {icon} {text}
                      <i className="fa fa-caret-down"></i>
                    </a>
                    
                    <div className="dropdown-content">
                      <a className="sublink"href="/client/documentation">Customer Doc</a>
                      <a className="sublink"href="/swagger-docs/">Swagger Doc</a>
                    </div>
                  
                  </div>
                );
              }
              if (id != 6 && id != 5 && id != 4) {
                return (
                  <li key={id}>
                    <a href={url}>{icon} {text}</a>
                  </li>
                )
              }
              if (id != 6 && id != 5 && use != '' && currentuser != 'administrator') {
                return (
                  <li key={id}>
                    <a href={url}>{icon} {text}</a>
                  </li>
                )
              }
              if (use == '' && (id == 6 || id == 5)) {
                return (
                  <li key={id}>
                    <a href={url}>{icon} {text}</a>
                  </li>
                )
              }

            })}

            {use == '' ? ''
              : currentuser == 'administrator' ?
                (<>
                  <li><a href=''>Hello {use}</a></li>
                  <li><a href='' onClick={HandleDoLogout}>Logout</a></li>
                  <li><a href='' onClick={HandleAdmin}>Admin Panel</a></li>
                </>)
                : currentuser == 'user' ?
                  (<>
                    <li><a href=''>Hello {use}</a></li>
                    <li><a href='' onClick={HandleDoLogout}>Logout</a></li>
                  </>)
                  : ''
            }
          </ul>
        </div>


      </div>
    </nav>)
}
// const nav = styled.nav`
//    height: 5rem;
//   display: flex;
//   align-items: center;
//   justify-content: center;

//   .nav-center {
//     width: 90vw;
//     margin: 0 auto;
//     max-width: var(--max-width);
//   }
//   .nav-header {
//     display: flex;
//     align-items: center;
//     justify-content: space-between;
//     img {
//       width: 175px;
//       margin-left: -15px;
//     }
//   }
//   .nav-toggle {
//     background: transparent;
//     border: transparent;
//     color: var(--clr-rust-1);
//     cursor: pointer;
//     svg {
//       font-size: 2rem;
//     }
//   }
//   .nav-links {
//     display: none;
//   }
//   .cart-btn-wrapper {
//     display: none;
//   }
//   @media (min-width: 992px) {
//     .nav-toggle {
//       display: none;
//     }
//     .nav-center {
//       display: grid;
//       grid-template-columns: auto 1fr auto;
//       align-items: center;
//     }
//     .nav-links {
//       display: flex;
//       justify-content: center;
//       li {
//         margin: 0 0.5rem;
//       }
//       a {
//         color: var(--clr-grey-3);
//         font-size: 1rem;
//         text-transform: capitalize;
//         letter-spacing: var(--spacing);
//         padding: 0.5rem;
//         &:hover {
//           border-bottom: 2px solid var(--clr-primary-7);
//         }
//       }
//     }
    
//   }
// `
export default MainNav


