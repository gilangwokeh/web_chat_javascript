import React from 'react'
import { ListGroup, ListGroupItem } from 'react-bootstrap'
import { useSelector } from 'react-redux'

function Sidebar() {
  const rooms = ['first room', 'second room', 'third room']
  const user = useSelector((state) => state.user)
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