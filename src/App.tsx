import { useRoutes } from "react-router-dom"
import router from './router'
import { useEffect } from "react"
import { keepTheme, autoSetTheme } from "./utils/theme"
import { getUuid } from "./utils/utils"
import { useDispatch } from 'react-redux'

const App = () => {
  useEffect(() => {
    getUuid()
    autoSetTheme()
    keepTheme()
    persistSessionId()
    // setInterval(()=>{
    //   console.log('xxdd')
    //   const t = localStorage.getItem('theme')
    //   if(t === 'theme-light') {
    //     localStorage.setItem('theme', 'theme-dark')
    //     window.location.reload()
    //   } else {
    //     localStorage.setItem('theme', 'theme-light')
    //     window.location.reload()
    //   }
    // }, 5000)
  })
  const dispatch = useDispatch()
  const persistSessionId = () => {
    const sessionId = sessionStorage.getItem('afk-jsessionid')
    if(!sessionId) return
    dispatch({type:"afkToken", val: sessionId})
  }
  const outlet = useRoutes(router) 
  return (
    <div className='App'>
      { outlet }
    </div>
  )
}

export default App
  