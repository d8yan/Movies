import React from 'react'
import styled from 'styled-components'
const Footer = () => {
  return (
    <Wrapper>
      <h5>&copy; {new Date().getFullYear()}
        <span> APIMe!
        </span>
      </h5>
      <h5>All rights reserved</h5>
    </Wrapper>
  )
}

const Wrapper = styled.footer`
position: fixed;
  left: 0;
  width: 100%;
  height: 5rem;
  bottom:0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: var(--clr-rust-2);
  text-align: center;
  span {
    color: var(--clr-rust-1);
  }
  h5 {
    color: var(--clr-rust-1);
    margin: 0.1rem;
    font-weight: 400;
    text-transform: none;
    line-height: 1.25;
  }
  @media (min-width: 776px) {
    flex-direction: row;
  }
  
`

export default Footer