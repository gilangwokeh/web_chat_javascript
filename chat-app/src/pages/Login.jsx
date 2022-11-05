import React, { useState ,useContext } from 'react'
import { Row, Col, Container, Form } from 'react-bootstrap';
import { useLoginUserMutation } from '../services/AppApi'
import { Link, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import "./Login.css"
import { AppContext } from '../Context/appContext';
function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const {socket} = useContext(AppContext);
  const [loginUser, { isLoading, error }] = useLoginUserMutation();
  const onChangeEmail = (e) => {
    const value = e.target.value
    setEmail(value)
  }
  const onChangePassword = (e) => {
    const value = e.target.value
    setPassword(value)
  }

  function handleLogin(e) {
    e.preventDefault();
    //login logic
    loginUser({ email, password }).then(({ data }) => {
        if (data) {
          socket.emit('new-user');
          navigate("/chat");
        }
      })

  }
  return (
    < Container >
      <Row>
        <Col md={5} className="Login_bg"></Col>
        <Col md={7} className="d-flex align-items-center justify-content-center flex-direction-column">
          <Form style={{ width: "80%", maxWidth: 500 }} onSubmit={handleLogin}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" onChange={onChangeEmail} value={email} required />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" onChange={onChangePassword} value={password} required />
            </Form.Group>
            <Button variant="primary" type="submit">
              Login
            </Button>
            <div className='py-4'>
              <p className='text-center'>
                Anda Tidak Memiliki Akun ? <Link to="/signup">Daftar</Link>
              </p>
            </div>
          </Form>
        </Col>
      </Row>
    </Container >
  );
}

export default Login;