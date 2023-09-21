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

interface APIRes {
  code: number;
  message: string;
  data: any;
  error?: string;
  timestamp?: number
}

interface RegistrationAPIReq {
  username: string;
  email: string;
  password: string;
  confirmPassword: string
}

interface LoginAPIReq {
  username: string;
  password: string;
}

interface UpdateEmailAddressReq {
  email: string;
}

interface UpdateMailAddressReq {
  country: string;
  state: string;
  address: string;
  city: string;
  zip: string;
  phone: string;
}

enum Settings {
  MyInfo = 'My info',
  Notifications = 'Notifications',
  Activities = 'Activities',
  Security = 'Privacy and Security'
}

interface HomeMergedReq {
  type: string
}

interface SearchForumsReq {
  type: string;
  keyword: string;
}

interface GameInfoReq {
  genre: string;
  game: string;
}

interface GameData {
  description: string;
  gameId: number;
  gameName: string;
  genreId: number;
  iconUrl: string

}

interface SaveGamesReq{
  objectId: string;
  status: number;
  typeId: number;
}

interface SavePostReq {
  genreId: string;
  gameId: string;
  title: string;
  textRender: string;
  postImageNameList: any
}

interface ShowPostBodyReq {
  genre: string;
  game: string;
  post: string
}

interface CommentsRepliesReq extends ShowPostBodyReq {
  page: number;
  size: number;
}

interface LikeSavePostReq {
  objectId: string;
  status: number;
  typeId: number;
}

interface EditCommentReq {
  genreId: string;
  gameId: string;
  postId: string;
  toUid: string;
  content: string;
}

interface EditReplyReq extends EditCommentReq {
  commentId: string;
  toReplyId?: string;
}

interface UpdatePasswordReq {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface ForgotPasswordReq {
  email: string
}

interface EnterPasswordReq{
  newPassword: string;
  confirmPassword: string;
}

interface GetNewsReq {
  page: number;
  size: number;
}

interface GetNewsDetailReq {
  game: number;
  genre: number;
  news: string;
}

interface NewsDetail {
  content: string;
  description: string;
  gameIconUrl: string;
  gameId: number;
  gameName: string;
  genreId: number;
  mediaContentUrl: string;
  newsId: string;
  pubDate: string;
  source: string;
  title: string;
}