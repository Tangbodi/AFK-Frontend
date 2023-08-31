import './controls.less'
import { 
  Grade, 
  GradeOutlined,  
  FavoriteRounded, 
  FavoriteBorderRounded, 
  ChatBubbleOutlineOutlined
} from '@mui/icons-material'
import { Input, Button, message } from 'antd'
import { useState, forwardRef } from 'react'
import { MsgTypes, LoveTypes } from '@/config'
import { likeSavePostAPI, editCommentAPI, editReplyAPI } from '@/request/api'
import { useSearchParams, useParams } from 'react-router-dom'
type Props = {
  type: string,
  isPost?: boolean,
  toUid?: string,
  isReply?: boolean, // 是否是回复别人的回复
  comment?: any
  reply?: any
}
const ControlsComp: React.FC<Props> = forwardRef((props, ref) => {
  const { TextArea } = Input
  const { type, isPost, toUid, isReply, comment, reply } = props
  const { postId } = useParams()
  const [content, setContent] = useState('')
  const [searchParams] = useSearchParams()
  const gameId =  searchParams.get('game')
  const genreId = searchParams.get('genre')
  const [inputShow, setInputShow] = useState(false)


  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value)
  }
  const likeSavePost = async() => {
    const params: any = {}
    if(comment) params.type = 1 // 如果comment不为空
    if(reply) params.type = 2 // 如果reply不为空
    if(!comment && !reply) params.type = 0 // 如果comment &&  reply 不为空
    if(isPost) params.type = 3
    console.log('x', type)
    console.log('c', comment)
    console.log('r', reply)
    // const likeSavePostRes = await likeSavePostAPI(params)
    // if(likeSavePostRes.code === 200) {
    //   return
    // }
    // message.warning(likeSavePostRes.message)
  }

  const sumitCommentOrReply = async() => {
    if(type === MsgTypes.comment){
      // comment页面type为comment
      // 此时调用controls 分享、提交回复功能显示的文案为comment
      const editCommentRes = await editCommentAPI({ toUid, gameId, genreId, content, postId })
      if(editCommentRes.code === 200) {
        message.success('comment successful')
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
    } else { // // 如果是回复别人已经发生的回复
      params.toUid = reply.fromUid
      params.toReplyId = reply.replyId,
      params.commentId =  reply.commentId
    }
    const editReplyRes = await editReplyAPI(params)
    if(editReplyRes.code === 200) {
      message.success('replay successful')
      return
    }
    message.warning(editReplyRes.message)
  }

  return (
    <div className='afk-like-wrap'>
      <div className="afk-like-save">
        <div className="afk-like-save-item" onClick={likeSavePost}><FavoriteBorderRounded/><FavoriteRounded/>Like</div>
        { isPost &&  <div className="afk-like-save-item" onClick={likeSavePost}><GradeOutlined/><Grade/>Save</div> }
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
              style={{ height: 220, resize: 'none' }}
              onChange={onChange}
              placeholder="Please input"
            />
          </div>
          <div className='afk-like-input-btn'>
            {/* <Button className='afk-like-cancel-btn'>Cancel</Button> */}
            <Button type="primary" onClick={sumitCommentOrReply}>{type === MsgTypes.comment?'Comment':'Reply'}</Button>
          </div>
        </div>
      }
      
    </div>
  )
})
export default ControlsComp