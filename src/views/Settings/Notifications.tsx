import './notifications.less'
import { styled } from '@mui/material/styles'
import Switch from '@mui/material/Switch'
import Typography from '@mui/material/Typography'
import { getUserSettingAPI } from '@/request/api'
import { useEffect, useState } from 'react'
const AntSwitch = styled(Switch)(({ theme }) => ({
  width: 40,
  height: 20,
  padding: 0,
  display: 'flex',
  '&:active': {
    '& .MuiSwitch-thumb': {
      width: 16,
    },
    '& .MuiSwitch-switchBase.Mui-checked': {
      transform: 'translateX(9px)',
    },
  },
  '& .MuiSwitch-switchBase': {
    padding: 2,
    '&.Mui-checked': {
      transform: 'translateX(20px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#EEDFC9' : '#745B3F',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
    width: 16,
    height: 16,
    borderRadius: 6,
    transition: theme.transitions.create(['width'], {
      duration: 200,
    }),
  },
  '& .MuiSwitch-track': {
    borderRadius: 10 / 2,
    opacity: 1,
    backgroundColor:
      theme.palette.mode === 'dark' ? 'rgba(255,255,255,.35)' : 'rgba(0,0,0,.25)',
    boxSizing: 'border-box',
  },
}))
const Notifications = () => {
  const [mentionsOfUsername, setMentionsOfUsername] = useState(false)
  const [commentOnPost, setCommentOnPost] = useState(false)
  const [likeOnComment, setLikeOnComment] = useState(false)
  const [likeOnPost, setLikeOnPost] = useState(false)
  const [postOnSavedGame, setPostOnSavedGame] = useState(false)
  const [replyOnComment, setReplyOnComment] = useState(false)
  const [saveOnPost, setSaveOnPost] = useState(false)
  const getUserSetting = async () => {
    const getUserSettingRes = await getUserSettingAPI()
    const getUserSettingResData = getUserSettingRes.data || {}
    if(getUserSettingRes.code === 200) {
      setLikeOnPost(!!getUserSettingResData.likeOnPost)
      setCommentOnPost(!!getUserSettingResData.commentOnPost)
      setLikeOnComment(!!getUserSettingResData.likeOnComment)
      setPostOnSavedGame(!!getUserSettingResData.postOnSavedGame)
      setReplyOnComment(!!getUserSettingResData.replyOnComment)
      setSaveOnPost(!!getUserSettingResData.saveOnPost)
      setMentionsOfUsername(!!getUserSettingResData.mentionsOfUsername)
    }
  }

  const switchChange = (type, val) => {
    switch(type){
      case 'commentOnPost':
        setCommentOnPost(val)
        break;
      case 'likeOnComment':
        setLikeOnComment(val)
        break;
      case 'likeOnPost':
        setLikeOnPost(val)
        break;
      case 'postOnSavedGame':
        setPostOnSavedGame(val)
        break;
      case 'replyOnComment':
        setReplyOnComment(val)
        break;
      case 'saveOnPost':
        setSaveOnPost(val)
        break;
    }
    
  }

  useEffect(()=>{
    getUserSetting()
  },[])
  return (
    <div className="afk-settings-notification">
      <div className="settings-notification-title">ACTIVITY</div>
      <div className='settings-notification-wrap'>
        <div className="settings-notification-item">
            <Typography>Mentions of username</Typography>
            <AntSwitch checked={mentionsOfUsername} onChange={()=>{switchChange('mentionsOfUsername', !mentionsOfUsername)}} />
        </div>
        <div className="settings-notification-item">
            <Typography>Saved your posts</Typography>
            <AntSwitch checked={saveOnPost} onChange={()=>{switchChange('saveOnPost', !saveOnPost)}}  />
        </div>
        <div className="settings-notification-item">
            <Typography>Likes on your posts</Typography>
            <AntSwitch checked={likeOnPost} onChange={()=>{switchChange('likeOnPost', !likeOnPost)}} />
        </div>
        <div className="settings-notification-item">
            <Typography>Replies on your posts</Typography>
            <AntSwitch checked={commentOnPost} onChange={()=>{switchChange('commentOnPost', !commentOnPost)}} />
        </div>
        <div className="settings-notification-item">
            <Typography>Likes on your comments</Typography>
            <AntSwitch checked={likeOnComment} onChange={()=>{switchChange('likeOnComment', !likeOnComment)}}/>
        </div>
        <div className="settings-notification-item">
            <Typography>Replies on your comments</Typography>
            <AntSwitch checked={replyOnComment} onChange={()=>{switchChange('replyOnComment', !replyOnComment)}} />
        </div>
        <div className="settings-notification-item">
            <Typography>New posts on your saved games</Typography>
            <AntSwitch checked={postOnSavedGame} onChange={()=>{switchChange('postOnSavedGame', !postOnSavedGame)}}/>
        </div>
      </div>
      <div className="settings-notification-title">RECOMMENDATIONS</div>
      <div className='settings-notification-wrap'>
        <div className="settings-notification-item">
            <Typography>Trending posts</Typography>
            <AntSwitch defaultChecked/>
        </div>
        <div className="settings-notification-item">
            <Typography>Community recommendations</Typography>
            <AntSwitch defaultChecked/>
        </div>
        <div className="settings-notification-item">
            <Typography>Featured content</Typography>
            <AntSwitch defaultChecked/>
        </div>
        <div className="settings-notification-item">
            <Typography>AFK announcements</Typography>
            <AntSwitch defaultChecked/>
        </div>
      </div>
    </div>
  )
}
export default Notifications