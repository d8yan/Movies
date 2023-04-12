import React from 'react'

import styled from 'styled-components'
const Sort = () => {

    return (
        <Wrapper>
            <form>
                <label htmlFor='sort'>sort by</label>
                <select
                    name='sort' id='sort' className='sort-input'>
                    <option value='name-a'>title (a - z)</option>
                    <option value='name-z'>title (z - a)</option>
                </select>
            </form>
        </Wrapper>
    )
}

const Wrapper = styled.section`
  display: grid;
  grid-template-columns: auto auto 1fr auto;
  align-items: center;
  margin-bottom: 2rem;
  column-gap: 2rem;
  @media (max-width: 576px) {
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 0.75rem;
    .btn-container {
      width: 50px;
    }
    label {
      display: inline-block;
      margin-right: 0.5rem;
    }
  }
  @media (min-width: 768px) {
    column-gap: 2rem;
  }
  p {
    text-transform: capitalize;
    margin-bottom: 0;
  }
  
  .sort-input {
    border-color: transparent;
    font-size: 1rem;
    text-transform: capitalize;
    padding: 0.25rem 0.5rem;
  }
  label {
    font-size: 1rem;
    text-transform: capitalize;
  }
`

export default Sort