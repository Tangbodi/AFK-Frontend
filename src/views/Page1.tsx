import { useSelector, useDispatch } from 'react-redux'
import numStatus from '@/store/NumStatus'
// import store from '@/store'
const View = () => {
  // dispatch修改reduxstate 数据
  const dispatch = useDispatch()
  // dispatch获取reduxstate 数据
  const { num, sarr } = useSelector((state: RootState) => ({
    num: state.handleNum.num,
    sarr: state.handleArr.sarr
  }))
  const changeNum = () => {
    dispatch({type:"add3", val: 100})
  }

  const changeNumAsync = () => {
    // dispatch({type:"add1"})
    // dispatch((dis: Function)=>{
    //   setTimeout(()=>{
    //     dis({type:"add1"})
    //   }, 1000)
    // })
    // redux-thunk写法
    // dispatch调用状态管理中的asyncAdd1()
    dispatch(numStatus.asyncActions.asyncAdd1)
  }
  
  const changeArr = () => {
    dispatch({type: 'sarrpush', val: 100})
  }
  return (
    <div className="home">
      <p>Page11内容</p>
      <p>{num}</p>
      <button onClick={changeNum}>同步按钮</button>  
      <button onClick={changeNumAsync}>异步调用</button>
      <button onClick={changeArr}>数组添加</button>
      <p>{sarr}</p>
    </div>
  )
}

export default View