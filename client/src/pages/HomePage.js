import React, { useEffect } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import homeImg from '../assets/oldCamera.jpg'


const HomePage = ({ use, setUse }) => {

  useEffect(() => {
    console.log('homepage user: ' + use)

    const initializePage = async () => {
      try {
        const data = await axios.get('/apime/user/userCheck')
        setUse(data.data.user.username)
      }
      catch (error) {
        console.log(error)
      }
    }

    initializePage();

  }, [])



  return (

    <>

      <Wrapper className='page section section-center'>
        <img src={homeImg} alt='camera' />
        <article>
          <div className='title'>
            <h2>APIMe!!!</h2>
            <div className='underline'></div>
          </div>
          <p>
            APIMe! will provide a learning tool for students in the SQA courses and programs at Conestoga College.
            The web application will allow students to create accounts and log in to the system, and could also
            be used to restrict access to certain parts of the website.
            Moreover, the publicly available API will allow students to select HTTP request
            methods and receive response codes for the purpose of practicing their skills in API testing.
          </p>
        </article>
      </Wrapper>
    </>
  )
}

const Wrapper = styled.section`
  display: grid;
  gap: 4rem;
 
  img {
    width: 100%;
    display: block;
    border-radius: var(--radius);
    height: 500px;
    object-fit: cover;
  }
  p {
    line-height: 2;
    max-width: 45em;
    margin: 0 auto;
    margin-top: 2rem;
    color: var(--clr-rust-1);
  }
  .title {
    text-align: left;
  }
  .underline {
    margin-left: 0;
  }
  @media (min-width: 992px) {
    grid-template-columns: 1fr 1fr;
  }
`
export default HomePage
