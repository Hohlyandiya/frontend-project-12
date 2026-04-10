import axios from 'axios'
import { getApi } from './apiInstance'

const postNewMessage = async (body, channelId, username/* , token */) => {
  const newMessage = { body, channelId, username }
  return axios.post('/api/v1/messages', newMessage, getApi(), /* {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  } */).then(() => true)
    .catch(() => false)
}

export default postNewMessage
