import React from 'react'
import Stars from './Stars'
const Reviews = ({ reviews }) => {
    return (
        <ul>

         {reviews.map(review => (
            <li key={review._id} >
                 <div className='card border-info'>
                     <div className='card-body'>
                         <div className='row justify-content-between'>
                                 <p className='font-weight-bold'>{review.user.username}</p>
                                 <p><Stars rating={review.reviewRating} /></p>
                                <p>Created at: {new Date(review.createdAt).toISOString().replace('T', ' ').slice(0, 19)}  </p>
                         </div>
                         <div className='row'>
                             {review.reviewComment}
                         </div>
                        
                         {
                           new Date(review.createdAt).getTime() != new Date(review.updatedAt).getTime()?
                            ( <div className='row justify-content-end font-italic'>Updated at: {new Date(review.updatedAt).toISOString().replace('T', ' ').slice(0, 19)}</div>): ''
                         }
                     </div>

                 </div>
                 <br />
            </li>
            
         ))}
            
        </ul>
    )
}

export default Reviews