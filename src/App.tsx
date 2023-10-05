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
  