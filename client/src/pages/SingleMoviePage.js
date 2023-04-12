import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
//import useSWR from 'swr';
import React, { useRef, useEffect, useState, useCallback } from 'react';
import Stars from '../components/Stars';

import AddReview from '../components/AddReview';
import EditReview from '../components/EditReview';
import DeleteReview from '../components/ConfirmBox';

import Reviews from '../components/Reviews';
import Pagination from '../components/Pagination';

const SingleMoviePage = ({ use, setUse }) => {

    const { _id } = useParams();
    const [movie, setMovie] = useState([]);
    const [categories, setCategories] = useState();
    const [actors, setActors] = useState();
    const [reviews, setReviews] = useState([]);
    const [inWatchlist, setInWatchlist] = useState(false)
    const [totalReviews, setTotalReviews] = useState(0)
    const [currentPage, setCurrentPage] = useState(1);
    const [reviewsPerPage] = useState(2);

    const [openAddReview, setOpenAddReview] = useState(false);
    const [openEditReview, setOpenEditReview] = useState(false);
    const [openDeleteReview, setOpenDeleteReview] = useState(false);

    const url = `/apime/movies/${_id}`;

    const [hasLoaded, setHasLoaded] = useState(false)

    const hasComment = useRef(false)
    const userReview = useRef(null)
    const movieId = useRef(null)
    const navigate = useNavigate();

    //get current reviews
    const indexOfLastReview = currentPage * reviewsPerPage;
    const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
    const currentReviews = reviews.slice(indexOfFirstReview, indexOfLastReview);
    const totalPages = Math.ceil(reviews.length / reviewsPerPage);


    useEffect(() => {
        const fetch = async () => {
            try {
                const { movie: { _id: mId } } = await fetchData()
                await checkWatchList(mId)
            }
            catch (error) {
                console.log(error)
                navigate('/error', { state: { error: error.response.data.msg, code: error.response.status } })
            }
        }
        fetch()
    }, []);

    const handleOpenDeleteModal = () => {
        setOpenDeleteReview(true);
    };
    const handleCloseDeleteModal = () => {
        setOpenDeleteReview(false);
    };

    const handleOpenEditModal = () => {
        setOpenEditReview(true);
    };
    const handleCloseEditModal = () => {
        setOpenEditReview(false);
    };

    const handleOpenAddModal = () => {
        setOpenAddReview(true);
    };

    const handleCloseAddModal = () => {
        setOpenAddReview(false);
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const fetchData = async () => {
        console.log('fetchData')
        try {
            const user = await axios.get('/apime/user/userCheck')
            setUse(user.data.user.username)

            const { data: { movie, reviewCount, reviews, actors } } = await axios.get(url)

            userReview.current = reviews.find(review => review.user.username === user.data.user.username)
            if (userReview.current) {
                hasComment.current = true
            }
            else {
                hasComment.current = false
            }
            movieId.current = movie._id
            setMovie(movie)

            const actorNames = actors.map(a => a.fullName)
            setActors(actorNames.join(", "))

            const category = movie.category.join(", ")
            setCategories(category)

            setReviews(reviews)
            setTotalReviews(reviewCount)
            console.log(movie)
            return { movie };
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    };

    const checkWatchList = async (mId) => {
        try {
            const { data: { isInWatchlist } } = await axios.get(`/apime/watchlist/movie/${mId}`)
            console.log('is in watch list ' + isInWatchlist)
            if (isInWatchlist) {
                console.log('wish list is true')
                setInWatchlist(true)
            }
            else {
                setInWatchlist(false)
            }
        }
        catch (error) {
            console.log(error)
        }
        finally {
            setHasLoaded(true)
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault()
        console.log('handle submit')
        try {
            await fetchData()
        }
        catch (error) {
            console.log(error)
        }
    }

    const handleDelete = async () => {
        try {
            setHasLoaded(false)
            await axios.delete(`/apime/reviews/${userReview.current._id}`)
            setOpenDeleteReview(false)
            await fetchData()
        }
        catch (error) {
            console.log(error)
        }
        finally {
            setHasLoaded(true)
        }
    }

    const addToWatchlist = async () => {
        try {
            setHasLoaded(false)
            await axios.put(`/apime/watchlist/${movieId.current}`)
            await checkWatchList(movieId.current)
        }
        catch (error) {
            navigate('/error', { state: { error: error.response.data.msg, code: error.response.status } })
        }
    }

    const removeFromWatchlist = async () => {
        try {
            setHasLoaded(false)
            await axios.delete(`/apime/watchlist/${movieId.current}`)
            await checkWatchList(movieId.current)
        }
        catch (error) {
            navigate('/error', { state: { error: error.response.data.msg, code: error.response.status } })
        }
    }

    if (!hasLoaded) {
        return <h1>Loading....</h1>
    }

    return (

        <>

            <div className='container'>
                <div className='title mt-5'>
                    <h2 role='heading' aria-level='1' >Single Movie page</h2>
                    <div className='underline'></div>
                    <Link to='/movies'>back to movies</Link></div>
                <div className='section pt-3'>
                    <div className='container'>
                        <div className='row'>
                            <div className='col'>
                                <div className='container'>
                                    <div className='row'>
                                        <h2>{movie.title}</h2>
                                    </div>
                                    <div className='row'>
                                        <Stars rating={movie.movieRating} /> &nbsp;
                                        <p>{movie.movieRating} / 5 Average Rating</p>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <br />
                        <div className='row'>
                            <div className='col-md-3'>
                                <img className='singleMovieImg' src={movie.image}></img>
                            </div>
                            <div className='col nt-5 singleMovieText'>

                                <p>Category: {categories}</p>
                                <p>Year Released: {movie.yearReleased}</p>
                                <p>Director: {movie.director}</p>

                            </div>
                        </div>
                        <div className='row mt-3'>
                            <div className='col singleMovieText'>
                                <p>Description: <br />{movie.description}</p>
                                <p>Actors: {actors}</p>
                                {use === 'Admin' ? '' :
                                    <div>{inWatchlist ?
                                        <button
                                            className='btn btn-primary' onClick={() => removeFromWatchlist()}>
                                            &#43; Remove from Watch List
                                        </button>
                                        :
                                        <button
                                            className='btn btn-primary' onClick={() => addToWatchlist()}>
                                            &#43; Add to Watch List
                                        </button>
                                    }</div>
                                }
                            </div>

                        </div>
                        <br />
                        <br />
                        <div className='container'>
                            <h3 className='text-center'>Reviews and Ratings</h3>
                            <div className='d-flex'>
                                <p className='numOfReviews font-weight-bold'>({totalReviews}) Reviews</p>
                                {hasComment.current ?
                                    <><button
                                        className='btn btn-primary float-right mr-2' onClick={handleOpenEditModal}>
                                        Edit Review
                                    </button>
                                        <button className='btn btn-primary float-right' onClick={handleOpenDeleteModal}>
                                            Delete Review
                                        </button></>
                                    :
                                    (<button
                                        className='btn btn-primary float-right' onClick={handleOpenAddModal}>
                                        Add a Review
                                    </button>)
                                }
                                {openAddReview && <AddReview movieId={movieId.current} onClose={handleCloseAddModal} onSubmit={handleSubmit} />}
                                {openEditReview && <EditReview reviewId={userReview.current._id} onClose={handleCloseEditModal} onSubmit={handleSubmit} />}
                                <DeleteReview open={openDeleteReview} closeDialog={handleCloseDeleteModal} deleteFunction={handleDelete} deleteId="review" />
                            </div>
                            <hr />
                            <Reviews reviews={currentReviews} />
                            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
                        </div>


                    </div>

                </div>
            </div>
        </>

    )
};


export default SingleMoviePage;