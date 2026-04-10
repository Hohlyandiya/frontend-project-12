import axios from 'axios'
import { getApi } from './apiInstance'

const deleteChannel = (/* token, */ id) => {
  axios.delete(`/api/v1/channels/${id}`, getApi(),/* {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  } */)
}

export default deleteChannel
