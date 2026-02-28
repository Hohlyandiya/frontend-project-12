import axios from "axios";

const addNewChannel = (newChannel, token, setCurrentChannel) => {
  axios.post('/api/v1/channels', newChannel, {
  headers: {
    Authorization: `Bearer ${token}`,
  },
}).then((response) => setCurrentChannel(response.data))
}

export default addNewChannel