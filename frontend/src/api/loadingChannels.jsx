import axios from "axios";
import { setChannels } from "../store/slices/channelsSlice";

const loadingChannels = (token, dispatch) => {
  axios.get('/api/v1/channels', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((response) => {
    dispatch(setChannels(response.data))
  });
}

export default loadingChannels