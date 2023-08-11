const store = {
  state: {
    mode: 'theme-light'
  },
   actions: {
    modifyMode(newState: {mode: string}, action: {type: string, val: string}) { // 只放同步的方法
      newState.mode = action.val
    },
   },
   // redux-thunk异步写法
   asyncActions: { // 只放异步方法
   },
   actionNames: {}
}

let actionNames = {} 
for(let key in store.actions) {
  actionNames[key] = key
}
store.actionNames = actionNames

export default store