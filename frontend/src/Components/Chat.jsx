import { useRef, useState, useEffect, useContext } from "react"
import { useDispatch, useSelector } from "react-redux"
import { selectors } from "../store/slices/messagesSlice"
import postNewMessage from '../api/postMessage'
import { io } from 'socket.io-client'
import { addMessage } from '../store/slices/messagesSlice'
import Messages from "./UI/Messages"
import AuthContext from '../context/index'
import { useTranslation } from "react-i18next"

const Chat = ({ currentChannel }) => {
  
  const listMessages = Object.values(useSelector((state) => selectors.selectEntities(state)))

  const { user } = useContext(AuthContext)
  const fieldMessage = useRef()
  const dispatch = useDispatch()
  const [isFieldDisabled, setIsFieldDisabled] = useState(false)
  const [isSendButtonDisabled, setIsSendButtonDisabled] = useState(true)
  const [isOnline, setIsOnline] = useState(navigator.onLine)
  const [pendingMessage, setPendingMessage] = useState(null)
  const [totalMessages, setTotalMessages] = useState(0)
  const { t } = useTranslation()

  useEffect(() => {
    const totalMessagesChannel = listMessages.filter(message => message.channelId === currentChannel?.id).length
    setTotalMessages(totalMessagesChannel)
  }, [listMessages])

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      if (pendingMessage) {
        postNewMessage(pendingMessage, currentChannel.id, user.username, user.token)
        setIsFieldDisabled(false)
        fieldMessage.current.value = ''
        setPendingMessage(null)
      }
    };
    const handleOffline = () => {
      setIsOnline(false)
    };
  
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
  
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [pendingMessage]);

  useEffect(() => {
      const socket = io();
  
      socket.on('newMessage', (payload) => {
        dispatch(addMessage(payload))
      });
  
      return () => {
        socket.disconnect();
      };
    }, []);

  const sendMessage = async (e) => {
    e.preventDefault()
    setIsFieldDisabled(true)
    const response = await postNewMessage(fieldMessage.current.value, currentChannel.id, user.username, user.token)
    if (response) {
      fieldMessage.current.value = ''
      setIsFieldDisabled(false)
    } else {
      setPendingMessage(fieldMessage.current.value)
    }
  }

  const disabledSendButton = () => fieldMessage.current.value.length !== 0 ? setIsSendButtonDisabled(false) : setIsSendButtonDisabled(true)
  return (
    <div className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0"><b># {currentChannel?.name}</b></p>
          <span className="text-muted">{t('mainPage.messages', {count: totalMessages})}</span>
        </div>
        <Messages messages={listMessages} currentChannel={currentChannel}/>
          <div className="mt-auto px-5 py-3">
            <form noValidate="" className="py-1 border rounded-2">
              <div className="input-group has-validation">
                <input ref={fieldMessage} name="body" aria-label="Новое сообщение" placeholder={t('mainPage.messagePlaceholder')} className="border-0 p-0 ps-2 form-control" defaultValue="" disabled={isFieldDisabled} onChange={disabledSendButton}/>
                <button type="submit" disabled={isSendButtonDisabled} className="btn btn-group-vertical" onClick={sendMessage}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor" className="bi bi-arrow-right-square">
                    <path fillRule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z"></path>
                  </svg>
                  <span className="visually-hidden">{t('mainPage.send')}</span>
                </button>
              </div>
            </form>
          </div>
      </div>
    </div>
  )
}

export default Chat