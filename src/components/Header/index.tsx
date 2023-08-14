import './header.less'
import logo from '@/assets/images/afk_logo_light.png'
import logoDark from '@/assets/images/afk_logo_dark.png'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import ClearRoundedIcon from '@mui/icons-material/ClearRounded'
import iconBell from '@/assets/images/icon_bell.png'
import iconDark from '@/assets/images/icon_dark-mode.png'
import iconUser from '@/assets/images/icon_user.png'
import LoginOrRegister from '../LoginOrRegister'
import Saved from '../Saved'
import { setTheme, getTheme } from '@/utils/theme'
import { useNavigate } from 'react-router-dom'
import { useState, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { Popover } from 'antd'
import Notifications from '../Notifications'
const Header = () => {
  const navigateTo = useNavigate()
  const AccountRef = useRef(null)
  const [open,setOpen] = useState(false)
  const handleClick = (isLogin: boolean) => { 
    AccountRef.current.showModal(isLogin)
  }
  const dispatch = useDispatch()
  const [currentTheme, setCurrentTheme] = useState(getTheme())

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen)
  }

  const modifyMode = () => {
    const currentTheme = localStorage.getItem('theme')
    const theme = currentTheme === 'theme-light' ? 'theme-dark' : 'theme-light'
    setTheme(theme)
    setCurrentTheme(theme)
    dispatch({type:"modifyMode", val: theme})
  }
  return (
    <>
    <header className="afk-header">
      <div className="afk-header-left">
        <span onClick={()=>{navigateTo('/')}}>
        { currentTheme === 'theme-light' ?
          <img src={logo} width="120" height="90"/>
          :
          <img src={logoDark} width="120" height="90"/>
        }
          
        </span>
        <div className="menu">
          <span onClick={()=>{navigateTo('/')}}>Home</span>
          <span onClick={()=>{navigateTo('/store')}}>Store</span>
        </div>
      </div>
      <div className="afk-header-center">
        <div className="afk-header-center_bar">
          <div className="search-icon">
            <SearchRoundedIcon sx={{ color: '#745B3F', fontSize: '18px' }}/>
          </div>
          <div className="search-input">
            <input placeholder="Search for forum, topic, games..." maxLength={100}/>
          </div>
          <div className="search-clear">
            <ClearRoundedIcon sx={{ color: '#745B3F', fontSize: '18px'}}/>
          </div>
        </div>
      </div>
      <div className='afk-header-right'>
        <div className="right-item" onClick={modifyMode}>
          <img src={iconDark} width={24} height={24}/>
        </div>
        <div className="right-item">
          <Popover
           rootClassName="custome-popover"
           trigger="click"
           placement="bottomRight"
           content={<Notifications/>}
           open={open}
           onOpenChange={handleOpenChange}
          >
            <img src={iconBell} width={24} height={24}/>
          </Popover>
        </div>
        <div className="right-item" onClick={()=>{handleClick(true)}}>
          <img src={iconUser} width={22} height={22}/>
        </div>
      </div>
    </header>
    <LoginOrRegister ref={AccountRef}/>
    <Saved/>
    </>
  )
}
export default Header