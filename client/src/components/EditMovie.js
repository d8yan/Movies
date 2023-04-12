import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { Modal, Form } from 'react-bootstrap';
import axios from 'axios';
import { useEffect } from 'react';

function EditMovie(props) {

    const [title, setTitle] = useState(props.title);
    const [yearReleased, setYearReleased] = useState(props.yearReleased);
    const [director, setDirector] = useState(props.director);
    const [description, setDescription] = useState(props.description);
    const [category, setCategory] = useState(props.category);
    const [validated, setValidated] = useState(false);


    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    useEffect(() => {
        const getMovie = async () => {

            try {
                const { data: { movie } } = await axios.get(`/apime/movies/${props._id}`);
                setTitle(movie.title);
                setYearReleased(movie.yearReleased);
                setDirector(movie.director);
                setDescription(movie.description);
                setCategory(movie.category);
            }
            catch (error) {
                console.log(error);
            }
        }

        getMovie();
    }, [props._id]);
    return (
        <>
            <Button
                variant="primary float-right" onClick={handleShow}>
                EDIT
            </Button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header>
                    <Modal.Title>Edit Movie</Modal.Title>
                    <Button variant="btn-close" onClick={handleClose}>╳
                    </Button>
                </Modal.Header>
                <Modal.Body>
                    <Form id='updateMovie' onSubmit={(e) => {
                        handleClose();
                        e.preventDefault();

                        props.updateMovie(props._id, title, yearReleased, director, description, category);
                    }}>

                        <br />
                        <Form.Group className="mb-3" >
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
                        <Form.Group className="mb-3" >
                            <Form.Label>Movie Description</Form.Label>
                            <Form.Control as="textarea" rows={4} placeholder="Enter movie description"
                                required
                                value={description}
                                onChange={(event) => setDescription(event.target.value)} />
                            <Form.Control.Feedback type="invalid">
                                Please type movie description.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Movie Category</Form.Label>
                            <Form.Control as="select" id='category' name='category' aria-label="Default select example"
                                required
                                value={category} onChange={(event) => setCategory(event.target.value)}>
                                <option value=''>Choose...</option>
                                <option value='Drama'>Drama</option>
                                <option value='Action'>Action</option>
                                <option value='Adventure'>Adventure</option>
                                <option value='Fantasy'>Fantasy</option>
                                <option value='Horror'>Horror</option>
                                <option value='Mystery'>Mystery</option>
                                <option value='Romance'>Romance</option>
                                <option value='Sci-fi'>Sci-fi</option>
                                <option value='Thriller'>Thriller</option>
                            </Form.Control>
                            <Form.Control.Feedback type="invalid">
                                Please select movie category.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <button className='btn btn-primary' type="submit" form="updateMovie">
                        Update
                    </button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default EditMovie;