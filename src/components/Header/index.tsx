import './header.less'
import logo from '@/assets/images/afk_logo_light.png'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import ClearRoundedIcon from '@mui/icons-material/ClearRounded'
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
          1
        </div>
        <div className="right-item">
            2
        </div>
        <div className="right-item">
          3
        </div>
      </div>
    </header>
  )
}
export default Header