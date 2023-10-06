import { message } from 'antd'
import type { AxiosInstance, AxiosResponse } from 'axios'
import axios from 'axios'
// import ReactDOM from 'react-dom'
import BackdropLoading from '@/components/Backdrop'
import { createRoot } from "react-dom/client";


let requestCount = 0
const showLoading = () => {
  if (requestCount === 0) {
      var dom = document.createElement('div')
      dom.setAttribute('id', 'loading')
      document.body.appendChild(dom)
      // ReactDOM.render(<BackdropLoading/>, dom) react17的写法 18支持 但会告警
      const target = createRoot(document.getElementById('loading'))
      target.render(<BackdropLoading/>)
  }
  requestCount++
} 
const hideLoading = () => {
  requestCount--
  if (requestCount === 0) {
      document.body.removeChild(document.getElementById('loading'))
  }
}

interface AxiosTokenInstance extends AxiosInstance {}
const instance: AxiosTokenInstance = axios.create({
  baseURL: "/",
  timeout: 50000,
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
  config.headers.isLoading !== false && showLoading()
  return config
}, err => {
  err.config.headers.isLoading !== false && hideLoading()
  return Promise.reject(err)
})

instance.interceptors.response.use((res: AxiosResponse): AxiosResponse => {
  res.config.headers.isLoading !== false && hideLoading()
  if(res.status === 200) {
    return res.data
  } else if(res.status === 400){
    message.warning(res.data.message)
  } else {
    throw new Error(getErrorCode2text(res.status))
  }
}, (error: any) => {
  error.config.headers.isLoading !== false && hideLoading()
  let __emsg: string = error.message || ''
  if (error.message) __emsg = error.message
  if (error.response) __emsg = error.response.data.message ? error.response.data.message : error.response.data.data
  if (__emsg && __emsg.includes('timeout')) __emsg = 'timeout'
  if (error?.response?.status !== 200) {
    // debugger
    if(error?.response?.status !== 401) {
      message.error(__emsg)
      // window.location.href = window.location.origin
    } else {
      message.error(__emsg)
      const pathname = window.location.pathname
      if(pathname.indexOf('settings') != -1) {
        sessionStorage.removeItem('afk-jsessionid')
        sessionStorage.removeItem('afk-avatarurl')
        sessionStorage.removeItem('afk-username')
        sessionStorage.removeItem('afk-userid')
        sessionStorage.removeItem('afk-uuid')
        window.location.href = window.location.origin
      }
    }
  }
  return Promise.reject(new Error(__emsg))
})

export default instance