import axios from "axios";

const renameChannel = (newNameChannel, selectedChannel, token) => {
  const editedChannel = newNameChannel;
    axios.patch(`/api/v1/channels/${selectedChannel.id}`, editedChannel, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}

export default renameChannel