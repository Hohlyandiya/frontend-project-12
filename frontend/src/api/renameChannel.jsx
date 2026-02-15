import axios from "axios";

const renameChannel = (newNameChannel, selectedChannel, token) => {
  const editedChannel = newNameChannel;
    axios.patch(`/api/v1/channels/${selectedChannel.id}`, editedChannel, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })/* .then((response) => {
    console.log(response.data); // => { id: '3', name: 'new name channel', removable: true }
  }); */
}

export default renameChannel