import './topic.less'
// import InfiniteScroll from 'react-infinite-scroll-component'
import { Avatar } from '@mui/material'
import Controls from '@/components/Controls'
import Stepper from '@/components/Stepper'
import { ArrowUpwardOutlined } from '@mui/icons-material'
import { useEffect, useState } from 'react'
import { showPostBodyAPI, commentsRepliesAPI } from '@/request/api'
import { useSearchParams, useParams, useLocation } from 'react-router-dom'
import { message } from 'antd'
import { dateUtils, arrayToObjArray } from '@/utils/utils'
import { MsgTypes } from '@/config'


const Topic = () => {
  const { postId } = useParams()
  const [searchParams] = useSearchParams()
  const [title, setTitle] = useState()
  const [toUid, setToUid] = useState('')
  const [userName, setUserName] =  useState()
  const [gameName, setGameName] = useState()
  const [createdAt, setCreatedAt] = useState('')
  const [textRender, setTextRender] = useState('')
  const [imageURL, setImageURL] = useState([])
  const [imagesList, setImagesList] = useState([])
  const [currentImage, setCurrentImage] = useState('')
  const [showBigImage, setShowBigImage] = useState(false)
  const [repliesList, setRepliesList] = useState([])
  const [likeStatus, setLikeStatus] = useState(1)
  const [saveStatus, setSaveStatus] = useState(1)
  const [_totalPages, setTotalPages] = useState(1)
  let [page, setPage] = useState(1)
  const location = useLocation()
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
      setGameName(resData.gameName)
      setUserName(resData.userName)
      setLikeStatus(resData.likeStatus)
      setSaveStatus(resData.saveStatus)
      setCreatedAt(dateUtils(resData.createdAt, ' '))
      setTextRender(resData.textRender)
      setImageURL(resData.imageURL)
      setImagesList(arrayToObjArray(resData.imageURL))
      return
    }
    message.warning(showPostBodyRes.message)
  }

  const commentsReplies = async(hasPage?: number) => {
    const params: any = {
      size: 4,
      post: postId,
      game: searchParams.get('game'),
      genre: searchParams.get('genre')
    }
    params.page = hasPage ? hasPage : page
    const commentsRepliesRes = await commentsRepliesAPI(params)
    if(commentsRepliesRes.code === 200) {
      const repliesData = commentsRepliesRes.data || {}
      setRepliesList(repliesList.concat(repliesData.content))
      setTotalPages(repliesData.totalPages)
      page = page + 1
      setPage(page)
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

  const getLeaveMsg = (value: any) => {
    if(typeof(value) === 'boolean') {
      setRepliesList([])
      console.log('repliesList', repliesList)
      commentsReplies(1)
    } else {
      const { pIndex, cIndex } = value
      const childCommentObj: any = repliesList[pIndex]
      if(!childCommentObj.reply) {
        childCommentObj.reply = []
        childCommentObj.reply.push(value)
      } else{
        childCommentObj.reply.splice(cIndex, 0 , value)
      }
      setRepliesList([...repliesList])
    }
  }

  useEffect(()=>{ 
    showPostBody()
    commentsReplies(1)
  },[location])
  return (
    // <InfiniteScroll
    //   dataLength={repliesList.length}
    //   next={commentsReplies}
    //   hasMore={totalPages>=page}
    //   loader={false}
    //   endMessage={<Divider plain>It is all, nothing more</Divider>}
    //   scrollableTarget="scrollableDiv"
    // >
    // <div className="afk-topic" id="scrollableDiv" style={{
    //   height: 400,
    //   overflow: 'auto'
    // }}>
      
    <div className="afk-topic" id="scrollableDiv">
      <div className="afk-topic-main">
      <div className="afk-topic-title">Forum - {gameName}</div>
        <div className="afk-topic-main-title">
          <span className="main-title-tag">Q&A</span>
          <div className="main-title-text">
            { title }
          </div>
        </div>
        <div className='afk-top-main-content'>
          <div className="main-content-title">
            <div className="content-title-left">
              <Avatar alt={userName} sx={{width:'48px', height:'48px'}}/>{userName}
            </div>
            <div className="content-title-right">
              {createdAt}
            </div>
          </div>
          <div className="main-content-detail">
            <div className="main-content-desc" dangerouslySetInnerHTML={{__html: textRender}}/>
            {
              !showBigImage &&
              (
                <div className='main-content-images'>
                  {
                    imageURL.length > 0 && 
                    imageURL.map((image, index)=>{
                      return (
                        <div className='main-content-images-item' key={index} onClick={()=>{showImgDetail(index)}}>
                          <div className='images-item-main'>
                            <div className='images-item-hoverMask hover-in'></div>
                            <div className='images-item-slot'>
                              <img src={image}/>
                            </div>
                          </div>
                        </div>
                      )
                    })
                  }
                </div>
              )
            }
            { showBigImage &&
              (
                <div className='main-content-unfold'>
                  <div className='content-unfold-top' onClick={unfoldBigImages}>
                    <span className='content-unfold-top-line'><ArrowUpwardOutlined/></span>Unfold
                  </div>
                  <div className='content-unfold-main'>
                    <div className='unfold-main-bigImg' onClick={unfoldBigImages}>
                      <img src={currentImage}/>
                    </div>
                    <div className='unfold-main-smallImg'>
                      { imagesList && imagesList.length > 0 && 
                        imagesList.map((image, index)=>{
                          return (
                            <div className={image.active?'smallImg-item':'smallImg-item smallImg-item-opcityHalf'} key={index} onClick={()=>{queryImgClick(index)}}>
                              <div className={image.active?'smallImg-item-main item-active':'smallImg-item-main'}>
                                <div className='item-main-hoverMask hover-in'></div>
                                <div className='item-main-slot'>
                                  <img src={image.url}/>
                                </div>
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
            <div className="main-content-controls">
              <Controls type={MsgTypes.comment} toUid={toUid} isPost={true} likeStatus={Number(likeStatus)} saveStatus={Number(saveStatus)} getLeaveMsgFn={getLeaveMsg} />
            </div>
          </div>
            { repliesList.length>0 && 
              repliesList.map((replies, index) => {
                if(replies) {
                  return (
                    <div className='afk-top-main-content-item' key={index}>
                        <div className="main-content-title">
                          <div className="content-title-left">
                            <Avatar alt={replies.comment.username} sx={{width:'48px', height:'48px'}}/>{replies.comment.username}
                          </div>
                          <div className="content-title-right">
                            {dateUtils(replies.comment.createdAt, ' ')}
                          </div>
                        </div>
                        <div className="main-content-detail">
                          <div className="main-content-desc">
                            {replies.comment.content}
                          </div>
                          <div className="main-content-controls comment-type">
                            <Controls pIndex={index} cIndex={0} comment={replies.comment} toUsername={replies.comment.username} type={MsgTypes.reply} toUid={toUid} isReply={false} getLeaveMsgFn={getLeaveMsg}/>
                          </div>
                          <Stepper pIndex={index} reply={replies.reply} getLeaveMsgFn={getLeaveMsg}/>
                        </div>
                    </div>
                  )
                }
            })}
        </div>
      </div>
    </div>

    // </div>
    // </InfiniteScroll>
  )
}
export default Topic