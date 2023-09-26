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
  const temp = timeStr.split('T')[0]
  const target = temp.split('-')
  return `${mothEnmus[target[1]]} ${Number(target[1])}, ${target[0]}`
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
