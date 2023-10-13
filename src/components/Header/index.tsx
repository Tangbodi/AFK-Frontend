import './header.less'
import logo from '@/assets/images/afk_logo_light.png'
import logoDark from '@/assets/images/afk_logo_dark.png'
import iconBell from '@/assets/images/icon_bell.png'
import iconDark from '@/assets/images/icon_dark-mode.png'
import iconUser from '@/assets/images/icon_user.png'
import { SearchOutlined, CloseOutlined } from '@ant-design/icons'
import Avatar from '@mui/material/Avatar'
import { setTheme, getTheme } from '@/utils/theme'
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useState, useEffect, useMemo } from 'react'
import { searchOptions } from '@/config'
import { Popover, Input, message } from 'antd'
import { searchForumsAPI, unreadMessageAPI } from '@/request/api'
import LoginOrRegister from '../LoginOrRegister'
import Notifications from '../Notifications'
import Saved from '../Saved'
const Header = () => {
  const [open, setOpen] = useState(false)
  const [inputShow, setInputShow] = useState(false)
  const [currentTheme, setCurrentTheme] = useState(getTheme())
  const [optionVisible, setOptionVisible] = useState(false)
  const [selectedType, setSelectedType] = useState(null)
  const [avatarUrl, setAvatarUrl] = useState(null)
  const [username, setUsername] = useState(null)
  const [searchParams] = useSearchParams()
  const navigateTo = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()
  const [unreadMessages, setUnreadMessages] = useState([])
  const { afkToken, isLoginFiber } = useSelector((state: RootState) => ({
    afkToken: state.gobalStatus.afkToken,
    isLoginFiber: state.gobalStatus.isLoginFiber
  }))
  
  const useInfoInit = () => {
    const avatarUrlSession = sessionStorage.getItem('afk-avatarurl')
    const usernameSession = sessionStorage.getItem('afk-username')
    setAvatarUrl(avatarUrlSession)
    setUsername(usernameSession)
  }

  useEffect(() => {
    unreadMessageMethod()
    dispatch({type:'isLoginFiber', val: false})
    // 如果当前路由为search，则执行一次查询api
    if(location.pathname === '/search') searchForums(searchParams.get('type'),searchParams.get('keywords'))
    setTheme(localStorage.getItem('theme'))
  },[])

  useMemo(()=>{
    useInfoInit()
  }, [afkToken])

  useEffect(()=>{
    useInfoInit()
  },[location])
  // goto account info
  const handleClick = (isLogin: boolean) => { 
    dispatch({type:'isLoginFiber', val: false})
    const _afkToken = sessionStorage.getItem('afk-jsessionid')
    if(_afkToken) {
      navigateTo('/settings/myinfo')
      return
    }
    dispatch({type:'isLoginFiber', val: isLogin})
  }
  

  // open search input component
  const optionVisibleHandle = () => {
    setOptionVisible(!optionVisible)
  }

  // search select options func
  const selectOptionHandle = (type: string) => {
    setOptionVisible(false)
    setInputShow(true)
    setSelectedType(type)
  }

  // popup open
  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen)
  }
  
  // 请求搜索api
  const searchForums = async(type: string, keyword: string) => {
    const searchForumsRes = await searchForumsAPI({type, keyword})
    if(searchForumsRes.code === 200) {
      dispatch({type:"searchResult", val: searchForumsRes.data})
      return 
    }
    message.warning(searchForumsRes.message)
  }

  const unreadMessageMethod = async() => {
    const unreadMessagesRes = await unreadMessageAPI()
    if(unreadMessagesRes.code === 200) {
      setUnreadMessages(unreadMessagesRes.data||[])
      return
    }
    message.warning(unreadMessagesRes.message)
  }

  // enter 搜索事件
  const onSearch = (e: any) => {
    if(!selectedType) {
      message.warning("search type cannot be null")
      return
    }
    navigateTo(`/search?keywords=${e.target.value.trim()}&type=${selectedType}`)
    // 如果当前路由为search，则执行一次查询api
    if(location.pathname === '/search') searchForums(selectedType,e.target.value.trim())
  }
  const closeable = (isClosed: boolean) => {
    dispatch({type:'isLoginFiber', val: !isClosed})
  }
  // theme 切换
  const modifyMode = () => {
    const uuid = sessionStorage.getItem('afk-uuid')
    const currentTheme = localStorage.getItem('theme')
    const theme = currentTheme === 'theme-light' ? 'theme-dark' : 'theme-light'
    sessionStorage.setItem(uuid, '1')
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
          {/* <span onClick={()=>{navigateTo('/store')}}>Store</span> */}
        </div>
      </div>
      <div className="afk-header-center">
        <div className="afk-header-center_bar">
          <div className="search-icon">
            <SearchOutlined />
          </div>
          {
            inputShow ?
            (<div className='search-inputs'>
              <Input placeholder="Please enter ..." allowClear={{clearIcon:<CloseOutlined className='search-inputs-close'/>}} onPressEnter={(e)=>{onSearch(e)}}/>
            </div>)
            :
            (<div className="search-input" onClick={optionVisibleHandle}>
              Search for forum, topic, games...
            </div>)
          }
        </div>
        { optionVisible &&
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
          { unreadMessages.length > 0 && <i className='right-item-noread'></i>}
          <Popover
           rootClassName="custome-popover"
           trigger="click"
           placement="bottomRight"
           content={<Notifications unreadMessages={unreadMessages}/>}
           open={open}
           onOpenChange={handleOpenChange}
          >
            <img src={iconBell} width={24} height={24}/>
          </Popover>
        </div>
        {!username && (
            <div className="right-item" onClick={()=>{handleClick(true)}}>
              <img src={iconUser} width={22} height={22}/>
            </div>)
        }
        <div className='right-item-r' onClick={()=>{handleClick(true)}}>
          {
            avatarUrl && (
              <div className='right-item-r-l'>
                <Avatar alt={username} src={avatarUrl}  sx={{width:50, height:50}}/> 
              </div>
            )
          }
          {
            username&&!avatarUrl && (
              <div className="right-item" style={{marginLeft:'0'}}>
                <img src={iconUser} width={22} height={22}/>
              </div>
            )
          }
          <div className='right-item-r-r'>{username}</div>
        </div>
      </div>
    </header>
    { isLoginFiber &&  <LoginOrRegister closeable={closeable}/>}
    <Saved/>
    </>
  )
}
export default Header