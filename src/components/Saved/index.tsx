import './saved.less'
import { Grade, GradeOutlined } from '@mui/icons-material'
import { useRef, useState, useEffect, useMemo } from 'react'
import { getForumsAPI } from '@/request/api'
import { message } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
const Saved = () => {
  const saveListRef = useRef(null)
  const dispatch = useDispatch()
  const [dHeight, setDHeight] = useState(106)
  const [visible, setVisible] = useState(false)
  const [isShow, setIsShow] = useState('none')
  const [forums, setForums] = useState([])
  const [showList, setShowList] = useState([])
  const [showMore, setShowMore] = useState(false)
  const [isLogin, setIsLogin] = useState(false)
  const { isSavedForumFiber, afkToken } = useSelector((state: RootState) => ({
    afkToken: state.gobalStatus.afkToken,
    isSavedForumFiber: state.gobalStatus.isSavedForumFiber
  }))

  useEffect(()=>{
    getForums()
  }, [isSavedForumFiber])

  useMemo(()=>{
    afkToken ? setIsLogin(true) : setIsLogin(false)
  }, [afkToken])
  
  const mouseOver = () => {
    showList.length && setIsShow('block')
    setVisible(true)
    setDHeight(saveListRef.current.offsetHeight)
  }
  const mouseLeave = () => {
    setIsShow('none')
    setVisible(false)
    setDHeight(106)
  } 
    
  
  const getForums = async() => {
    const getForumsRes = await getForumsAPI()
    if(getForumsRes.code === 200) {
      if(getForumsRes.data && getForumsRes.data.length > 6) {
        setShowMore(true)
        setShowList(getForumsRes.data.slice(0,6))
      } else {
        setShowList(getForumsRes.data)
      }
      dispatch({type:"savedForums", val: getForumsRes.data})
      setForums(getForumsRes.data||[])
      return
    }
    message.warning(getForumsRes.message)
  }
  const showMoreHandle = () => {
    setShowList(forums)
    setShowMore(false)
  }

  return (
    <>
    {
      isLogin && <div className="afk-saved" onMouseOver={mouseOver} onMouseLeave={mouseLeave}> 
        <div className={visible?'afk-saved-menu hover-menu': 'afk-saved-menu'} style={{height:dHeight+'px'}}>
          <div className='afk-saved-icon'>
            {
              visible ? <Grade/> : <GradeOutlined/>
            }
          </div>
          <div className='afk-saved-title'>Saved<br/>Forums</div>
        </div>
        <div className="afk-saved-list" ref={saveListRef} style={{display:isShow}}>
          { showList.map((forum, index)=>{
              return (
                <div className='afk-saved-list-item' key={index}>
                  <div className='afk-saved-list-item-left'>
                    <img src={forum.iconUrl} width={40} height={40}/>
                  </div>
                  <div className='afk-saved-list-item-right'>{forum.gameName}</div>
                </div>
              )
            })
          }
          { showMore &&
            <div className='afk-saved-list-more' onClick={showMoreHandle}>
              &gt;&gt;  More Saved Forums
            </div>
          }
        </div>
      </div>
    }
    </>
    
  )
}

export default Saved