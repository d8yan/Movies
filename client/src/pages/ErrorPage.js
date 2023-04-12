import { Link } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import styled from 'styled-components'
const Error = () => {
  const location = useLocation();
  let error = location.state.error;
  let code = location.state.code;

  return (
    <Wrapper className='page-100'>
      <section>
        <h1>{code}</h1>
        <h3>{error}</h3>
        <Link to='/' className='btn'>
          back home
        </Link>
      </section>
    </Wrapper>
  )
}
const Wrapper = styled.main`
  background: var(--clr-primary-10);
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  h1 {
    font-size: 10rem;
  }
  h3 {
    text-transform: none;
    margin-bottom: 2rem;
  }
`
export default Error;