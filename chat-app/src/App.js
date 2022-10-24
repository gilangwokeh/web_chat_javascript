import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navigation from './components/Navigation';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import Login from './pages/Login'
import Chat from './pages/Chat';
import { useSelector } from 'react-redux';
function App() {
  const user = useSelector((state) => state.user);

  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        {!user && (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
          </>
        )}
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
