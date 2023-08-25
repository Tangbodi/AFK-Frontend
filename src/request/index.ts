import { message } from 'antd'
import type { AxiosInstance, AxiosResponse } from 'axios'
import axios from 'axios'
import { Console } from 'console'


interface AxiosTokenInstance extends AxiosInstance {}
const instance: AxiosTokenInstance = axios.create({
  baseURL: "/",
  timeout: 5000,
  responseType: 'json',
    headers: {
      'Content-Type': 'application/json',
    },
})

const getErrorCode2text = (response: any): string => {
  /** http status code */
  const code = response.status
  /** notice text */
  let message = 'Request Error'
  switch (code) {
    case 400:
      message = 'Request Error'
      break
    case 401:
      message = 'Unauthorized, please login'
      break
    case 403:
      message = 'Access denied'
      break
    case 404:
      message = 'The access resource does not exist'
      break
    case 408:
      message = 'Request timeout'
      break
    case 500:
      message = 'Position error'
      break
    case 501:
      message = 'The bearer service is not implemented'
      break
    case 502:
      message = 'Gateway error'
      break
    case 503:
      message = 'The service is temporarily unavailable'
      break
    case 504:
      message = 'Gateway timeout'
      break
    case 505:
      message = 'HTTP version not supported yet'
      break
    default:
      message = 'Position error'
  }
  return message
}

instance.interceptors.request.use(config => {
  return config
}, err => {
  return Promise.reject(err)
})

instance.interceptors.response.use((res: AxiosResponse): AxiosResponse => {
  if(res.status === 200) {
    return res.data
  } else if(res.status === 400){
    message.warning(res.data.message)
  } else {
    throw new Error(getErrorCode2text(res.status))
  }
}, (error: any) => {
  let __emsg: string = error.message || ''
  if (error.message) __emsg = error.message
  if (error.response) __emsg = error.response.data.message ? error.response.data.message : error.response.data.data
  if (__emsg && __emsg.includes('timeout')) __emsg = 'timeout'
  if (error?.response?.status !== 200) {
    message.error(__emsg)
  }
  return Promise.reject(new Error(__emsg))
})

export default instance