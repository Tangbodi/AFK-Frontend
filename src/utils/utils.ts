export const actionNamesOper = (actions, actionNames): void => {
  let _actionNames = {} 
  for(let key in actions) {
    _actionNames[key] = key
  }
  actionNames = _actionNames
}