import axios from 'axios'
import { addMessages } from '../store/slices/messagesSlice'
import { toast } from 'react-toastify'
import { getApi } from './apiInstance'

const getMessages = (dispatch, translation) => {
  axios.get('/api/v1/messages', getApi()).then((response) => {
    dispatch(addMessages(response.data))
  }).catch(() => {
    toast(translation('toastContainer.errLoadingData'))
  })
}

export default getMessages
