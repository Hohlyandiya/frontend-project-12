import axios from 'axios'

let apiInstance = null

export const initApi = (token) => {
  apiInstance = axios.create({
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}

export const getApi = () => {
  return apiInstance
}

export const updateApi = (newToken) => {
  if (apiInstance) {
    apiInstance.defaults.headers.common['Authorization'] = `Bearer ${newToken}`
  }
}
