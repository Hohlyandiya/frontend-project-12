import axios from "axios";
import { getApi } from "./apiInstance";

const addNewChannel = (newChannel/* , token */) => {
  axios.post('/api/v1/channels', newChannel, getApi()/* {
  headers: {
    Authorization: `Bearer ${token}`,
  },
} */)
}

export default addNewChannel