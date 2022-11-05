import React, { useContext } from 'react'
import { ListGroup, ListGroupItem } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { AppContext } from '../Context/appContext'

function Sidebar() {
  const rooms = ['first room', 'second room', 'third room'];
  const user = useSelector((state) => state.user);
  const { socket } = useContext(AppContext);
  socket.off('new-user').on('new-user', (payload) => {
    console.log(payload);
  });
  if (!user) {
    return <>
      <h1>Please Login</h1>
    </>
  }
  return (
    <>
      <h2>Available rooms</h2>
      <ListGroup>
        {rooms.map((room, idx) => (
          <ListGroupItem key={idx}>{room}</ListGroupItem>
        ))}
      </ListGroup>
      <h2>Members</h2>
    </>
  )
}

export default Sidebar