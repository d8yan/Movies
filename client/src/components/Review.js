import React from 'react'
import styled from 'styled-components'
import { FaSearch } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { BiTrash } from "react-icons/bi";
import axios from 'axios'
import { useState } from 'react';
import ConfirmBox from './ConfirmBox';


const Review = ({ reviews }) => {
  const [open, setOpen] = useState(false);
  const [deleteData, setDeleteData] = useState({});

  function openDelete(review) {
    setOpen(true);
    setDeleteData(review);
  }

  function handleDelete() {
    try {
      const res = axios.delete(`/apime/reviews/${deleteData?._id}`);
      window.location.reload(false);
      setOpen(false);
    }
    catch (error) {
      console.log(error);
    }

  }

  /*   const handleDelete = async (event) => {
  
      deleteId = event.currentTarget.id;
      console.log("Id to be deleted" + deleteId);
      const res = await axios.delete(`/apime/reviews/${deleteId}`);
      console.log("message foe delete" + res.data.msg);
  
      //window.location.reload(false);
  
    } */

  return (
    <Wrapper>
      <div className='container'>
        <table className='table table-striped'>
          <thead>
            <tr>
              <th>Movie</th>
              <th>Rating</th>
              <th>Review</th>
              <th>Created date</th>
              <th>Created By</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {reviews.map(review => (
              <tr key={review._id} >
                <td>{review.movie.title}</td>
                <td>{review.reviewRating}</td>
                <td>{review.reviewComment}</td>
                <td>{new Date(review.createdAt).toISOString().replace('T', ' ').slice(0, 19)}</td>
                <td>{review.user.username}</td>
                <td><form>
                  <input type='hidden' name='id' value={review._id} />
                  <button id={review._id} type='button' onClick={() => openDelete(review)} ><BiTrash /></button>
                </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ConfirmBox open={open}
        closeDialog={() => setOpen(false)}
        deleteFunction={handleDelete}
        deleteId="review"
      />
    </Wrapper>
  )
}



const Wrapper = styled.article`
  .container {
    position: relative;
    background: var(--clr-primary-02);
    border-radius: var(--radius);
  }
  h4 {
    position: relative;
  }
  .link {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: var(--clr-primary-5);
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    transition: var(--transition);
    opacity: 0;
    cursor: pointer;
    svg {
      font-size: 1.25rem;
      color: var(--clr-white);
    }
  }
  .container:hover img {
    opacity: 0.5;
  }
  .container:hover .link {
    opacity: 1;
  }
  footer {
    margin-top: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  footer h5,
  footer p {
    margin-bottom: 0;
    font-weight: 600;
    font-size: 1rem;
    color: var(--clr-primary-5);
  }

  footer p {
    color: var(--clr-primary-5);
    letter-spacing: var(--spacing);
    
  }
`
export default Review
