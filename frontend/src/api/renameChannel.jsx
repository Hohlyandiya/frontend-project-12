import axios from 'axios'
import { getApi } from './apiInstance'

const renameChannel = (newNameChannel, selectedChannel) => {
  const editedChannel = newNameChannel
  axios.patch(`/api/v1/channels/${selectedChannel.id}`, editedChannel, getApi())
}

export default renameChannel
