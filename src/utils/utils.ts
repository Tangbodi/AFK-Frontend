import { mothEnmus } from '@/config'
import moment from 'moment'
export const actionNamesOper = (actions, actionNames): void => {
  let _actionNames = {} 
  for(let key in actions) {
    _actionNames[key] = key
  }
  actionNames = _actionNames
  console.log(actionNames)
}

export const dateUtils = (timeStr: string, symbol: string, is?: boolean ) => {
  const tempStr = timeStr.split(symbol)
  const temp = tempStr[0]
  const target = temp.split('-')
  const seconds = is ? tempStr[1].substring(0, tempStr[1].length) : tempStr[1].substring(0, tempStr[1].length)
  return `${mothEnmus[target[1]]} ${Number(target[2])}, ${target[0]} ${seconds}`
}

export const arrayToObjArray = (arr) => {
  const objArray = []
  arr.forEach(item => {
    const objItem: any = {}
    objItem.url = item
    objArray.push(objItem)
  })
  return objArray
}

export const twoTimeInterval = (startTime: string, endTime: string) => {
  // 开始时间
  let d1 = startTime.replace(/\-/g, "/");
  let date1 = new Date(d1);
  // 结束时间
  let d2 = endTime.replace(/\-/g, "/");
  let date2 = new Date(d2);
  // 时间相差秒数
  let dateDiff = date2.getTime() - date1.getTime();
  // 计算出相差天数
  let hours = Math.floor(dateDiff / (3600 * 1000));
  // 计算出小时数
  return hours
}

export const notificationsDateUtils = (dateStr: string) => {
  let displayStr = ''
  const temp = dateStr.split('.')[0]
  const endTime = new Date()
  const hours = twoTimeInterval(temp, moment(endTime).format('YYYY-MM-DD HH:mm:ss'))
  if(hours < 24) {
    displayStr = `${hours} hours ago`
  } else {
    displayStr =  dateUtils(temp, ' ', true)
  }
  return displayStr
}


export const uuid = () => {
  var s = []
  var hexDigits = "0123456789abcdef"
  for (var i = 0; i < 36; i++) {
      s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
  }
  s[14] = "4" // bits 12-15 of the time_hi_and_version field to 0010
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1) // bits 6-7 of the clock_seq_hi_and_reserved to 01
  s[8] = s[13] = s[18] = s[23] = "-"

  var uuid = s.join("")
  return uuid
}

export const getUuid = () => {
  const historyUuid = sessionStorage.getItem('afk-uuid')
  const newUuid = historyUuid ? historyUuid : uuid()
  sessionStorage.setItem('afk-uuid', newUuid)
  return newUuid
}

export const getScrollHeight = () =>{
  let scrollHeight = 0
  let bodyScrollHeight = 0
  let documentScrollHeight = 0
  if(document.body){
    bodyScrollHeight = document.body.scrollHeight
  }
  if(document.documentElement){
    documentScrollHeight = document.documentElement.scrollHeight
  }
  scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight 
  return scrollHeight;
}

export const getWindowHeight = () => {
  var windowHeight = 0;
  if(document.compatMode == "CSS1Compat"){
    windowHeight = document.documentElement.clientHeight;
  }else{
    windowHeight = document.body.clientHeight;
  }
  return windowHeight;
}

export const getScrollTop = () => {
  let scrollTop = 0
  let bodyScrollTop = 0
  let documentScrollTop = 0
  if(document.body){
    bodyScrollTop = document.body.scrollTop
  }
  if(document.documentElement){
    documentScrollTop = document.documentElement.scrollTop
  }
  scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop
  return scrollTop
}

export const removeSessionStorage = () => {
  sessionStorage.removeItem('afk-jsessionid')
  sessionStorage.removeItem('afk-avatarurl')
  sessionStorage.removeItem('afk-username')
  sessionStorage.removeItem('afk-userid')
  sessionStorage.removeItem('afk-uuid')
}

export const deepClone = (obj) => {
  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }
  const newObj = Array.isArray(obj) ? [] : {}
  for (let key in obj) {
    newObj[key] = deepClone(obj[key]);
  }
  return newObj
}

export const reversalUtil =  (target) => {
  const temp = Number(target)
  return temp ? 0 : 1
}
