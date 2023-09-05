import { useRoutes } from "react-router-dom"
import router from './router'
import { useEffect } from "react"
import { keepTheme } from "./utils/theme"

const App = () => {
  useEffect(() => {
    keepTheme()
  })
  const outlet = useRoutes(router) 
  return (
    <div className='App'>
      { outlet }
    </div>
  )
}

export default App
  