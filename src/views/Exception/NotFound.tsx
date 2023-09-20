import './notfound.less'
import RocketLaunchOutlinedIcon from '@mui/icons-material/RocketLaunchOutlined';
import { useNavigate } from 'react-router-dom'
const NotFound = () => {
  const navigateTo = useNavigate()
  return (
    <div className="afk-notfund">
      <div className="afk-notfund-main">
        <div className='afk-notfund-main-icon'><RocketLaunchOutlinedIcon sx={{ fontSize: 50 }}/></div>
        <div className='afk-notfund-main-num'>404</div>
        <div className='afk-notfund-main-desc'>🎮 Oh no, you've stumbled into the realm of the Lost Pixels! 🎮</div>
        <div className='afk-notfund-main-home' onClick={()=>{navigateTo('/')}}>Home Page</div>
      </div>
    </div>
  )
}

export default NotFound