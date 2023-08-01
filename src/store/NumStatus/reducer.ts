// 管理数据
import handleNum from "./index"

const reducer = (state = { ...handleNum.state }, action: { type: string, val: number  }) => {
  // 调用dispatch 触发这里
  const newState = JSON.parse(JSON.stringify(state))
  // switch 做法拿action.type 和case每个进行比对
  // 把case里的值做成对象进行遍历，actionNames
  // switch(action.type) {
  //   case handleNum.add1:
  //     handleNum.actions[handleNum.add1](newState)
  //     break
  //   case handleNum.add2:
  //     handleNum.actions[handleNum.add2](newState, action)
  //     break
  //   default:
  //     break 
  // } 
  // 优化 每添加一个方法都要在这里多写一个case
  // 拿着 actionType 和 actionNames 进行每一项对比， 如果相等就调用 模块名.actions[下标](newState, action)
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