/* import { useDispatch } from "react-redux"
import { addMessage } from '../store/slices/messagesSlice'
import { io } from 'socket.io-client'

const socketAPI = () => {
  const dispatch = useDispatch()

  const socket = io()
  socket.on('newMessage', (payload) => {
    dispatch(addMessage(payload))
    //console.log(payload) // => { body: "new message", channelId: 7, id: 8, username: "admin" }
  });
}

export default socketAPI */

/* import { io } from "socket.io-client";
import { useDispatch } from "react-redux";

const dispatch = useDispatch()
const socket = io();
  
socket.on('newChannel', (payload) => {
  dispatch(addChannel(payload))
    setCurrentChannel(payload)
  }); */