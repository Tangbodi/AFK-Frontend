import { mothEnmus } from '@/config'
export const actionNamesOper = (actions, actionNames): void => {
  let _actionNames = {} 
  for(let key in actions) {
    _actionNames[key] = key
  }
  actionNames = _actionNames
  console.log(actionNames)
}

export const dateUtils = (timeStr: string) => {
  const tempStr = timeStr.split('T')
  const temp = tempStr[0]
  const target = temp.split('-')
  return `${mothEnmus[target[1]]} ${Number(target[2])}, ${target[0]} ${tempStr[1].substring(0, tempStr[1].length-1)}`
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
