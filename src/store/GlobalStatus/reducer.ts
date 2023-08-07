import globalStatus from "./index"
const reducer = (state = { ...globalStatus.state }, action: { type: string, val: number  }) => {
  const newState = JSON.parse(JSON.stringify(state))
  for(let key in globalStatus.actionNames){
    // 判断是否相等
    if(action.type === globalStatus.actionNames[key]){
      globalStatus.actions[globalStatus.actionNames[key]](newState, action)
      break
    }
  } 
  return newState
}

export default reducer