import './footer.less'
import { Facebook, Twitter, Instagram, YouTube } from '@mui/icons-material'
const Footer = () => {
  return (
    <footer className="afk-footer">
      <div className="afk-footer-copyright">
        Copyright © 2023 ARK | All Rights Reserved 
      </div>
      <div className="afk-footer-link">
        <div className="afk-footer-link-menu">
          <div className='menu-item'>Home</div>
          <div className='menu-item'>Store</div>
          <div className='menu-item'>Account</div>
          <div className='menu-item'>Contact</div>
        </div>
        <div className="afk-footer-link-share">
          <div className="share-item"><Facebook/></div>
          <div className="share-item"><Twitter/></div>
          <div className="share-item"><Instagram/></div>
          <div className="share-item"><YouTube/></div>
        </div>
      </div>
    </footer>
  )
}

export default Footer