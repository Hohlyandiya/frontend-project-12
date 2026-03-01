import axios from 'axios'
import { addMessages } from '../store/slices/messagesSlice'
import { toast } from 'react-toastify'

const getMessages = (token, dispatch, translation) => {
  axios.get('/api/v1/messages', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((response) => {
    dispatch(addMessages(response.data))
  }).catch(() => {
    toast(translation('toastContainer.errLoadingData'))
  })
}

export default getMessages
