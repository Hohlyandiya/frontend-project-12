import { useEffect, useState, useContext } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import loadingChannels from '../api/loadingChannels';
import getMessages from '../api/getMessages';
import Navbar from '../Components/UI/NavBar';
import Channels from '../Components/Channels';
import Chat from '../Components/Chat';
import AuthContext from '../context/index'
import { useTranslation } from "react-i18next";
import filter from 'leo-profanity'

const MainPage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const token = localStorage.getItem('token')
  const username = localStorage.getItem('username')
  const { setUser } = useContext(AuthContext)
  const { t } = useTranslation()

  useEffect(() => {
    if (Object.hasOwn(localStorage, "token")) {
      loadingChannels(token, dispatch, t)
      getMessages(token, dispatch, t)
      setUser({
        token,
        username
      })
    } else {
      navigate('/login')
    }
  }, []);

  filter.loadDictionary('ru')
  const dictionaryRu = filter.list()
  filter.loadDictionary('en')
  const dictionaryEn = filter.list()
  const dictionaryEnAndRu = [...dictionaryRu, ...dictionaryEn]
  filter.addDictionary('ru, en', dictionaryEnAndRu)

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
      </div>
    </>
  )
};

export default MainPage;