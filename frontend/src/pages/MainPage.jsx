import { useEffect, useState, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import loadingChannels from '../api/loadingChannels';
import getMessages from '../api/getMessages';
import Navbar from '../Components/UI/NavBar';
import Channels from '../Components/Channels';
import Chat from '../Components/Chat';
import ModalContainer from '../Components/Modals/ModalContainer';
import getDefaultChannel from '../lib/getDefaultChannel';
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
    } else {
      navigate('/login')
    }
  }, []);

  //const listChannels = Object.values(useSelector((state) => state.channels.entities))
  //const listMessages = Object.values(useSelector((state) => state.messages.entities))

  /* const defaultChannel = getDefaultChannel(listChannels)
  const listNameChannels = listChannels.map((channel) => channel.name) */

  const [currentChannel, setCurrentChannel] = useState(null)
  /* const [show, setShow] = useState(false)
  const [action, setAction] = useState(null)
  const [selectedChannel, setSelectedChannel] = useState(null) */

  /* useEffect(() => {
    setCurrentChannel(defaultChannel)
  }, [defaultChannel])

  useEffect(() => {
    if (!currentChannel) {
      setCurrentChannel(defaultChannel)
    }
  }, [listChannels, currentChannel])
 */
  /* useEffect(() => {
    console.log(`listMessages обновлён в ${new Date().toLocaleTimeString()}: `, listMessages)
  }, [listMessages]) */

  //console.log(`Компонент MainPage отрисован в ${new Date().toLocaleTimeString()}`)
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
              //listMessages={listMessages}
              currentChannel={currentChannel}
            />
            {/* <ModalContainer
              show={show}
              setShow={setShow}
              action={action}
              selectedChannel={selectedChannel}
              listNameChannels={listNameChannels}
            /> */}
          </div>
        </div>
      </div>
    </>
  )
};

export default MainPage;