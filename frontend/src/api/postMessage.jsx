import axios from 'axios'
import { getApi } from './apiInstance'

const postNewMessage = async (body, channelId, username) => {
  const newMessage = { body, channelId, username }
  return axios.post('/api/v1/messages', newMessage, getApi()).then(() => true)
    .catch(() => false)
}

export default postNewMessage
