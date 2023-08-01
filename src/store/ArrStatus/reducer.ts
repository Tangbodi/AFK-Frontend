// 管理数据
import handleArr from './index'

const reducer = (state = { ...handleArr.state }, action: { type: string, val: number  }) => {
  // 调用dispatch 触发这里
  const newState = JSON.parse(JSON.stringify(state))
  for(let key in handleArr.actionNames){
    // 判断是否相等
    if(action.type === handleArr.actionNames[key]){
      handleArr.actions[handleArr.actionNames[key]](newState, action)
      break
    }
  } 
  return newState
}

export default reducer