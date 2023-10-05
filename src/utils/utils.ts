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
  const seconds = is ? tempStr[1].substring(0, tempStr[1].length) : tempStr[1].substring(0, tempStr[1].length-1)
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