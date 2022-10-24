import React from 'react'
import { Row, Col, Container } from 'react-bootstrap';
import MessageFrom from '../components/MessageFrom';
import Sidebar from '../components/Sidebar';
const Chat = () => {
  return (
    <Container>
      <Row>
        <Col md={4}>
          <Sidebar />
        </Col>
        <Col md={8}>
          <MessageFrom />
        </Col>
      </Row>
    </Container>
  )
}

export default Chat