import './App.css';
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navigation from './components/Navigation';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import Login from './pages/Login'
import Chat from './pages/Chat';
import { useSelector } from 'react-redux';
import { AppContext, socket } from './Context/appContext'
function App() {
  const [rooms, setRooms] = useState([]);
  const [currentRoom, setCurrentRoom] = useState([]);
  const [members, setMembers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [privateMemberMsg, setPrivateMemberMsg] = useState({});
  const [newMessages, setNewMessagges] = useState({});
  const user = useSelector((state) => state.user);
  return (
    <AppContext.Provider value={{
      socket, currentRoom, setCurrentRoom, members, setMembers,
      messages, setMessages, privateMemberMsg, setPrivateMemberMsg, rooms, setRooms, newMessages,
      setNewMessagges
    }}>
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          {!user && (
            <>
              <Route path="/Login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
            </>
          )}
          <Route path="/chat" element={<Chat />} />
        </Routes>
      </BrowserRouter>
    </AppContext.Provider>
  );
}

export default App;
