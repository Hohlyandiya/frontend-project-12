import axios from "axios";

const deleteChannel = (token, id) => {
  axios.delete(`/api/v1/channels/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })/* .then((response) => {
    console.log(response.data); // => { id: '3' }
  }); */
}

export default deleteChannel