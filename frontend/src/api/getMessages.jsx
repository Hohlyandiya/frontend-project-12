import axios from "axios";
import { addMessages } from "../store/slices/messagesSlice";

const getMessages = (token, dispatch) => {
  axios.get('/api/v1/messages', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((response) => {
    //console.log(response.data); // =>[{ id: '1', body: 'text message', channelId: '1', username: 'admin }, ...]
    dispatch(addMessages(response.data))
  });
}

export default getMessages