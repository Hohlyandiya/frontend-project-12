import axios from 'axios'
import { setChannels } from '../store/slices/channelsSlice'
import { toast } from 'react-toastify'
import { getApi } from './apiInstance'

const loadingChannels = (/* token, */ dispatch, translation) => {

  axios.get('/api/v1/channels', getApi()/* {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  } */).then((response) => {

    dispatch(setChannels(response.data))
  }).catch(() => {

    toast(translation('toastContainer.errLoadingData'))
  })
}

export default loadingChannels
