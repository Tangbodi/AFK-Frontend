// 专门定义请求和响应类型
// 选中的json shift + control + option + s
// 复制的json shift + control + option + v
interface CaptchaAPIRes {
  msg: string;
  img: string;
  code: number;
  captchaEnabled: boolean;
  uuid: string;
}

interface LoginAPIReq {
  username: string;
  password: string;
  code: string;
  uuid: string
}

interface LoginAPIRes {
  msg: string;
  code: number;
  token: string;
}