
import { useRef, useState, useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import axios from 'axios';




const Login = ({ use, setUse }) => {

    const navigate = useNavigate();
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault();
        //make api call
        try {
            const result = await axios.post("/apime/user/login", { username: user, password: pwd });
            //setSuccess(true);
            // 👇️ redirect
            setUse(result.data.user.username)

            if (result.data.user.role == "administrator") {
                navigate('/adminReviews');

            }
            else {
                navigate('/movies');
            }
        }
        catch (error) {
            setErrMsg(error.response.data.msg);
            console.log(error)
        }
        //.then(data => { setSuccess(true);console.log(data);})
        //.catch(error => { setErrMsg(error.response.data.msg); console.log(error)})


    }
    return (
        <>

            {success ? (
                ''
            ) : (
                <Container>
                    <div className='loginContainer'>
                        <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"}
                            aria-live="assertive">{errMsg}</p>
                        <h1>Sign In</h1>
                        <p id='usertext'></p>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId='username'>
                                <Form.Label>Username:</Form.Label>
                                <Form.Control
                                    type="text"
                                    ref={userRef}
                                    onChange={(e) => setUser(e.target.value)}
                                    value={user}
                                />
                            </Form.Group>
                            <Form.Group controlId='password'>
                                <Form.Label>Password:</Form.Label>
                                <Form.Control
                                    type="password"
                                    onChange={(e) => setPwd(e.target.value)}
                                    value={pwd}
                                />
                            </Form.Group>
                            <br />
                            <Button variant="primary" type="submit">
                                Sign In
                            </Button>
                        </Form>
                        <Row className='py-3'>
                            <Col>Need an Account? <Link to="/register"> Register Here</Link></Col>
                        </Row>
                    </div>
                </Container>
            )}
        </>
    )
}


export default Login