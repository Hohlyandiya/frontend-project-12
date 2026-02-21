import { useEffect, useState, useContext } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import loadingChannels from '../api/loadingChannels';
import getMessages from '../api/getMessages';
import Navbar from '../Components/UI/NavBar';
import Channels from '../Components/Channels';
import Chat from '../Components/Chat';
import AuthContext from '../context/index'

const MainPage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const token = localStorage.getItem('token')
  const username = localStorage.getItem('username')
  const { setUser } = useContext(AuthContext)

  useEffect(() => {
    if (Object.hasOwn(localStorage, "token")) {
      loadingChannels(token, dispatch)
      getMessages(token, dispatch)
      setUser({
        token,
        username
      })
      //localStorage.clear()
    } else {
      navigate('/login')
    }
  }, []);

  const navigateSignup = () => {
    navigate('/signup')
  }

  const navigateLogin = () => {
    navigate('/login')
  }

  const navigateNotFound = () => {
    navigate('/notFound')
  }

  const [currentChannel, setCurrentChannel] = useState(null)

  return (
    <>
      <div className="d-flex flex-column h-100">
        <Navbar/>
        <div className="container h-100 my-4 overflow-hidden rounded shadow">
          <div className="row h-100 bg-white flex-md-row">
            <Channels
              currentChannel={currentChannel}
              setCurrentChannel={setCurrentChannel}
            />
            <Chat
              currentChannel={currentChannel}
            />
          </div>
        </div>
        <button onClick={navigateSignup}>Signup</button>
        <button onClick={navigateLogin}>Login</button>
        <button onClick={navigateNotFound}>NotFound</button>
      </div>
    </>
  )
};

export default MainPage;