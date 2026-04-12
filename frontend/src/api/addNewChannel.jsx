import axios from 'axios'
import { getApi } from './apiInstance'

const addNewChannel = (newChannel, setCurrentChannel) => {
  axios.post('/api/v1/channels', newChannel, getApi())
  .then(response => setCurrentChannel(response.data))
}

export default addNewChannel
