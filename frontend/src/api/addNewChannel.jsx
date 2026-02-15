import axios from "axios";

const addNewChannel = (newChannel, token) => {
  axios.post('/api/v1/channels', newChannel, {
  headers: {
    Authorization: `Bearer ${token}`,
  },
})/* .then((response) => {
  console.log(response.data); // => { id: '3', name: 'new channel', removable: true }
}); */
}

export default addNewChannel