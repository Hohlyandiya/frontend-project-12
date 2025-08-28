import axios from "axios";

const handlerLogin = async () => {
  const response = await axios.post('/api/v1/login', { username: 'admin', password: 'admin' });
  console.log(response.data);
}

export default handlerLogin;