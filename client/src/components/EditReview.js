import React, { useRef, useEffect, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { FaStar } from "react-icons/fa";
import GreenCheck from '../assets/green-checkmark.png'
import axios from 'axios';
function EditReview({ reviewId, onClose, onSubmit }) {
  const errRef = useRef();
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");
  const [success, setSuccess] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const [showModal, setShowModal] = useState(false);


  const handleClose = () => {
    console.log('handle close')
    setShowModal(false)
    setSuccess(false)
    onClose();
  };

  const handleHide = () => {
    console.log('handle hide')
    setShowModal(false)
    setSuccess(false)
  }

  useEffect(()=>{
    const initializeModal = async () =>{
        try{
            const {data:{review}} = await axios.get(`/apime/reviews/${reviewId}`)
            console.log('edit review modal: '+review)
            setRating(review.reviewRating)
            setComment(review.reviewComment)
        }
        catch(error){
            console.log(error)
        }
    }
    initializeModal()
  }, [])

//   useEffect(() => {
//     setErrMsg('');
//   }, [rating, comment]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    //submit to server
    
    try {

      const data = await axios.put(`/apime/reviews/${reviewId}`, { reviewRating: rating, reviewComment: comment })
      setSuccess(true);
      setShowModal(true);
      onSubmit(event)
    }
    catch (error) {
      console.log(error)
      setErrMsg(error.response.data.msg);
    }

  };

  return (
    <>
      {success ? (
        <Modal show={showModal} onClose={handleHide} aria-labelledby="contained-modal-title-vcenter" centered>
         
          <Modal.Body className='mx-auto text-center'> 
            <img src={GreenCheck} alt='green check'/>
            <Modal.Title>Thank you for your review!</Modal.Title>
            <p>Your review has been updated successfully.</p>
          </Modal.Body>
          <Modal.Footer>
            <Button role = 'close button' variant="secondary" onClick={handleClose}>Close</Button>
          </Modal.Footer>
        </Modal>
      ) : (
        <Modal show={true} onHide={handleClose} backdrop="static">
          <Modal.Header>
           
            <Modal.Title>Edit Review</Modal.Title>
            <Button variant="btn-close" onClick={handleClose}>&times;
            </Button>
          </Modal.Header>
          <Modal.Body>
            <Form id='writeReview'>
              <div className="star-rating text-center">
                {[1, 2, 3, 4, 5].map((value) => {
                  return (
                    <span
                      key={value}
                      className={value <= (hover || rating) ? "on" : "off"}
                      onClick={() => setRating(value)}
                      onMouseEnter={() => setHover(value)}
                      onMouseLeave={() => setHover(rating)}
                    >
                      <FaStar size={28} />
                    </span>

                  );
                })}
              </div>
              <br />
              <Form.Group
                className="mb-3"
                controlId="reviewTextarea"
              >
                <Form.Control
                  as="textarea"
                  rows={4}
                  placeholder="write review here"
                  value={comment}
                  onChange={(event) => setComment(event.target.value)
                  } />
              </Form.Group>
            </Form>
          </Modal.Body>
          <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <button className='btn btn-primary' type="submit" onClick={handleSubmit} form="writeReview">
              Save Changes
            </button>
          </Modal.Footer>

        </Modal>
      )}
    </>
  );
}

export default EditReview;
