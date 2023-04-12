import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ConfirmBox from '../components/ConfirmBox';
import { useNavigate } from 'react-router-dom'


const WatchList = ({ use, setUse }) => {
    const [list, setList] = useState([
        //     {
        //     movieId:
        //     {
        //         _id: '',
        //         title: '',
        //         yearReleased: 0
        //     },
        //     hasWatched: false
        // }
    ]);
    const [delId, setDelId] = useState('');
    const [open, setOpen] = useState(false);
    const [hasLoaded, setHasLoaded] = useState(false)
    const navigate = useNavigate();



    useEffect(() => {
        const fetchData = async () => {
            try {
                const user = await axios.get('/apime/user/userCheck')
                
                setUse(user.data.user.username)
                const listData = await axios.get('/apime/watchlist')
                console.log(listData.data.watchlists.movieItems[0].movieId.title)

                setList(listData.data.watchlists.movieItems)

                //console.log(user)
            }
            catch (error) {
                console.log(error.response);
                navigate('/error', { state: { error: error.response.data.msg, code: error.response.status } })
            }
            finally {
                setHasLoaded(true)
            }
        };
        fetchData();

    }, []);
    const changeWatchState = async (id) => {

        try {
            await axios.put(`/apime/watchlist/haswatched/${id}`);

            const updatedList = list.map(item => {
                if (item.movieId._id === id) {
                    return {
                        ...item,
                        hasWatched: !item.hasWatched
                    };
                }
                return item;
            });
            setList(updatedList);
            console.log('change to watched...')
        }
        catch (error) {
            console.log(error.response);
        }
    }
    function openDelete(id) {
        setOpen(true);
        setDelId(id);
    }

    const Removefunction = async () => {
        try {
            const delMovie = await axios.delete(`/apime/watchlist/${delId}`)
            setList(list.filter(item => item.movieId._id !== delId));
            setOpen(false);
            console.log('delete success!')
        }
        catch (error) {
            console.log(error.response);
        }
    }

    if (!hasLoaded) {
        return <h1>Loading...</h1>
    }

    return (

        <div className="container mt-5">
            <div className="card">
                <div className="card-title text-center mt-3">
                    <h2>Watch List</h2>
                </div>
                <div className="card-body">
                    <form>
                        <table className="table table-hover ">
                            <thead className="bg-dark text-white">
                                <tr className='text-center'>
                                    <td>Image</td>
                                    <td>Movie Title</td>
                                    <td>Year Released</td>
                                    <td scope='col'>Action</td>
                                </tr>
                            </thead>
                            <tbody>

                                {list &&
                                    list.map(item => (
                                        item.movieId != null?
                                        <tr key={item.movieId._id} className='text-center'>
                                            <td scope="row" className='align-middle' ><img className='watchLsImg' src={item.movieId.image} alt={item.movieId.title}></img></td>
                                            <td className='align-middle'>{item.movieId.title}</td>
                                            <td className='align-middle'>{item.movieId.yearReleased}</td>
                                            <td className='w-25 align-middle'>
                                                {item.hasWatched ?

                                                    (<a className="btn btn-success mr-3 btn-same">Watched</a>) :
                                                    (<a onClick={() => { changeWatchState(item.movieId._id) }} className="btn btn-primary mr-3 btn-same">Unwatched</a>)
                                                }
                                                <a onClick={() => { openDelete(item.movieId._id) }} className="btn btn-danger btn-same">Remove</a>
                                            </td>
                                        </tr>
                                        :
                                        <tr key={item._id} className='text-center'>
                                            <td scope="row" className='align-middle' ><img className='watchLsImg' src="/images/default.jpg" alt="Default Image"></img></td>
                                            <td className='align-middle'>Deleted Movie</td>
                                            <td className='align-middle'>Null</td>
                                            <td className='w-25 align-middle'>   
                                                <a  className="btn btn-danger btn-same">Remove</a>
                                            </td>
                                        </tr>
                                    ))
                                }

                            </tbody>

                        </table>
                    </form>
                    <ConfirmBox open={open}
                        closeDialog={() => setOpen(false)}
                        deleteFunction={Removefunction}
                        deleteId="movie"
                    />
                </div>
            </div>
        </div >
    )
}

export default WatchList