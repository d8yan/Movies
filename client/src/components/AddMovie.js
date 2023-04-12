import React, { useRef, useEffect, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import GreenCheck from '../assets/green-checkmark.png'
import axios from 'axios';

function AddMovie({ onClose, onSubmit }) {
    const errRef = useRef();
    const [title, setTitle] = useState("");
    const [yearReleased, setYearReleased] = useState("");
    const [director, setDirector] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState({ categories: [], category: [] });
    const [image, setImage] = useState("");
    const [success, setSuccess] = useState(false);
    const [errMsg, setErrMsg] = useState('');
    const [showModal, setShowModal] = useState(false);

    const handleChange = (event) => {
        console.log(event.target);
        const { value, checked } = event.target;
        const { categories } = category;
        console.log(`value: ${value} is  checked: ${checked}`);
        if (checked) {
            setCategory({ categories: [...categories, value], category: [...categories, value] });
        }
        else {
            setCategory({
                categories: categories.filter((cat) => cat !== value),
                category: categories.filter((cat) => cat !== value),
            });
        }

    };


    const handleClose = () => {
        setShowModal(false)
        setSuccess(false)
        onClose();
    };

    const handleHide = () => {
        console.log('handle hide')
        setShowModal(false)
        setSuccess(false)
    }

    useEffect(() => {
        setErrMsg('');
    }, [title, yearReleased, director, description, category, image]);

    const handleSubmit = async (event) => {

        //submit to server
        event.preventDefault();
        const formData = new FormData();
        formData.append('movieImage', image);

        if (category.category == null || category.category.length === 0) {
            category.category = null;
        }

        console.log("inside submit" + category.category);
        try {
            const { data: { url, msg } } = await axios.post('/apime/movies/uploadMovieImage', formData);
            const res = await axios.post('/apime/movies', {
                title: title, image: url, yearReleased: yearReleased,
                director: director, description: description, category: category.category
            })
            setSuccess(true);
            setShowModal(true);
            onSubmit(event)
        }
        catch (error) {
            console.log(error.response.data.msg)
            setErrMsg(error.response.data.msg);
        }

    };

    return (
        <>
            {success ? (
                <Modal show={showModal} onClose={handleHide} aria-labelledby="contained-modal-title-vcenter" centered>

                    <Button variant="close ml-auto mr-2 mt-2" onClick={() => setShowModal(false)}>&times;</Button>

                    <Modal.Body className='mx-auto text-center'>
                        <img src={GreenCheck} alt='green check' />
                        <Modal.Title>Success!</Modal.Title>
                        <p>Movie is added successfully.</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button role='close button' variant="secondary" onClick={handleClose}>Close</Button>
                    </Modal.Footer>
                </Modal>
            ) : (
                <Modal show={true} onHide={handleClose} backdrop="static">
                    <Modal.Header>

                        <Modal.Title>Add a Movie</Modal.Title>
                        <Button variant="btn-close" onClick={handleClose}>&times;
                        </Button>
                    </Modal.Header>
                    <Modal.Body>
                        <Form id='addMovie'>

                            <br />
                            <Form.Group className="mb-3" controlId="movieTitle">
                                <Form.Label>Movie Title</Form.Label>
                                <Form.Control type="text"
                                    required
                                    placeholder="Enter movie title"
                                    value={title}
                                    onChange={(event) => setTitle(event.target.value)} />
                                <Form.Control.Feedback type="invalid">
                                    Please type movie title.
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Movie Image</Form.Label>
                                <Form.Control required type="file"
                                    onChange={(event) => setImage(event.target.files[0])}></Form.Control>
                            </Form.Group>
                            <Form.Group
                                className="mb-3"
                                controlId="yearReleased">
                                <Form.Label>Year Released</Form.Label>
                                <Form.Control
                                    required
                                    type="number"
                                    placeholder="Enter year released"
                                    value={yearReleased}
                                    onChange={(event) => setYearReleased(event.target.value)} />
                                <Form.Control.Feedback type="invalid">
                                    Please type year released.
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group
                                className="mb-3"
                                controlId="movieDirector">
                                <Form.Label>Movie Director</Form.Label>
                                <Form.Control
                                    type="text"
                                    required
                                    placeholder="Enter movie director"
                                    value={director}
                                    onChange={(event) => setDirector(event.target.value)} />
                                <Form.Control.Feedback type="invalid">
                                    Please type movie director.
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="movieTextarea">
                                <Form.Label>Movie Description</Form.Label>
                                <Form.Control as="textarea" rows={4} placeholder="Enter movie description"
                                    required
                                    value={description}
                                    onChange={(event) => setDescription(event.target.value)} />
                                <Form.Control.Feedback type="invalid">
                                    Please type movie description.
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="movieCategory">
                                <Form.Label>Movie Category</Form.Label>
                                <fieldset>
                                    <div className="form-check-inline">
                                        <input className="form-check-input" type="checkbox" id="Drama" name="categories" value="Drama" onChange={handleChange} />
                                        <label className="form-check-label" htmlFor="Drama">Drama</label>
                                    </div>
                                    <div className="form-check-inline">
                                        <input className="form-check-input" type="checkbox" id="Action" name="categories" value="Action" onChange={handleChange} />
                                        <label className="form-check-label" htmlFor="Action">Action</label>
                                    </div>
                                    <div className="form-check-inline">
                                        <input className="form-check-input" type="checkbox" id="Adventure" name="categories" value="Adventure" onChange={handleChange} />
                                        <label className="form-check-label" htmlFor="Adventure">Adventure</label>
                                    </div>
                                    <div className="form-check-inline">
                                        <input className="form-check-input" type="checkbox" id="Fantasy" name="categories" value="Fantasy" onChange={handleChange} />
                                        <label className="form-check-label" htmlFor="Fantasy">Fantasy</label>
                                    </div>
                                    <div className="form-check-inline">
                                        <input className="form-check-input" type="checkbox" id="Horror" name="categories" value="Horror" onChange={handleChange} />
                                        <label className="form-check-label" htmlFor="Horror">Horror</label>
                                    </div>
                                    <div className="form-check-inline">
                                        <input className="form-check-input" type="checkbox" id="Mystery" name="categories" value="Mystery" onChange={handleChange} />
                                        <label className="form-check-label" htmlFor="Mystery">Mystery</label>
                                    </div>
                                    <div className="form-check-inline">
                                        <input className="form-check-input" type="checkbox" id="Romance" name="categories" value="Romance" onChange={handleChange} />
                                        <label className="form-check-label" htmlFor="Romance">Romance</label>
                                    </div>
                                    <div className="form-check-inline">
                                        <input className="form-check-input" type="checkbox" id="Sci-fi" name="categories" value="Sci-fi" onChange={handleChange} />
                                        <label className="form-check-label" htmlFor="Sci-fi">Sci-fi</label>
                                    </div>
                                    <div className="form-check-inline">
                                        <input className="form-check-input" type="checkbox" id="Thriller" name="categories" value="Thriller" onChange={handleChange} />
                                        <label className="form-check-label" htmlFor="Thriller">Thriller</label>
                                    </div>
                                </fieldset>
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Cancel
                        </Button>
                        <button className='btn btn-primary' type="submit" onClick={handleSubmit} form="addMovie">
                            Add
                        </button>
                    </Modal.Footer>

                </Modal>
            )}
        </>
    );
}

export default AddMovie;
