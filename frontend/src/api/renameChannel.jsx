import axios from 'axios'
import { getApi } from './apiInstance'

const renameChannel = (newNameChannel, selectedChannel/* , token */) => {
  const editedChannel = newNameChannel
  axios.patch(`/api/v1/channels/${selectedChannel.id}`, editedChannel, getApi()/* {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  } */)
}

export default renameChannel
