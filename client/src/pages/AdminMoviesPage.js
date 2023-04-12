import { Button, Form, Modal } from 'react-bootstrap';
import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { BiTrash, BiPencil } from "react-icons/bi";
import styled from 'styled-components'
import AddMovie from '../components/AddMovie'
import Pagination from '../components/Pagination'
import swal from 'sweetalert';
import ConfirmBox from '../components/ConfirmBox';
//import EditMovie from '../components/EditMovie';
import DetailMovie from '../components/DetailMovie';
import EdiMovie from '../components/EdiMovie';
import AdminPanel from '../components/AdminPanel';
import { useNavigate } from 'react-router-dom'

function AdminMoviesPage({ use, setUse }) {
    const [movies, setMovies] = useState([])

    const [value, setValue] = useState('');
    const valueRef = useRef('')

    const [sortValue, setSortValue] = useState('')
    const sortRef = useRef('')

    const [filter, setFilter] = useState('')
    const filterRef = useRef('')

    const [open, setOpen] = useState(false);
    const [openAddMovie, setOpenAddMovie] = useState(false);
    const [openEditMovie, setOpenEditMovie] = useState(false);
    const [openDetailMovie, setOpenDetailMovie] = useState(false);


    const basedUrl = '/apime/movies?page=1';

    const [deleteData, setDeleteData] = useState({});
    const [targetEditMovieId, setTargetEditMovieId] = useState(null);
    const [targetDetailMovieId, setTargetDetailMovieId] = useState(null);

    const [currentPage, setCurrentPage] = useState(1);
    const currentPageRef = useRef(1)

    const [moviesPerPage] = useState(9);
    const [totalMovies, setTotalMovies] = useState(1);
    const navigate = useNavigate();

    const hasMounted = useRef([])

    const totalPages = Math.ceil(totalMovies / moviesPerPage)

    useEffect(() => {
        console.log('hello init use effect')
        const initializePage = async () => {
            try {
                await fetchData(1)
                await fetchUser()
                console.log('finished initialize page')
            }
            catch (error) {
                console.log(error)
                navigate('/error', { state: { error: error.response.data.msg, code: error.response.status } })
            }
        }
        initializePage()
    }, [])

    const fetchData = async (pageNumber) => {
        try {
            const { data: { movies, totalCount } } = await axios
                .get(`/apime/movies?page=${currentPageRef.current}&title=${valueRef.current}&category=${filterRef.current}&sort=${sortRef.current}`)
            setCurrentPage(pageNumber)
            setMovies(movies)
            setTotalMovies(totalCount)
            return { movies, totalCount }
        }
        catch (error) {
            throw error
        }
    }

    const fetchUser = async () => {
        try {
            const { data: { user: { username } } } = await axios.get('/apime/user/userCheck')
            setUse(username)
            return username
        }
        catch (error) {
            throw error
        }
    }

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
        try {
            await fetchData(currentPageRef.current)
        }
        catch (error) {
            console.log(error)
        }
    }

    const handlePageChange = async (pageNumber) => {
        currentPageRef.current = pageNumber
        try {
            await fetchData(currentPageRef.current)
        }
        catch (error) {
            console.log(error)
        }
    };

    const handleOpenDetailModal = (movieId) => {
        setTargetDetailMovieId(movieId)
        setOpenDetailMovie(true);
    };

    const handleCloseDetailModal = () => {
        setOpenDetailMovie(false);
    };

    const handleOpenAddModal = () => {
        setOpenAddMovie(true);
    };

    const handleCloseAddModal = () => {
        setOpenAddMovie(false);
    };

    const handleOpenEditModal = (movieId) => {
        setTargetEditMovieId(movieId)
        setOpenEditMovie(true);
    };

    const handleCloseEditModal = () => {
        setOpenEditMovie(false);
    };

    function openDelete(movie) {
        setOpen(true);
        setDeleteData(movie);

    }
    async function handleDelete() {
        const res = await axios.delete(`/apime/movies/${deleteData?._id}`);
        setValue("");
        setFilter("");
        setSortValue("");
        valueRef.current = ''
        sortRef.current = ''
        filterRef.current = ''
        currentPageRef.current = 1
        setOpen(false);
        try {
            await fetchData(currentPageRef.current)
        }
        catch (error) {
            console.log(error)
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        setValue("");
        setFilter("");
        setSortValue("");
        valueRef.current = ''
        sortRef.current = ''
        filterRef.current = ''
        currentPageRef.current = 1
        try {
            await fetchData(currentPageRef.current)
        }
        catch (error) {
            console.log(error)
        }
    }

    const startIndex = (currentPage - 1) * moviesPerPage;
    const endIndex = startIndex + moviesPerPage;
    const currentMovies = movies.slice(startIndex, endIndex);

    return (
        <Wrapper>
            <form>
                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
            </form>
            <div className='section'>
                <div className="container" >
                    <div className='row'>
                        <div className="col-sm-2">
                            <AdminPanel />

                        </div>
                        <div className='col-sm-2'>
                            <button
                                className='btn btn-primary float-center' onClick={handleOpenAddModal}>
                                Add a Movie
                            </button>

                            {/* <AddMovie onSubmit={handleSubmitMovie} /> */}
                            {openAddMovie && <AddMovie onClose={handleCloseAddModal} onSubmit={handleSubmit} />}


                            <form onSubmit={handleSearch}>
                                <input type='text'
                                    className='search-input'
                                    placeholder='Search Movie'
                                    value={value}
                                    onChange={(e) => setValue(e.target.value)} />
                                <br />
                                <div>
                                    <label htmlFor='filter'>Category</label>
                                    <select
                                        name='filter' id='filter' className='form-control'
                                        onChange={(e) => setFilter(e.target.value)} value={filter}
                                    >
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
                                        name='sort' id='sort' className='form-control'
                                        onChange={(e) => setSortValue(e.target.value)} value={sortValue}
                                    >
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
                                <br />
                            </form>
                        </div>
                        <div className="col-sm-8">
                            {movies.length < 1 && <h3>No movie found</h3>}
                            <table className='table table-striped w-auto'>

                                <thead >
                                    <tr>
                                        <th>Title</th>
                                        <th>Rating</th>
                                        <th></th>
                                        <th></th>
                                        <th></th>
                                        <th></th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {openEditMovie && targetEditMovieId &&
                                        <EdiMovie movieId={targetEditMovieId}
                                            onClose={handleCloseEditModal}
                                            onSubmit={handleSubmit} />
                                    }

                                    {openDetailMovie && targetDetailMovieId &&
                                        <DetailMovie movieId={targetDetailMovieId}
                                            onClose={handleCloseDetailModal} />
                                    }

                                    {movies.map(movie => (
                                        <tr key={movie._id} >

                                            <td>{movie.title}</td>
                                            <td>{movie.movieRating}</td>
                                            <td><img src={movie.image} alt={movie.title} /></td>
                                            <td></td>
                                            <td></td>
                                            <td>

                                                <div>
                                                    <input type='hidden' name='id' value={movie._id} />
                                                    <button className='btn' id={movie._id} type='button' onClick={() => openDelete(movie)}>Delete</button>
                                                </div>
                                            </td>
                                            <td>
                                                <button
                                                    className='btn btn-primary float-right' onClick={() => handleOpenEditModal(movie._id)}>
                                                    Edit
                                                </button>
                                            </td>
                                            <td>
                                                <button className='btn' onClick={() => handleOpenDetailModal(movie._id)}>Details</button>
                                                {/* <form>
                                            <button id={movie._id} className='btn' type='button' >Details</button>
                                            <DetailMovie _id={movie._id}
                                            />
                                        </form> */}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <ConfirmBox open={open}
                            closeDialog={() => setOpen(false)}
                            deleteFunction={handleDelete}
                            deleteId="movie"
                        />
                    </div>
                </div>
            </div>
        </Wrapper >
    )
}
const Wrapper = styled.section`
background: var(--clr-primary-00);
.search-input {
    width: 100%;
    background: var(--clr-primary-02);
    border-radius: var(--radius);
    border-color: transparent;
    letter-spacing: var(--spacing);
    padding: 0.25rem 0.5rem;
    margin-top: 1rem;
  }
  .search-input::placeholder {
    text-transform: capitalize;
  }
.btn {
    display: block;
    width: 100%;
    margin: 0 auto;
    text-align: center;
    background: var(--clr-primary-05);
    color: var(--clr-white);
  }
  .submit-btn {
     display: block;
    width: 80%;
    margin: 0 auto;
    text-align: center;
    background: var(--clr-primary-01);
    color: var(--clr-white);
    
    
  }
  .clear-btn {
    background: var(--clr-red-dark);
    color: var(--clr-white);
    display: block;
    width: 80%;
    margin: 0 auto;
    text-align: center;
  }
img{
    height: 120px;
    width: 150px;
}
`
export default AdminMoviesPage;