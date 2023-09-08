import React from 'react'
import ReactDOM from 'react-dom/client'
import 'reset-css'
import '@/assets/styles/global.less'
import App from './App.tsx' 
// import Router from './router' // 引用router/index_old 老的路由写法
import { BrowserRouter } from 'react-router-dom'

// 状态管理
import { Provider } from 'react-redux'
import store from '@/store'

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  //   <Provider store={store}>
  //     <BrowserRouter>
  //       <App/>
  //     </BrowserRouter>
  //   </Provider>
  // </React.StrictMode>
  <Provider store={store}>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </Provider>
)
