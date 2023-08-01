import request from './index'

// 请求中：请求参数和返回值的类型都需要进行约束

// 验证码请求
export const captchaAPI = (): Promise<CaptchaAPIRes> => request.get('/prod-api/captchaImage')

export const loginAPI = (params: LoginAPIReq): Promise<LoginAPIRes> => request.post('/prod-api/login', params)