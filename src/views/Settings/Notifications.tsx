import './notifications.less'
import { styled } from '@mui/material/styles'
import Switch from '@mui/material/Switch'
import Typography from '@mui/material/Typography'
import { getUserSettingAPI, updateUserSettingAPI } from '@/request/api'
import { useEffect, useState } from 'react'
import { NotificationsTypes } from '@/config'
import { message } from 'antd'
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
  const [mentionOfUsername, setMentionOfUsername] = useState(false)
  const [commentOnPost, setCommentOnPost] = useState(false)
  const [likeOnComment, setLikeOnComment] = useState(false)
  const [likeOnPost, setLikeOnPost] = useState(false)
  const [postOnSavedGame, setPostOnSavedGame] = useState(false)
  const [replyOnComment, setReplyOnComment] = useState(false)
  const [saveOnPost, setSaveOnPost] = useState(false)
  const [afkAnnouncement, setAfkAnnouncement] = useState(false)
  const [communityRecommendation, setCommunityRecommendation] = useState(false)
  const [featuredContent, setFeaturedContent] = useState(false)
  const [trendingPost, setTrendingPost] = useState(false)
  const getUserSetting = async () => {
    const getUserSettingRes = await getUserSettingAPI()
    const getUserSettingResData = getUserSettingRes.data || {}
    const activity = getUserSettingResData.activity || {}
    const recommendation = getUserSettingResData.recommendation || {}
    if(getUserSettingRes.code === 200) {
      setLikeOnPost(!!activity.likeOnPost)
      setCommentOnPost(!!activity.commentOnPost)
      setLikeOnComment(!!activity.likeOnComment)
      setPostOnSavedGame(!!activity.postOnSavedGame)
      setReplyOnComment(!!activity.replyOnComment)
      setSaveOnPost(!!activity.saveOnPost)
      setMentionOfUsername(!!activity.mentionOfUsername)
      setAfkAnnouncement(!!recommendation.afkAnnouncement)
      setCommunityRecommendation(!!recommendation.communityRecommendation)
      setFeaturedContent(!!recommendation.featuredContent)
      setTrendingPost(!!recommendation.trendingPost)
    }
  }

  const switchChange = (type: string, val: boolean) => {
    switch(type){
      case NotificationsTypes.commentOnPost:
        setCommentOnPost(val)
        break;
      case NotificationsTypes.likeOnComment:
        setLikeOnComment(val)
        break;
      case NotificationsTypes.likeOnPost:
        setLikeOnPost(val)
        break;
      case NotificationsTypes.postOnSavedGame:
        setPostOnSavedGame(val)
        break;
      case NotificationsTypes.replyOnComment:
        setReplyOnComment(val)
        break;
      case NotificationsTypes.saveOnPost:
        setSaveOnPost(val)
        break;
      case NotificationsTypes.mentionOfUsername:
        setMentionOfUsername(val)
        break;
      case NotificationsTypes.afkAnnouncement:
        setAfkAnnouncement(val)
        break;
      case NotificationsTypes.communityRecommendation:
        setCommunityRecommendation(val)
        break;
      case NotificationsTypes.featuredContent:
        setFeaturedContent(val)
        break;
      case NotificationsTypes.trendingPost:
        setTrendingPost(val)
        break;
    }
    updateUserSetting(type, val)
  }

  const updateUserSetting = async(type: string, val: boolean) => {
    const updateUserSettingRes = await updateUserSettingAPI({type, status: val ? 1: 0})
    if(updateUserSettingRes.code === 200) {
      message.success("update success")
      return
    }
    message.warning(updateUserSettingRes.message)
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
            <AntSwitch checked={mentionOfUsername} onChange={()=>{switchChange(NotificationsTypes.mentionOfUsername, !mentionOfUsername)}} />
        </div>
        <div className="settings-notification-item">
            <Typography>Saved your posts</Typography>
            <AntSwitch checked={saveOnPost} onChange={()=>{switchChange(NotificationsTypes.saveOnPost, !saveOnPost)}}  />
        </div>
        <div className="settings-notification-item">
            <Typography>Likes on your posts</Typography>
            <AntSwitch checked={likeOnPost} onChange={()=>{switchChange(NotificationsTypes.likeOnPost, !likeOnPost)}} />
        </div>
        <div className="settings-notification-item">
            <Typography>Replies on your posts</Typography>
            <AntSwitch checked={commentOnPost} onChange={()=>{switchChange(NotificationsTypes.commentOnPost, !commentOnPost)}} />
        </div>
        <div className="settings-notification-item">
            <Typography>Likes on your comments</Typography>
            <AntSwitch checked={likeOnComment} onChange={()=>{switchChange(NotificationsTypes.likeOnComment, !likeOnComment)}}/>
        </div>
        <div className="settings-notification-item">
            <Typography>Replies on your comments</Typography>
            <AntSwitch checked={replyOnComment} onChange={()=>{switchChange(NotificationsTypes.replyOnComment, !replyOnComment)}} />
        </div>
        <div className="settings-notification-item">
            <Typography>New posts on your saved games</Typography>
            <AntSwitch checked={postOnSavedGame} onChange={()=>{switchChange(NotificationsTypes.postOnSavedGame, !postOnSavedGame)}}/>
        </div>
      </div>
      <div className="settings-notification-title">RECOMMENDATIONS</div>
      <div className='settings-notification-wrap'>
        <div className="settings-notification-item">
            <Typography>Trending posts</Typography>
            <AntSwitch checked={trendingPost} onChange={()=>{switchChange(NotificationsTypes.trendingPost, !trendingPost)}}/>
        </div>
        <div className="settings-notification-item">
            <Typography>Community recommendations</Typography>
            <AntSwitch checked={communityRecommendation} onChange={()=>{switchChange(NotificationsTypes.communityRecommendation, !communityRecommendation)}}/>
        </div>
        <div className="settings-notification-item">
            <Typography>Featured content</Typography>
            <AntSwitch checked={featuredContent} onChange={()=>{switchChange(NotificationsTypes.featuredContent, !featuredContent)}}/>
        </div>
        <div className="settings-notification-item">
            <Typography>AFK announcements</Typography>
            <AntSwitch checked={afkAnnouncement} onChange={()=>{switchChange(NotificationsTypes.afkAnnouncement, !afkAnnouncement)}}/>
        </div>
      </div>
    </div>
  )
}
export default Notifications