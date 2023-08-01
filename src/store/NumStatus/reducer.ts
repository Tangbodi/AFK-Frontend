// 管理数据
import handleNum from "./index"
const reducer = (state = { ...handleNum.state }, action: { type: string, val: number  }) => {
  const newState = JSON.parse(JSON.stringify(state))
  for(let key in handleNum.actionNames){
    // 判断是否相等
    if(action.type === handleNum.actionNames[key]){
      handleNum.actions[handleNum.actionNames[key]](newState, action)
      break
    }
  } 
  return newState
}

export default reducer