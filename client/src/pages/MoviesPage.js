import React, { useState, useEffect, useRef } from 'react'
import Pagination from '../components/Pagination'
import SearchBox from '../components/SearchBox'
import styled from 'styled-components'
import axios from 'axios'
import Movie from '../components/Movie'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'


import Sort from '../components/Sort'
import { generatePath, useNavigate } from 'react-router-dom'

function MoviesPage({ use, setUse }) {
  const [movies, setMovies] = useState([])

  const [value, setValue] = useState('')
  const valueRef = useRef('')

  const [sortValue, setSortValue] = useState('')
  const sortRef = useRef('')

  const [filter, setFilter] = useState('')
  const filterRef = useRef('')

  const [currentPage, setCurrentPage] = useState(1);
  const currentPageRef = useRef(1)

  const [moviesPerPage] = useState(9);
  const [totalMovies, setTotalMovies] = useState(1);
  const [fullUrl, setFullUrl] = useState('/apime/movies?page=1')
  const [trigger, setTrigger] = useState(false)
  const hasMounted = useRef(false)
  const basedUrl = '/apime/movies?page=1';
  const navigate = useNavigate();

  const totalPages = Math.ceil(totalMovies / moviesPerPage)

  useEffect(() => {
    if (hasMounted.current) {
      console.log('1st use effect')
      const exec = async () => {
        try {
          const { data: { movies, totalCount } } = await axios.get(fullUrl)
          setMovies(movies);
          setTotalMovies(totalCount)
        }
        catch (error) {
          console.log(error.response.data.msg)
          navigate('/error', { state: { error: error.response.data.msg, code: error.response.status } })

        }
      }
      exec()
    }
    else {
      hasMounted.current = true
    }

  }, [fullUrl])

  useEffect(() => {
    console.log('hello init use effect')
    const initializePage = async () => {
      try {
        const { data: { movies, totalCount } } = await axios.get(basedUrl)
        setMovies(movies)
        setTotalMovies(totalCount)

        const data = await axios.get('/apime/user/userCheck')
        setUse(data.data.user.username)
      }
      catch (error) {
        navigate('/error', { state: { error: error.response.data.msg, code: error.response.status } })

      }
    }

    initializePage();

  }, [])

  const clearFilter = async () => {
    setValue("");
    setFilter("");
    setSortValue("");
    valueRef.current = ''
    sortRef.current = ''
    filterRef.current = ''
    currentPageRef.current = 1
    setCurrentPage(currentPageRef.current)
    try {
      const { data: { movies, totalCount } } = await axios.get(basedUrl)
      setMovies(movies);
      setTotalMovies(totalCount)

    }
    catch (error) {
      console.log(error)
    }

  }

  const handleSearch = async (e) => {
    e.preventDefault()

    valueRef.current = value
    sortRef.current = sortValue
    filterRef.current = filter
    currentPageRef.current = 1
    setCurrentPage(currentPageRef.current)
    setFullUrl(`/apime/movies?page=${currentPageRef.current}&title=${valueRef.current}&category=${filterRef.current}&sort=${sortRef.current}`)
  }

  const handlePageChange = async (pageNumber) => {
    currentPageRef.current = pageNumber
    setCurrentPage(pageNumber);
    setFullUrl(`/apime/movies?page=${currentPageRef.current}&title=${valueRef.current}&category=${filterRef.current}&sort=${sortRef.current}`)
    
  };

  const startIndex = (currentPage - 1) * moviesPerPage;
  const endIndex = startIndex + moviesPerPage;
  const currentMovies = movies.slice(startIndex, endIndex);
  return (
    <main>
      <Wrapper className='section'>
        <div className='title'>
          <h2>Movies</h2>
          <div className='underline'></div></div>


        <div className='content'>
          <form onSubmit={handleSearch}>
            <div className='form-control'>

              <input type='text'
                className='search-input'
                placeholder='Search Movie'
                value={value}
                onChange={(e) => setValue(e.target.value)} />
            </div>
            <div>
              <label htmlFor='filter'>Category</label>
              <select
                name='filter' id='filter' className='form-control' onChange={(e) => setFilter(e.target.value)} value={filter}>
                <option value=''>All</option>
                <option value='Drama'>Drama</option>
                <option value='Action'>Action</option>
                <option value='Adventure'>Adventure</option>
                <option value='Fantasy'>Fantasy</option>
                <option value='Horror'>Horror</option>
                <option value='Mystery'>Mystery</option>
                <option value='Romance'>Romance</option>
                <option value='Sci-fi'>Sci-fi</option>
                <option value='Thriller'>Thriller</option>
              </select>
            </div>

            <div >
              <label htmlFor='sort'>Sort by</label>
              <select
                name='sort' id='sort' className='form-control' onChange={(e) => setSortValue(e.target.value)} value={sortValue}>
                <option value='title'>title (a - z)</option>
                <option value='-title'>title (z - a)</option>
              </select>
            </div>
            <br />
            <input type='submit' value='Submit' className='submit-btn' />
            <br />
            <button type='button' className='clear-btn' onClick={clearFilter}>
              Clear filters
            </button>
          </form>

        </div>

        <div>
          <section>
            <div className='featured'>
              {movies.length < 1 ? <h3>Sorry, no movie matched your search.</h3> :
                movies.map(mv => (
                  <Movie key={mv._id}{...mv}>
                  </Movie>
                ))
              }

            </div>
          </section>
        </div>

        <form>
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        </form>
      </Wrapper>
    </main >
  )
}
const Wrapper = styled.section`
 .form-control {
    margin-bottom: 1.25rem;
    width: 100%;

    label{
      padding-right: 0.5rem;
    }
     
    h5 {
      margin-bottom: 0.5rem;
    }
  }

   .search-input {
    width: 100%;
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    letter-spacing: var(--spacing);
  }
  .search-input::placeholder {
    text-transform: capitalize;
  }
  background: var(--clr-primary-00);

  .featured {
    margin-right: 3.5rem;
    display: grid;
   
    gap: 3rem;
    img {
      height: 225px;
      
    }
  }
  .title{
    color :var(--clr-primary-01);
    margin-left: 10.5rem;

  }

  
  .btn {
    display: block;
    width: 148px;
    margin: 0 auto;
    text-align: center;
  }
  @media (min-width: 576px) {
    .featured {
      grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
    }
  }
   .container {
    position: relative;
    background: var(--clr-primary-02);
    border-radius: var(--radius);
  }
  @media (min-width: 768px) {
    .content {
      position: sticky;
      top: 1rem;
      float:left;
      width:10%;
      margin-left: 3rem;
      margin-right: 3rem;
     
    }
  }
   .clear-btn {
    background: var(--clr-red-dark);
    color: var(--clr-white);
    display: block;
    width: 148px;
    margin: 0 auto;
    text-align: center;
  }
  .submit-btn {
   display: block;
    width: 148px;
    margin: 0 auto;
    text-align: center;
    background: var(--clr-primary-01);
    color: var(--clr-white);
  }
`

export default MoviesPage;