import React from 'react'
import Button from '@mui/material/Button'
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { settingsList } from '@/config'
import './settinsLayout.less'
const AccountLayout: React.FC = () => {
  const currenRoute = useLocation()
  const naigateTo = useNavigate()
  return (
    <>
      <Header/>
      <div className="afk-user">
        <div className="afk-user-sidebar">
          <ul>
            { settingsList.map(setting => (<li className={currenRoute.pathname === setting.path ? 'active': null} key={setting.path} onClick={()=>{naigateTo(setting.path)}}>{setting.name}</li>))}
          </ul>
          <div className='afk-logout'>
            <Button className="default-btn w218" variant="contained">Log out</Button>
          </div>
        </div>
        <div className="afk-user-content">
          <Outlet/>
        </div>
      </div>
      <Footer/>
    </>
  )
}

export default AccountLayout