import './topic.less'
import { Avatar } from '@mui/material'
import Controls from '@/components/Controls'
import Stepper from '@/components/Stepper'
import Pagination from '@mui/material/Pagination';
import { ArrowUpwardOutlined, ArrowForwardIosRounded, ArrowBackIosNewRounded, ForumOutlined } from '@mui/icons-material'
import { useEffect, useState } from 'react'
import { showPostBodyAPI, commentsRepliesAPI } from '@/request/api'
import { useSearchParams, useParams, useLocation, useNavigate } from 'react-router-dom'
import { message } from 'antd'
import { dateUtils, arrayToObjArray } from '@/utils/utils'
import { MsgTypes, LoveTypes } from '@/config'


const Topic = () => {
  const navigateTo = useNavigate()
  const { postId } = useParams()
  const [searchParams] = useSearchParams()
  const [title, setTitle] = useState()
  const [toUid, setToUid] = useState('')
  const [avatarURL, setAvatarURL] = useState('')
  const [userName, setUserName] =  useState()
  const [gameName, setGameName] = useState()
  const [createdAt, setCreatedAt] = useState('')
  const [textRender, setTextRender] = useState('')
  const [imageURL, setImageURL] = useState([])
  const [imagesList, setImagesList] = useState([])
  const [currentImage, setCurrentImage] = useState('')
  const [currenShowIndex, setCurrentShowIndex] = useState(0)
  const [showBigImage, setShowBigImage] = useState(false)
  const [repliesList, setRepliesList] = useState([])
  const [likeStatus, setLikeStatus] = useState(1)
  const [saveStatus, setSaveStatus] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [forumNums, setForumNums] = useState({save:0,like:0,commentReply:0})
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
      setForumNums({save: resData.save, like: resData.like, commentReply: resData.commentReply})
      setTitle(resData.title)
      setToUid(resData.userId)
      setGameName(resData.gameName)
      setUserName(resData.userName)
      setAvatarURL(resData.avatarURL)
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

  const commentsReplies = async(page?: number) => {
    const params: any = {
      size: 20,
      post: postId,
      game: searchParams.get('game'),
      genre: searchParams.get('genre')
    }
    params.page = page
    const commentsRepliesRes = await commentsRepliesAPI(params)
    if(commentsRepliesRes.code === 200) {
      const repliesData = commentsRepliesRes.data || {}
      setRepliesList(repliesData.content||[])
      setTotalPages(repliesData.totalPages)
      return 
    }
    message.warning(commentsRepliesRes.message)
  }

  const prevOrNextImage = (type: number) => {
    const currentImageIndex = imagesList.findIndex(image => currentImage === image.url)
    const index = type === 1 ? currentImageIndex - 1 : currentImageIndex + 1
    setCurrentShowIndex(index)
    if(index < 0) return
    if(index > imagesList.length-1) return
    setCurrentImage(imagesList[index].url)
    const newImagesList = imagesList.map((item, _index)=>{
      imagesList[_index]['active'] = index === _index
      return item
    })
    setImagesList(newImagesList)
  }

  const queryImgClick = (index) => {
    setCurrentShowIndex(index)
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

  const onChange = (_e, page) => {
    commentsReplies(page)
  }

  const getLeaveMsg = (value: any) => {
    if(typeof(value) === 'boolean') {
      setRepliesList([])
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
  const saveFn = ({status, loveType}) => {
    let like = 0
    let save = 0
    if(loveType === LoveTypes.like) {
      like = status ? Number(forumNums.like) + 1 : Number(forumNums.like) - 1
      setForumNums({save: forumNums.save, like, commentReply: forumNums.commentReply})
    } else {
      save = status ? forumNums.save + 1: forumNums.save - 1
      setForumNums({save, like: forumNums.like, commentReply: forumNums.commentReply})
    }
  }
  const notPostFn = (val, index)=> {
    repliesList[index].comment.likeNum  = val ? Number(repliesList[index].comment.likeNum) + 1 : Number(repliesList[index].comment.likeNum) -1
    setRepliesList([...repliesList])
  }
  const postFn = ({ status, cIndex }, pIndex: number) => {
    // status => +1/-1 状态， cIndex=> replies子数组索引， pIndex=> 父数组索引
    let repliesItem = repliesList[pIndex].reply[cIndex]
    repliesItem.likeNum = status ? Number(repliesItem.likeNum) + 1 : Number(repliesItem.likeNum) - 1 
    setRepliesList([...repliesList])
  }
  useEffect(()=>{ 
    showPostBody()
    commentsReplies(1)
  },[location])
  return (
    <div className="afk-topic" id="scrollableDiv">
      <div className="afk-topic-main">
      <div className="afk-topic-title" onClick={()=>{navigateTo(`/forum/${searchParams.get('game')}?genreId=${searchParams.get('genre')}`)}}>
        <span>Forum</span> - {gameName}
      </div>
        <div className="afk-topic-main-title">
          {/* <span className="main-title-tag">Q&A</span> */}
          <div className="main-title-text">
            { title }
          </div>
        </div>
        <div className='afk-top-main-content'>
          <div className="main-content-title">
            <div className="content-title-left">
              <Avatar src={avatarURL} alt={userName} sx={{width:48, height:48}}/>{userName}
            </div>
            <div className="content-title-right">
              {createdAt}
            </div>
          </div>
          <div className="main-content-detail">
            <div className="main-content-desc" dangerouslySetInnerHTML={{__html: textRender}}/>
            {!showBigImage &&
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
            { showBigImage &&<div className='main-content-unfold'>
                  <div className='content-unfold-top' onClick={unfoldBigImages}>
                    <span className='content-unfold-top-line'><ArrowUpwardOutlined/></span>Unfold
                  </div>
                  <div className='content-unfold-main'>
                    <div className='unfold-main-bigImg'>
                      <div className='unfold-main-bigImg-img' onClick={unfoldBigImages}><img src={currentImage}/></div>
                      { currenShowIndex > 0 && <div className="unfold-main-bigImg-left" onClick={()=>{prevOrNextImage(1)}}>
                        <ArrowBackIosNewRounded style={{fontSize: 50, color:'#fff'}}/>
                      </div>}
                      { currenShowIndex !== imagesList.length -1 && <div className="unfold-main-bigImg-right" onClick={()=>{prevOrNextImage(2)}}>
                        <ArrowForwardIosRounded style={{fontSize: 50, color:'#fff'}}/>
                      </div>}
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
            }
            <div className="main-content-controls">
              <Controls saveFn={saveFn} forumNums={forumNums} type={MsgTypes.comment} toUid={toUid} isPost={true} likeStatus={Number(likeStatus)} saveStatus={Number(saveStatus)} getLeaveMsgFn={getLeaveMsg} />
            </div>
            { !repliesList.length && <div className='main-content-none'>
              <div className='main-content-none-w'>
                <ForumOutlined/><br/>
                Be the first to comment
              </div>
            </div>}
          </div>
            { repliesList.length > 0 && <div className='afk-top-main-content-paginaion'>
                <Pagination count={totalPages} showFirstButton showLastButton onChange={onChange} />
              </div>
            }
            { repliesList.length>0 && 
              repliesList.map((replies, index) => {
                if(replies) {
                  return (
                    <div className='afk-top-main-content-item' key={index}>
                        <div className="main-content-title">
                          <div className="content-title-left">
                            <Avatar src={replies.comment.fromAvatarURL} alt={replies.comment.username} sx={{width:48, height:48}}/>{replies.comment.username}
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
                            <Controls notPostFn={(val)=> {notPostFn(val, index)}} replyNums={replies.comment.likeNum} pIndex={index} cIndex={0} comment={replies.comment} toUsername={replies.comment.username} type={MsgTypes.reply} toUid={toUid} isReply={false} getLeaveMsgFn={getLeaveMsg}/>
                          </div>
                          <Stepper postFn={(val)=>{postFn(val, index)}} pIndex={index} reply={replies.reply} getLeaveMsgFn={getLeaveMsg}/>
                        </div>
                    </div>
                  )
                }
            })}
        </div>
      </div>
    </div>
  )
}
export default Topic