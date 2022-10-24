import React, { useState } from 'react'
import { Row, Col, Container, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useSignupUserMutation } from '../services/AppApi'
import Button from 'react-bootstrap/Button';
import "./Signup.css"

const SignUp = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [signupUser, { isLoading, error }] = useSignupUserMutation()
  const [image, setImage] = useState(null)
  const [uploadingImg, setUploadingImg] = useState(false)
  const [imagePreview, setImagePreview] = useState(null)
  const navigate = useNavigate();
  const onChangeEmail = (e) => {
    const value = e.target.value
    setEmail(value)
  }
  const onChangePassword = (e) => {
    const value = e.target.value
    setPassword(value)
  }
  const onChangeName = (e) => {
    const value = e.target.value
    setName(value)
  }
  function validateImg(e) {
    const file = e.target.files[0];
    if (file.size >= 1048576) {
      return alert("max file size is 1mb")
    } else {
      setImage(file);
      setImagePreview(URL.createObjectURL(file))
    }
  }
  const uploadImage = async () => {
    const data = new FormData();
    data.append('file', image);
    data.append("upload_preset", 'ryk5lmxi')
    try {
      setUploadingImg(true);
      let res = await fetch('https://api.cloudinary.com/v1_1/ducpaprfd/image/upload', {
        method: "post",
        body: data
      })
      const urlData = await res.json();
      setUploadingImg(false);
      return urlData.url
    } catch (error) {
      setUploadingImg(false);
      console.log(error)
    }
  }

  async function handleSignup(e) {
    e.preventDefault()
    if (!image) return alert('tolong upload profil gambar kamu');
    const url = await uploadImage(image);
    console.log(url);
    //signup the user
    signupUser({ name, email, password, picture: url })
      .then(({ data }) => {
        if (data) {
          console.log(data)
          navigate("/chat")
        }
      })
  }
  return (
    <Container>
      <Row>
        <Col md={7} className="d-flex align-items-center justify-content-center flex-direction-column">
          <Form style={{ width: "80%", maxWidth: 500 }} onSubmit={handleSignup}>
            <h1 className='text-center'>Buat Akun Pendaftaran</h1>
            <div className='Signup-profile-pic__container'>
              <img src={imagePreview || "./chat-profile.png"} className='signup-profile-pic' alt="" />
              <label htmlFor="image-upload" className='image-upload-label'>
                <i className='fas fa-plus-circle add-picture-icon'></i>
              </label>
              <input type="file" id="image-upload" hidden accept="image/png, image/jpeg" onChange={validateImg} />
            </div>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Enter Your Name" onChange={onChangeName} value={name} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" onChange={onChangeEmail} value={email} />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" onChange={onChangePassword} value={password} />
            </Form.Group>
            <Button variant="primary" type="submit">
              {uploadingImg ? "signing you upload.." : "Kirim"}
            </Button>
            <div className='py-4'>
              <p className='text-center'>
                Anda Sudah Mempunyai Akun ? <Link to="/login">Login</Link>
              </p>
            </div>
          </Form>
        </Col>
        <Col md={5} className="Signup_bg"></Col>
      </Row>
    </Container>
  )
}

export default SignUp