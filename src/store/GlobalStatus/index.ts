const store = {
  state: {
    mode: 'theme-light'
  },
  actions: {
    modifyMode(newState: {mode: string}, action: {type: string, val: string}) { // 只放同步的方法
      newState.mode = action.val
    },
    searchResult(newState: {result: any}, action: {type: string, val: any}) {
      newState.result = action.val
    },
    savedForums(newState: {savedForums: any}, action: {type: string, val: any}) {
      newState.savedForums = action.val
    },
    afkToken(newState:{afkToken: boolean}, action: {type: string, val: boolean}){
      newState.afkToken = action.val
    },
    isLoginFiber(newState:{isLoginFiber: boolean}, action: {type: string, val: boolean}) {
      newState.isLoginFiber = action.val
    },
    isSavedForumFiber(newState:{isSavedForumFiber: number}, action: {type: string, val: number}) {
      newState.isSavedForumFiber = action.val
    }
  },
  // redux-thunk异步写法
  asyncActions: { // 只放异步方法
    // asyncSavedForums(dispatch:Function) {
    //   console.log('xxss')
    //   dispatch({type:'savedForums', val: 22})
    // }
  },
  actionNames: {}
}

let actionNames = {} 
for(let key in store.actions) {
  actionNames[key] = key
}
store.actionNames = actionNames

export default store