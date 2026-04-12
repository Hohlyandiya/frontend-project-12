import axios from 'axios'
import { getApi } from './apiInstance'

const deleteChannel = (id) => {
  axios.delete(`/api/v1/channels/${id}`, getApi())
}

export default deleteChannel
