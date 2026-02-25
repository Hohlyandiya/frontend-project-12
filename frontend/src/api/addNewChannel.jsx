import axios from "axios";

const addNewChannel = (newChannel, token) => {
  axios.post('/api/v1/channels', newChannel, {
  headers: {
    Authorization: `Bearer ${token}`,
  },
})
}

export default addNewChannel