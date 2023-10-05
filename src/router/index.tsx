import React, { lazy } from 'react'
import { Navigate } from 'react-router-dom'
import Loading from '@/components/Loading'
import Home from '@/views/Home/index'
import Layout from '@/views/Layout/layout'
import SettingsLayout from '@/views/Layout/settingsLayout'
import NotFound from '@/views/Exception/NotFound'
import VerifySuccess from '@/views/Forgot/VerifySuccess'
import VerifyFailed from '@/views/Forgot/VerifyFailed'
const Forum = lazy(()=> import("../views/Forum"))
const Topic = lazy(()=> import("../views/Topic"))
const Store = lazy(()=> import("../views/Store"))
const MyInfo = lazy(()=> import("../views/Settings/MyInfo"))
const Activities = lazy(()=> import("../views/Settings/Activities"))
const Notifications = lazy(()=> import("../views/Settings/Notifications"))
const Security = lazy(()=> import("../views/Settings/Security"))
const News = lazy(()=> import("../views/News"))
const NewsDetail = lazy(()=> import("../views/News/detail"))
const Search = lazy(()=> import("../views/Search"))
const Reset = lazy(()=> import("../views/Reset"))
const ErrorComp = lazy(()=> import("../views/Exception/Error"))
const SendEmail = lazy(()=> import("../views/Forgot/SendEmail"))
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
        path: '/forgot/sendemail',
        element: withLoadingComponent(<SendEmail/>)
      },
      {
        path: '/verifysuccess',
        element: withLoadingComponent(<VerifySuccess/>)
      },
      {
        path: '/verifyfailed',
        element: withLoadingComponent(<VerifyFailed/>)
      },
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
        path:'/news',
        element: withLoadingComponent(<News/>)
      },
      {
        path: '/news/:newsId',
        element: withLoadingComponent(<NewsDetail/>)
      },
      {
        path: '/search',
        element: withLoadingComponent(<Search/>)
      },
      {
        path: '/reset',
        element: withLoadingComponent(<Reset/>)
      },
      {
        path: '/error',
        element: withLoadingComponent(<ErrorComp/>)
      },
      {
        path: '/404',
        element: <NotFound/>
      }
    ]
  },
  // 访问不存在的路由处理
  {
    path: '*',
    element: <Navigate to='/404'/>
  }
]

export default routes 