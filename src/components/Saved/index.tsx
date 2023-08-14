import './saved.less'
import { Grade, GradeOutlined } from '@mui/icons-material'
import { useRef, useState } from 'react'
const Saved = () => {
  const saveListRef = useRef(null)
  const [dHeight, setDHeight] = useState(106)
  const [visible, setVisible] = useState(false)
  const [isShow, setIsShow] = useState('none')
  const mouseOver = () => {
    setIsShow('block')
    setVisible(true)
    setDHeight(saveListRef.current.offsetHeight)
  }
  const mouseLeave = () => {
    setIsShow('none')
    setVisible(false)
    setDHeight(106)
  }  
  return (
    <div className="afk-saved" onMouseOver={mouseOver} onMouseLeave={mouseLeave}> 
      <div className={visible?'afk-saved-menu hover-menu': 'afk-saved-menu'} style={{height:dHeight+'px'}}>
        <div className='afk-saved-icon'>
          
          {
            visible ? <Grade/> : <GradeOutlined/>
          }
        </div>
        <div className='afk-saved-title'>Saved<br/>Forums</div>
      </div>
      <div className="afk-saved-list" ref={saveListRef} style={{display:isShow}}>
        <div className='afk-saved-list-item'>
          <div className='afk-saved-list-item-left'>
            <img src='http://31.220.21.110:81/ICON/105.png' width={40} height={40}/>
          </div>
          <div className='afk-saved-list-item-right'>Daiblo IV</div>
        </div>
        <div className='afk-saved-list-item'>
          <div className='afk-saved-list-item-left'>
            <img src='http://31.220.21.110:81/ICON/105.png' width={40} height={40}/>
          </div>
          <div className='afk-saved-list-item-right'>The Legend of Zelda</div>
        </div>
        <div className='afk-saved-list-item'>
          <div className='afk-saved-list-item-left'>
            <img src='http://31.220.21.110:81/ICON/105.png' width={40} height={40}/>
          </div>
          <div className='afk-saved-list-item-right'>Cyberpunk 2077 Cyberpunk 207</div>
        </div>
        <div className='afk-saved-list-item'>
          <div className='afk-saved-list-item-left'>
            <img src='http://31.220.21.110:81/ICON/105.png' width={40} height={40}/>
          </div>
          <div className='afk-saved-list-item-right'>Pokémon</div>
        </div>
        <div className='afk-saved-list-more'>
          &gt;&gt;  More Saved Forums
        </div>
      </div>
      
    </div>
  )
}

export default Saved