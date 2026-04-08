import axios from "axios";

const handlerLogin = async (username, password, setStateField, navigate) => {
  await axios.post('/api/v1/login', { username, password })
    .catch((e) => {
      setStateField("is-invalid")
    })
    .then((resp) => {
      localStorage.setItem('token', resp.data.token)
      localStorage.setItem('username', resp.data.username)
      setStateField("")
      navigate(('/'))
    })
} 

export default handlerLogin;