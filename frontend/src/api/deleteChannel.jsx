import axios from 'axios'

const deleteChannel = (token, id) => {
  axios.delete(`/api/v1/channels/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}

export default deleteChannel
