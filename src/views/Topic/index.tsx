import './topic.less'
import { Avatar } from '@mui/material'
import Controls from '@/components/Controls'
import Stepper from '@/components/Stepper'
import { ArrowUpwardOutlined } from '@mui/icons-material'
import { useEffect, useState } from 'react'
import { showPostBodyAPI, commentsRepliesAPI } from '@/request/api'
import { useSearchParams, useParams } from 'react-router-dom'
import { message } from 'antd'
import { dateUtils, arrayToObjArray } from '@/utils/utils'
import { MsgTypes } from '@/config'

const Topic = () => {
  const { postId } = useParams()
  const [searchParams] = useSearchParams()
  const [title, setTitle] = useState()
  const [toUid, setToUid] = useState('')
  const [userName, setUserName] =  useState()
  const [createdAt, setCreatedAt] = useState('')
  const [textRender, setTextRender] = useState('')
  const [imageURL, setImageURL] = useState([])
  const [imagesList, setImagesList] = useState([])
  const [currentImage, setCurrentImage] = useState('')
  const [showBigImage, setShowBigImage] = useState(false)
  const [repliesList, setRepliesList] = useState([])
  const [likeStatus, setLikeStatus] = useState(1)
  const [saveStatus, setSaveStatus] = useState(1)

  const showPostBody = async() => {
    const params = {
      post: postId,
      game: searchParams.get('game'),
      genre: searchParams.get('genre')
    }
    const showPostBodyRes = await showPostBodyAPI(params)
    if(showPostBodyRes.code === 200) {
      const resData = showPostBodyRes.data || {}
      setTitle(resData.title)
      setToUid(resData.userId)
      setUserName(resData.userName)
      setLikeStatus(resData.likeStatus)
      setSaveStatus(resData.saveStatus)
      setCreatedAt(dateUtils(resData.createdAt))
      setTextRender(resData.textRender)
      setImageURL(resData.imageURL)
      setImagesList(arrayToObjArray(resData.imageURL))
      return
    }
    message.warning(showPostBodyRes.message)
  }

  const commentsReplies = async(page: number) => {
    const params = {
      page,
      size: 4,
      post: postId,
      game: searchParams.get('game'),
      genre: searchParams.get('genre')
    }
    const commentsRepliesRes = await commentsRepliesAPI(params)
    if(commentsRepliesRes.code === 200) {
      const repliesData = commentsRepliesRes.data || {}
      setRepliesList([...repliesData.content])
      return 
    }
    message.warning(commentsRepliesRes.message)
  }

  const queryImgClick = (index) => {
    setCurrentImage(imageURL[index])
    const newImagesList = imagesList.map((item, _index)=>{
      imagesList[_index]['active'] = index === _index
      return item
    })
    setImagesList(newImagesList)
  }

  const showImgDetail = (index: number) => {
    queryImgClick(index)
    setShowBigImage(true)
  }

  const unfoldBigImages = () => {
    setShowBigImage(false)
  }

  const getLeaveMsg = (val: boolean) => {
    val && commentsReplies(1)
  }

  useEffect(()=>{ 
    showPostBody()
    commentsReplies(1)
  },[])
  
  return (
    <div className="afk-topic">
      <div className="afk-topic-main">
      <div className="afk-topic-title">Forum - Tears of the Kingdom</div>
        <div className="afk-topic-main-title">
          <span className="main-title-tag">Q&A</span>
          <div className="main-title-text">
            { title }
          </div>
        </div>
        <div className='afk-top-main-content'>
          <div className="main-content-title">
            <div className="content-title-left">
              <Avatar alt={userName} src="/static/images/avatar/1.jpg" sx={{width:'48px', height:'48px'}}/>{userName}
            </div>
            <div className="content-title-right">
              {createdAt}
            </div>
          </div>
          <div className="main-content-detail">
            <div className="main-content-desc">
              {textRender}
            </div>
            {
              !showBigImage &&
              <div className='main-content-images'>
                {
                  imageURL && imageURL.length && 
                  imageURL.map((image, index)=>{
                    return (
                      <div className='main-content-images-item' key={index} onClick={()=>{showImgDetail(index)}}>
                        <div className='images-item-main'>
                          <div className='images-item-hoverMask hover-in'></div>
                          <div className='images-item-slot'>
                            <img src={`//${image}`}/>
                          </div>
                        </div>
                      </div>
                    )
                  })
                }
              </div>
            }
            {
              showBigImage &&
              <div className='main-content-unfold'>
                <div className='content-unfold-top' onClick={unfoldBigImages}>
                  <span className='content-unfold-top-line'><ArrowUpwardOutlined/></span>Unfold
                </div>
                <div className='content-unfold-main'>
                  <div className='unfold-main-bigImg' onClick={unfoldBigImages}>
                    <img src={`//${currentImage}`}/>
                  </div>
                  <div className='unfold-main-smallImg'>
                    { imagesList && imagesList.length && 
                      imagesList.map((image, index)=>{
                        return (
                          <div className={image.active?'smallImg-item':'smallImg-item smallImg-item-opcityHalf'} key={index} onClick={()=>{queryImgClick(index)}}>
                            <div className={image.active?'smallImg-item-main item-active':'smallImg-item-main'}>
                              <div className='item-main-hoverMask hover-in'></div>
                              <div className='item-main-slot'>
                                <img src={`//${image.url}`}/>
                              </div>
                            </div>
                          </div>
                        )
                      })
                    }
                  </div>
                </div>
              </div>
            }
            <div className="main-content-controls">
              <Controls type={MsgTypes.comment} toUid={toUid} isPost={true} likeStatus={likeStatus} saveStatus={saveStatus} getLeaveMsgFn={getLeaveMsg} />
            </div>
          </div>
            {
              repliesList && repliesList.length && 
              repliesList.map((replies, index) => {
                return (
                  <div className='afk-top-main-content-item' key={index}>
                      <div className="main-content-title">
                        <div className="content-title-left">
                          <Avatar alt={replies.comment.username} src="/static/images/avatar/1.jpg" sx={{width:'48px', height:'48px'}}/>{replies.comment.username}
                        </div>
                        <div className="content-title-right">
                          {dateUtils(replies.comment.createdAt)}
                        </div>
                      </div>
                      <div className="main-content-detail">
                        <div className="main-content-desc">
                          {replies.comment.content}
                        </div>
                        <div className="main-content-controls comment-type">
                          <Controls comment={replies.comment} type={MsgTypes.reply} toUid={toUid} isReply={false} getLeaveMsgFn={getLeaveMsg}/>
                        </div>
                        <Stepper reply={replies.reply} getLeaveMsgFn={getLeaveMsg}/>
                      </div>
                  </div>
                )
              })
            }
        </div>
      </div>
    </div>
  )
}
export default Topic