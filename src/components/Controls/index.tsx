import './controls.less'
import { 
  Grade, 
  GradeOutlined,  
  FavoriteRounded, 
  FavoriteBorderRounded, 
  ChatBubbleOutlineOutlined
} from '@mui/icons-material'
import { Input, Button, message } from 'antd'
import { useState, forwardRef, useEffect } from 'react'
import { MsgTypes } from '@/config'
import { likeSavePostAPI, editCommentAPI, editReplyAPI } from '@/request/api'
import { useSearchParams, useParams } from 'react-router-dom'
type Props = {
  type: string,
  isPost?: boolean,
  toUid?: string,
  isReply?: boolean, // 是否是回复别人的回复
  comment?: any,
  reply?: any,
  pIndex?: number, // 父索引
  cIndex?: number, // 子索引
  likeStatus?: number,
  saveStatus?: number,
  getLeaveMsgFn?: Function
}
const ControlsComp: React.FC<Props> = forwardRef((props, _ref) => {
  const { TextArea } = Input
  const { type, isPost, toUid, isReply, comment, reply, likeStatus, saveStatus, getLeaveMsgFn, cIndex, pIndex } = props
  const { postId } = useParams()
  const [content, setContent] = useState('')
  const [searchParams] = useSearchParams()
  const gameId =  searchParams.get('game')
  const genreId = searchParams.get('genre')
  const [inputShow, setInputShow] = useState(false)
  const [childLikeStatus, setChildLikeStatus] = useState(likeStatus ||(comment&&comment.likeStatus)||(reply&&reply.likeStatus))
  const [childSaveStatus, setChildSaveStatus] = useState(saveStatus)

  useEffect(()=>{
    reply&&reply.likeStatus&&setChildLikeStatus(reply.likeStatus)
  },[reply&&reply.likeStatus])

  useEffect(()=>{
    comment&&comment.likeStatus&&setChildLikeStatus(comment.likeStatus)
  },[comment&&comment.likeStatus])

  useEffect(()=>{
    setChildLikeStatus(likeStatus)
  },[likeStatus])

  useEffect(()=>{
    setChildSaveStatus(saveStatus)
  },[saveStatus])

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value)
  }
  const likeSavePost = async(status?:any, isSave?: boolean) => {
    const params: any = {}
    if(reply) params.typeId = 2 // 如果reply不为空
    if(comment) params.typeId = 1 // 如果comment不为空
    if(!comment && !reply) params.typeId = 0 // 如果comment && reply 不为空
    if(isPost && isSave) {
      setChildSaveStatus(childSaveStatus ? 0 : 1)
      params.typeId = 3
      params.objectId = postId
      params.status = status
    } else {
      if(type === MsgTypes.comment) {
        // 如果type是comment类型 说明是评论自身
        params.objectId = postId
        setChildLikeStatus(childLikeStatus?0:1)
        params.status = status
      } else {
        setChildLikeStatus(childLikeStatus?0:1)
        params.status = status
        if(reply) params.objectId = reply.replyId
        if(comment) params.objectId = comment.commentId
      }
    }
    const likeSavePostRes = await likeSavePostAPI(params)
    if(likeSavePostRes.code === 200) {
      return
    }
    message.warning(likeSavePostRes.message)
  }

  const sumitCommentOrReply = async() => {
    if(type === MsgTypes.comment){
      // comment页面type为comment
      // 此时调用controls 分享、提交回复功能显示的文案为comment
      const editCommentRes = await editCommentAPI({ toUid, gameId, genreId, content, postId })
      if(editCommentRes.code === 200) {
        message.success('comment successful')
        getLeaveMsgFn(true)
        setInputShow(false)
        // 向父组件传值 告诉它 我提交成功了， 让父组件执行刷新操作
        return
      }
      message.warning(editCommentRes.message)
      return
    }
    // comment页面type为reply
    // 此时调用controls 分享、提交回复功能显示的文案为Reply
    const params: any = { gameId, genreId, content, postId }
    if(!isReply) { // 如果是直接回复评论
      params.toUid = comment.fromUid
      params.commentId =  comment.commentId
    } else {  // 如果是回复别人已经发生的回复
      params.toUid = reply.fromUid
      params.toReplyId = reply.replyId,
      params.commentId =  reply.commentId
    }
    const editReplyRes = await editReplyAPI(params)
    if(editReplyRes.code === 200) {
      message.success('replay successful')
      setInputShow(false)
      getLeaveMsgFn({
        pIndex,
        likeStatus: 0,
        cIndex: cIndex+1,
        content: params.content,
        replyId: editReplyRes.data.replyId,
        toReplyId: editReplyRes.data.replyId,
        commentId: editReplyRes.data.commentId,
        createdAt: editReplyRes.data.createdAt,
        fromUid: sessionStorage.getItem('afk-userid'),
        toUsername: sessionStorage.getItem('afk-username'),
        fromUsername:sessionStorage.getItem('afk-username')
      })
      return
    }
    message.warning(editReplyRes.message)
  }

  const cancleHandle = () => {
    setInputShow(false)
  }

  return (
    <div className='afk-like-wrap'>
      <div className="afk-like-save">
        <div className="afk-like-save-item" onClick={()=>{likeSavePost(childLikeStatus?0:1)}}>
          { childLikeStatus ?  <FavoriteRounded/> : <FavoriteBorderRounded/> }Like
          </div>
        { isPost &&  <div className="afk-like-save-item" onClick={()=>{likeSavePost(null, true)}}>
         {childSaveStatus ? <Grade/>:<GradeOutlined/>}Save
        </div> }
        <div className="afk-like-save-item" onClick={()=>{setInputShow(!inputShow)}}>
          {
            type === MsgTypes.comment ? <><ChatBubbleOutlineOutlined/>Comment</> : <><ChatBubbleOutlineOutlined/>Reply</>
          }
        </div>
        {/* <div className="afk-like-save-item transform-1"><SendOutlined/>Share</div> */}
      </div>
      {
        inputShow &&
        <div className='afk-like-input'>
          <div className='afk-like-input-area'>
            <TextArea
              maxLength={100}
              style={{ height: 220 }}
              onChange={onChange}
              placeholder="Please enter"
            />
          </div>
          <div className='afk-like-input-btn'>
            <Button className='afk-like-cancel-btn' onClick={cancleHandle}>Cancel</Button>
            <Button type="primary" onClick={sumitCommentOrReply}>{type === MsgTypes.comment?'Comment':'Reply'}</Button>
          </div>
        </div>
      }
      
    </div>
  )
})
export default ControlsComp