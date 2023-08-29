import React, { lazy } from 'react' // 路由懒加载函数
import Home2 from "../views/Home"
import { Navigate } from 'react-router-dom'
import Loading from '@/components/Loading'
import Login from '@/views/Login'
import Home from '@/views/Home/index'
import Layout from '@/views/Layout/layout'
import SettingsLayout from '@/views/Layout/settingsLayout'
const Page301 = lazy(()=> import("../views/Page3-1"))
const Page1 = lazy(()=> import("../views/Page1"))
const Page2 = lazy(()=> import("../views/Page2"))
const Forum = lazy(()=> import("../views/Forum"))
const Topic = lazy(()=> import("../views/Topic"))
const Store = lazy(()=> import("../views/Store"))
const MyInfo = lazy(()=> import("../views/Settings/MyInfo"))
const Activities = lazy(()=> import("../views/Settings/Activities"))
const Notifications = lazy(()=> import("../views/Settings/Notifications"))
const Security = lazy(()=> import("../views/Settings/Security"))
const News = lazy(()=> import("../views/News"))
const Search = lazy(()=> import("../views/Search"))
/**
 * 懒加载组件处理
 * @param comp 
 * @returns 
 */
const withLoadingComponent = (comp: JSX.Element) => (
  <React.Suspense fallback={<Loading/>}>
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
    path: '/',
    element: <SettingsLayout/>,
    children: [
      {
        path: '/settings/myinfo',
        element: withLoadingComponent(<MyInfo/>)
      },
      {
        path: '/settings/activities',
        element: withLoadingComponent(<Activities/>)
      },
      {
        path: '/settings/notifications',
        element: withLoadingComponent(<Notifications/>)
      },
      {
        path: '/settings/security',
        element: withLoadingComponent(<Security/>)
      }
    ]
  },
  {
    path: '/',
    element: <Layout/>,
    children: [
      {
        path: '/forum/:gameId',
        element: withLoadingComponent(<Forum/>)
      },
      {
        path: '/topic/:postId',
        element: withLoadingComponent(<Topic/>)
      },
      {
        path: '/store',
        element: withLoadingComponent(<Store/>)
      },
      {
        path: '/news/:id',
        element: withLoadingComponent(<News/>)
      },
      {
        path: '/search',
        element: withLoadingComponent(<Search/>)
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
    element: <Navigate to='/'/>
  }
]

export default routes 