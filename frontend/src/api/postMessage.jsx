import axios from 'axios'

const postNewMessage = async (body, channelId, username, token) => {
  const newMessage = { body, channelId, username }
  return axios.post('/api/v1/messages', newMessage, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then(() => true)
    .catch(()=> false)
}

export default postNewMessage
