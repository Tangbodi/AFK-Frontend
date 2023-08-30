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
      console.log('commentsRepliesRes', commentsRepliesRes)
      const repliesData = commentsRepliesRes.data || {}
      const test = [
        [{
            "username": "Bodi",
            "comment_id": "5dd410c76bb346398b0d22531effb380",
            "created_at": "2023-08-16T16:52:28.000+00:00",
            "avatar_url": "",
            "content": "I'm looking for a group, would you like to join?",
            "post_id": "af04b38003ee46a6a17bbfed40992cb2"
          },
          [{
              "reply_id": "f693751f88384e61a94abbefcdffdd62",
              "from_username": "Tang",
              "created_at": "2023-08-16 12:54:05.0",
              "to_username": "Bodi",
              "content": "Yep, invite me!"
            },
            {
              "reply_id": "91d49d9381ec48fc8957dd7607f13214",
              "from_username": "Tang",
              "created_at": "2023-08-17 12:20:09.0",
              "to_username": "Bodi",
              "content": "Did you invite me?"
            },
            {
              "reply_id": "953b40f76df047e589f872bfa6e35ceb",
              "from_username": "Tang",
              "created_at": "2023-08-17 12:21:01.0",
              "to_username": "Bodi",
              "content": "my id is xxx"
            }
          ]
        ],
        [{
            "content": "The group is full",
            "username": "Bodi",
            "avatar_url": "",
            "comment_id": "946a3d1cafd24e038fff58cb569c05a2",
            "post_id": "af04b38003ee46a6a17bbfed40992cb2",
            "created_at": "2023-08-17T16:23:26.000+00:00"
          },
          []
        ],
        [{
            "username": "Bodi",
            "comment_id": "40c7c46dd8a34c11b2775a59de5b1d67",
            "avatar_url": "",
            "post_id": "af04b38003ee46a6a17bbfed40992cb2",
            "created_at": "2023-08-17T16:25:17.000+00:00",
            "content": "If you want to join our group, please follow my post, thanks!"
          },
          []
        ]
      ]
      setRepliesList([...test])
      // setRepliesList([...repliesData.content])
      console.log('res',repliesList)
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
              <Controls type={MsgTypes.comment} toUid={toUid}/>
            </div>
          </div>
          {/* <div className='afk-top-main-content-item'>
              <div className="main-content-title">
                <div className="content-title-left">
                  <Avatar alt="Josh7651" src="/static/images/avatar/1.jpg" sx={{width:'48px', height:'48px'}}/>Ella0983
                </div>
                <div className="content-title-right">
                  July 7, 2023
                </div>
              </div>
              <div className="main-content-detail">
                <div className="main-content-desc">
                  Lorem ipsum dolor sit amet consectetur adipiscing elit tortor eu dolorol egestas morbi sem vulputate etiam facilisis pellentesque ut quis Lorem ipsum dolor sit Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet.
                </div>
                <div className="main-content-controls comment-type">
                  <Controls type={MsgTypes.reply} toUid={toUid}/>
                </div>
              </div>
          </div> */}
            {
              repliesList && repliesList.length && 
              repliesList.map((replies, index) => {
                return (
                  <div className='afk-top-main-content-item' key={index}>
                      <div className="main-content-title">
                        <div className="content-title-left">
                          <Avatar alt={replies.username} src="/static/images/avatar/1.jpg" sx={{width:'48px', height:'48px'}}/>{replies.username}
                        </div>
                        <div className="content-title-right">
                          July 7, 2023xxxx111
                        </div>
                      </div>
                      <div className="main-content-detail">
                        <div className="main-content-desc">
                          Lorem ipsum dolor sit amet consectetur adipiscing elit tortor eu dolorol egestas morbi sem vulputate etiam facilisis pellentesque ut quis Lorem ipsum dolor sit Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet.
                        </div>
                        <div className="main-content-controls comment-type">
                          <Controls type={MsgTypes.reply} toUid={toUid}/>
                        </div>
                        <div>
                          <Stepper/>
                        </div>
                      </div>
                  </div>
                )
              })
            }
          {/* <div className='afk-top-main-content-item'>
              <div className="main-content-title">
                <div className="content-title-left">
                  <Avatar alt="Josh7651" src="/static/images/avatar/1.jpg" sx={{width:'48px', height:'48px'}}/>Ella0983
                </div>
                <div className="content-title-right">
                  July 7, 2023
                </div>
              </div>
              <div className="main-content-detail">
                <div className="main-content-desc">
                  Lorem ipsum dolor sit amet consectetur adipiscing elit tortor eu dolorol egestas morbi sem vulputate etiam facilisis pellentesque ut quis Lorem ipsum dolor sit Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet.
                </div>
                <div className="main-content-controls comment-type">
                  <Controls type={MsgTypes.reply} toUid={toUid}/>
                </div>
                <div>
                  <Stepper/>
                </div>
              </div>
          </div>
          <div className='afk-top-main-content-item'>
              <div className="main-content-title">
                <div className="content-title-left">
                  <Avatar alt="Josh7651" src="/static/images/avatar/1.jpg" sx={{width:'48px', height:'48px'}}/>Ella0983
                </div>
                <div className="content-title-right">
                  July 7, 2023
                </div>
              </div>
              <div className="main-content-detail">
                <div className="main-content-desc">
                  Lorem ipsum dolor sit amet consectetur adipiscing elit tortor eu dolorol egestas morbi sem vulputate etiam facilisis pellentesque ut quis Lorem ipsum dolor sit Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet.
                </div>
                <div className="main-content-controls comment-type">
                  <Controls type={MsgTypes.reply} toUid={toUid}/>
                </div>
              </div>
          </div> */}
        </div>
      </div>
    </div>
  )
}
export default Topic