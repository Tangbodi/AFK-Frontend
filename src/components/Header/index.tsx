import './header.less'
import logo from '@/assets/images/afk_logo_light.png'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import ClearRoundedIcon from '@mui/icons-material/ClearRounded'
import iconBell from '@/assets/images/icon_bell.png'
import iconDark from '@/assets/images/icon_dark-mode.png'
import iconUser from '@/assets/images/icon_user.png'
const Header = () => {
  return (
    <header className="afk-header">
      <div className="afk-header-left">
        <span>
          <img src={logo} width="120" height="90"/>
        </span>
        <div className="menu">
          <span>Home</span>
          <span>Store</span>
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
        <div className="right-item">
          <img src={iconDark} width={24} height={24}/>
        </div>
        <div className="right-item">
          <img src={iconBell} width={24} height={24}/>
        </div>
        <div className="right-item">
          <img src={iconUser} width={22} height={22}/>
        </div>
      </div>
    </header>
  )
}
export default Header