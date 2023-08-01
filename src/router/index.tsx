import React, { lazy } from 'react' // 路由懒加载函数
import Home2 from "../views/Home"
import { Navigate } from 'react-router-dom'
import Login from '@/views/Login'
import Home from '@/views/Home/index'
const Page301 = lazy(()=> import("../views/Page3-1"))
const Page1 = lazy(()=> import("../views/Page1"))
const Page2 = lazy(()=> import("../views/Page2"))

/**
 * 懒加载组件处理
 * @param comp 
 * @returns 
 */
const withLoadingComponent = (comp: JSX.Element) => (
  <React.Suspense fallback={<div> Loading... </div>}>
    { comp }
  </React.Suspense>
)
const routes = [
  {
    path: '/',
    element: <Home/>
  },
  {
    path: '/',
    element: <Home2/>,
    children: [
      {
        path: '/page1',
        element: withLoadingComponent(<Page1/>)
      },
      {
        path: '/page2',
        element: withLoadingComponent(<Page2/>)
      },
      {
        path: '/page3/page3-1',
        element: withLoadingComponent(<Page301/>)
      },
    ]
  },
  {
    path: '/login',
    element: <Login/> 
  },
  // 访问不存在的路由处理
  {
    path: '*',
    element: <Navigate to='/home'/>
  }
]

export default routes 