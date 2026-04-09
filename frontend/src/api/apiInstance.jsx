import axios from 'axios'

let apiInstance = null

export const updateApi = (newToken) => {
  if (apiInstance) {
    apiInstance.defaults.headers.common['Authorization'] = `Bearer ${newToken}`
  }
}

export const initApi = (token) => {
  if (!apiInstance) {
    apiInstance = axios.create({
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  }
  else {
    updateApi(token)
  }
}

export const getApi = () => {
  const authorizationValue = apiInstance.defaults.headers.Authorization
  const authorization = { headers: {
    Authorization: authorizationValue,
  } }
  //console.log(authorization)
  return authorization
}
