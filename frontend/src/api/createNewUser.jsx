import axios from "axios";

const createNewUser = (newUser) => {
  return axios.post('/api/v1/signup', newUser)
    .then((response) => {
      localStorage.setItem('token', response.data.token)
      localStorage.setItem('username', response.data.username)
      return true
    })
    .catch(() => false)
}

export default createNewUser