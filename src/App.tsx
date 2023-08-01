// import { useEffect } from "react"
import { useRoutes } from "react-router-dom" // useLocation, useNavigate
import router from './router'
// import { message } from "antd"

// function ToLogin() {
//   // 去登录页
//   // 加载完这个组件之后实现跳转
//   const navigateTo = useNavigate()
//   useEffect(()=>{
//     // 加载完组件之后执行这里的代码
//     navigateTo('/login')
//     message.warning("您还没有登录，请登录")
//   },[])
//   return <div></div>
// }

// function ToPage1() {
//   // 去首页
//   // 加载完这个组件之后实现跳转
//   const navigateTo = useNavigate()
//   useEffect(()=>{
//     // 加载完组件之后执行这里的代码
//     navigateTo('/page1')
//     message.warning("您已经登录了")
//   },[])
//   return <div></div>
// }
// // react-router 没有提供路由守卫的概念
// function BeforeRouterEnter () {
//   const outlet = useRoutes(router)
//   /**
//    * 对于后台管理系统 两种经典的跳转情况
//    * 1、如果访问的是登录页面，且有token，跳转首页
//    * 2、如果访问的不是登录页面，且没有token，跳转到登录页
//    * 3、其余的都可以正常放行
//    */
//   const location = useLocation()
//   const token = localStorage.getItem('test-token')
//   if(location.pathname ==='/login' && token){
//     // 这里不能直接用navigateto 因为这里需要一个正常的jsx组件
//     return <ToPage1/>
//   }
//   if(location.pathname !== '/login' && !token) {
//     console.log('xxx')
//     return <ToLogin/>
//   }
//   return outlet
// }



function App() {
  const outlet = useRoutes(router) 
  return (
    <div className='App'>
      {/* outlet占位符组件，类似于窗口，用来展示组件，有点类似vue中router-view */}
      { outlet }
      {/* <BeforeRouterEnter/> */}
    </div>
  )
}

export default App
  