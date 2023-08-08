import type { AxiosInstance } from 'axios'
import axios from 'axios'


interface AxiosTokenInstance extends AxiosInstance {}
const instance: AxiosTokenInstance = axios.create({
  baseURL: "/",
  timeout: 5000,
  responseType: 'json',
    headers: {
      'Content-Type': 'application/json',
    },
})

instance.interceptors.request.use(config => {
  return config
}, err => {
  return Promise.reject(err)
})

instance.interceptors.response.use(res => {
  return res.data
}, err => {
  return Promise.reject(err)
})

export default instance