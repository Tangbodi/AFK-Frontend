import { useEffect, useState } from 'react'
import './notifications.less'
import { unreadMessageAPI, markAllAPI } from '@/request/api'
import { notificationsTypesEnum } from '@/config'
import { notificationsDateUtils } from '@/utils/utils'
import { message } from 'antd'
import { useNavigate } from 'react-router-dom'
import Avatar from '@mui/material/Avatar'
const Notifications = () => {
  const navigateTo = useNavigate()
  const [unreadMessages, setUnreadMessages] = useState([])
  const unreadMessageMethod = async() => {
    const unreadMessagesRes = await unreadMessageAPI()
    if(unreadMessagesRes.code === 200) {
      setUnreadMessages(unreadMessagesRes.data||[])
      return
    }
    message.warning(unreadMessagesRes.message)
  }

  const readReply = async() => {
    const readReplyRes = await markAllAPI()
    if(readReplyRes.code === 200) {
      message.success(readReplyRes.data)
      return
    }
    message.warning(readReplyRes.message)
  }
  
  useEffect(() => {
    unreadMessageMethod()
  }, [])

  return (
    <div className='afk-popup'>
      <div className='afk-popup-title'>
        <div className='afk-popup-title-left'>Notifications</div>
        { unreadMessages.length > 0 && <div className='afk-popup-title-right' onClick={readReply}>Mark all as read</div> }
      </div>
      <div className='afk-popup-ul'>
        {
          unreadMessages && 
          unreadMessages.map((msg, index) => {
            return (
              <div className='afk-popup-li' key={index} onClick={()=>{navigateTo(`/topic/${msg.postId}?genre=${msg.genreId}&game=${msg.gameId}`)}}>
                <div className='afk-popup-li-icon'>
                  <Avatar alt={msg.fromUsername} src={msg.fromAvatarUrl}  sx={{width:'40px', height:'40px'}}/>
                </div>
                <div className='afk-popup-li-right'>
                  <div className='afk-popup-li-right-content'>
                    <span>{msg.fromUsername}</span> {notificationsTypesEnum[msg.typeId]}: <span>"{msg.content}"</span>
                  </div>
                  <div className='afk-popup-li-right-time'>{ notificationsDateUtils(msg.createdAt)}</div>
                </div>
              </div>
            )
          })
        }
        {
          !unreadMessages.length && 
          <div className='afk-popup-no-content'>No Content</div>
        }
      </div>
    </div>
  )
}
export default Notifications