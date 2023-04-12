
import { useRef, useState, useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import axios from 'axios';

const Register = () => {
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [userFocus, setUserFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setValidMatch(pwd === matchPwd);
    }, [pwd, matchPwd])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd, matchPwd])

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (pwd !== matchPwd) {
            setErrMsg("Password Do Not Match");
        } else {
            setErrMsg(null);

            //set configuarations
            const configuration = {
                headers: {
                    "Content-type": "application/json",
                },
                withCredentials: true
            };
            //make api call
            try {
                const data = await axios.post("/apime/user/register", { username: user, password: pwd })
                setSuccess(true);
                console.log(data);

                navigate('/login', { replace: true })
            }
            catch (error) {
                console.log(error)
                setErrMsg(error.response.data.msg)
            }
            
        
        }


    }

    return (
        <>
            {success ? (
                ''
            ) : (
                <Container>
                    <div className='loginContainer'>
                        <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                        <h1>Register</h1>

                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId='username'>
                                <Form.Label>
                                    Username:
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    ref={userRef}
                                    onChange={(e) => setUser(e.target.value)}
                                    value={user}
                                    onFocus={() => setUserFocus(true)}
                                    onBlur={() => setUserFocus(false)}
                                />
                            </Form.Group>
                            <Form.Group controlId='password'>
                                <Form.Label>
                                    Password:
                                </Form.Label>
                                <Form.Control
                                    type="password"
                                    onChange={(e) => setPwd(e.target.value)}
                                    value={pwd}
                                    onFocus={() => setPwdFocus(true)}
                                    onBlur={() => setPwdFocus(false)}
                                />
                            </Form.Group>
                            <Form.Group controlId='comfirm_pwd'>
                                <Form.Label>
                                    Confirm Password:
                                </Form.Label>
                                <Form.Control
                                    type="password"
                                    onChange={(e) => setMatchPwd(e.target.value)}
                                    value={matchPwd}
                                    onFocus={() => setMatchFocus(true)}
                                    onBlur={() => setMatchFocus(false)}
                                />
                            </Form.Group>
                            <br />
                            <Button variant="primary" type="submit">Sign Up</Button>
                        </Form>
                        <Row className='py-3'>
                            <Col>
                                Already registered? <Link to="/login">Sign In Here</Link>
                            </Col>
                        </Row>
                    </div>
                </Container>
            )}
        </>
    )
}

export default Register