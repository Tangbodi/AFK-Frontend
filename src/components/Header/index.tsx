import './header.less'
import logo from '@/assets/images/afk_logo_light.png'
import logoDark from '@/assets/images/afk_logo_dark.png'
import iconBell from '@/assets/images/icon_bell.png'
import iconDark from '@/assets/images/icon_dark-mode.png'
import iconUser from '@/assets/images/icon_user.png'
import { SearchOutlined, CloseOutlined } from '@ant-design/icons'
import { setTheme, getTheme } from '@/utils/theme'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useState, useRef } from 'react'
import { searchOptions } from '@/config'
import { Popover, Input, message } from 'antd'
import { searchForumsAPI } from '@/request/api'
import LoginOrRegister from '../LoginOrRegister'
import Notifications from '../Notifications'
import Saved from '../Saved'

const Header = () => {
  const [currentTheme, setCurrentTheme] = useState(getTheme())
  const [optionVisible, setOptionVisible] = useState(false)
  const [inputShow, setInputShow] = useState(false)
  const [open,setOpen] = useState(false)
  const [selectedType, setSelectedType] = useState(null)
  const navigateTo = useNavigate()
  const AccountRef = useRef(null)
  const dispatch = useDispatch()
  

  const handleClick = (isLogin: boolean) => { 
    AccountRef.current.showModal(isLogin)
  }

  const optionVisibleHandle = () => {
    setOptionVisible(!optionVisible)
  }

  const selectOptionHandle = (type: string) => {
    setOptionVisible(false)
    setInputShow(true)
    setSelectedType(type)
  }

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen)
  }

  const searchForums = async(type: string, keyword: string) => {
    const searchForumsRes = await searchForumsAPI({type, keyword})
    if(searchForumsRes.code === 200) {
      console.log('searchForumsRes', searchForumsRes)
      return 
    }
    message.warning(searchForumsRes.message)
  }

  const onSearch = (e: any) => {
    if(!selectedType) {
      message.warning("search type cannot be null")
      return
    }
    searchForums(e.target.value.trim(), selectedType)
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
            <SearchOutlined />
          </div>
          {
            inputShow ?
            (
              <div className='search-inputs'>
                <Input placeholder="Please input ..." allowClear={{clearIcon:<CloseOutlined className='search-inputs-close'/>}} onPressEnter={(e)=>{onSearch(e)}}/>
              </div>
            )
            :
            (
              <div className="search-input" onClick={optionVisibleHandle}>
                Search for forum, topic, games...
              </div>
            )
          }
          
          
        </div>
        {
          optionVisible &&
          <div className='afk-header-center-options'>
            {
              searchOptions.map(option => {
                return (
                  <div className='options-item' key={option.value} onClick={()=>{selectOptionHandle(option.value)}}>
                    <SearchOutlined /><span className='options-item-label'>{option.label}</span>
                  </div>
                )
              })
            }
          </div>
        }
        
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