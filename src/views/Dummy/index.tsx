import './dummy.less'
import DummyLogo from '@/assets/images/dummy-logo.png'
import DummyImg from '@/assets/images/afk-img-t.png'
import DummyImgItem from '@/assets/images/dummy-img.png'
import Button from '@mui/material/Button'
import CheckRoundedIcon from '@mui/icons-material/CheckRounded'
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
const Dummy = () => {
  return (
    <div className="dummy-wrap">
      <header className='dummy-header'>
        <img src={DummyLogo} width={271} height={69}/>
        <div className='dummy-header-r'>
          <Button className="dummy-header-btn call-us-btn">Call Us 347-61806366</Button>
          <Button className="dummy-header-btn">Get a Free Quote</Button>
        </div>
      </header>
      <div className='dummy-banner'></div>
      <div className='dummy-imgs'>
        <div className='dummy-imgs-top'>
          <img src={DummyImg} width={280} height={50}/>
        </div>
        <div className='dummy-imgs-li'>
          <div className='dummy-imgs-li-item'>
            <img src={DummyImgItem} width={225} height={150}/>
          </div>
          <div className='dummy-imgs-li-item'>
            <img src={DummyImgItem} width={225} height={150}/>
          </div>
          <div className='dummy-imgs-li-item'>
            <img src={DummyImgItem} width={225} height={150}/>
          </div>
          <div className='dummy-imgs-li-item'>
            <img src={DummyImgItem} width={225} height={150}/>
          </div>
        </div>
        <div className='dummy-imgs-li'>
          <div className='dummy-imgs-li-item'>
            <img src={DummyImgItem} width={225} height={150}/>
          </div>
          <div className='dummy-imgs-li-item'>
            <img src={DummyImgItem} width={225} height={150}/>
          </div>
          <div className='dummy-imgs-li-item'>
            <img src={DummyImgItem} width={225} height={150}/>
          </div>
        </div>
      </div>
      <div className='dummy-btm'>
        <div className='dummy-btm-title'>
          We start by listening and let that shape our<br/>
          design process, with our clients as partners
        </div>
        <div className='dummy-btm-desc'>
          WE CUSTOM BUILD WEBSITES<br/>
          TO MAKE YOUR BRAND STAND OUT FROM THE NOISE
        </div>
        <div className='dummy-btm-buy'>
          <div className='dummy-btm-buy-item buy-item-left'>
            <div className='buy-item-title'>BASIC WEBSITE</div>
            <div className='buy-item-desc'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmo</div>
            <div className='buy-item-price'><span>$</span>199</div>
            <div className='buy-item-cart'>Add to cart</div>
            <div className='buy-item-features'>
              <div className='buy-item-features-top'>Top Features</div>
              <div className='buy-item-features-li'>
                <div className='buy-item-features-li-l'><CheckRoundedIcon style={{color: 'green'}}/></div>
                <div className='buy-item-features-li-c'>Lorem ipsum dolor sit amet</div>
                <div className='buy-item-features-li-r'><ErrorOutlineOutlinedIcon/></div>
              </div>
              <div className='buy-item-features-li'>
                <div className='buy-item-features-li-l'><CheckRoundedIcon style={{color: 'green'}}/></div>
                <div className='buy-item-features-li-c'>Lorem ipsum dolor sit amet</div>
                <div className='buy-item-features-li-r'><ErrorOutlineOutlinedIcon/></div>
              </div>
              <div className='buy-item-features-li'>
                <div className='buy-item-features-li-l'><CheckRoundedIcon style={{color: 'green'}}/></div>
                <div className='buy-item-features-li-c'>Lorem ipsum dolor sit amet</div>
                <div className='buy-item-features-li-r'><ErrorOutlineOutlinedIcon/></div>
              </div>
            </div>
          </div>
          <div className='dummy-btm-buy-item buy-item-center'>
            <div className='buy-item-title'>BASIC WEBSITE</div>
            <div className='buy-item-desc'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmo</div>
            <div className='buy-item-price'><span>$</span>199</div>
            <div className='buy-item-cart'>Add to cart</div>
            <div className='buy-item-features'>
              <div className='buy-item-features-top'>Top Features</div>
              <div className='buy-item-features-li'>
                <div className='buy-item-features-li-l'><CheckRoundedIcon style={{color: 'green'}}/></div>
                <div className='buy-item-features-li-c'>Lorem ipsum dolor sit amet</div>
                <div className='buy-item-features-li-r'><ErrorOutlineOutlinedIcon/></div>
              </div>
              <div className='buy-item-features-li'>
                <div className='buy-item-features-li-l'><CheckRoundedIcon style={{color: 'green'}}/></div>
                <div className='buy-item-features-li-c'>Lorem ipsum dolor sit amet</div>
                <div className='buy-item-features-li-r'><ErrorOutlineOutlinedIcon/></div>
              </div>
              <div className='buy-item-features-li'>
                <div className='buy-item-features-li-l'><CheckRoundedIcon style={{color: 'green'}}/></div>
                <div className='buy-item-features-li-c'>Lorem ipsum dolor sit amet</div>
                <div className='buy-item-features-li-r'><ErrorOutlineOutlinedIcon/></div>
              </div>
            </div>
          </div>
          <div className='dummy-btm-buy-item buy-item-right'>
            <div className='buy-item-title'>BASIC WEBSITE</div>
            <div className='buy-item-desc'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmo</div>
            <div className='buy-item-price'><span>$</span>199</div>
            <div className='buy-item-cart'>Add to cart</div>
            <div className='buy-item-features'>
              <div className='buy-item-features-top'>Top Features</div>
              <div className='buy-item-features-li'>
                <div className='buy-item-features-li-l'><CheckRoundedIcon style={{color: 'green'}}/></div>
                <div className='buy-item-features-li-c'>Lorem ipsum dolor sit amet</div>
                <div className='buy-item-features-li-r'><ErrorOutlineOutlinedIcon/></div>
              </div>
              <div className='buy-item-features-li'>
                <div className='buy-item-features-li-l'><CheckRoundedIcon style={{color: 'green'}}/></div>
                <div className='buy-item-features-li-c'>Lorem ipsum dolor sit amet</div>
                <div className='buy-item-features-li-r'><ErrorOutlineOutlinedIcon/></div>
              </div>
              <div className='buy-item-features-li'>
                <div className='buy-item-features-li-l'><CheckRoundedIcon style={{color: 'green'}}/></div>
                <div className='buy-item-features-li-c'>Lorem ipsum dolor sit amet</div>
                <div className='buy-item-features-li-r'><ErrorOutlineOutlinedIcon/></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='dummy-form'></div>
      <div className='dummy-footer'></div>
    </div>
  )
}
export default Dummy