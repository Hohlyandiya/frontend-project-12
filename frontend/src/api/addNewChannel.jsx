import axios from "axios";
import { getApi } from "./apiInstance";

const addNewChannel = (newChannel/* , token */, setCurrentChannel) => {
  axios.post('/api/v1/channels', newChannel, getApi()/* {
  headers: {
    Authorization: `Bearer ${token}`,
  },
} */).then(response => setCurrentChannel(response.data))
}

export default addNewChannel