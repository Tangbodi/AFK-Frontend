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
  toUid: string,
}
const ControlsComp: React.FC<Props> = forwardRef((props, ref) => {
  const { TextArea } = Input
  const { type, toUid } = props
  const { postId } = useParams()
  const [content, setContent] = useState('')
  const [searchParams] = useSearchParams()
  const gameId =  searchParams.get('game')
  const genreId = searchParams.get('genre')
  const [inputShow, setInputShow] = useState(false)

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value)
  }
  const likeSavePost = async(type) => {
    const params: any = { type }
    if(type === MsgTypes.comment) {
      // 此时postId应为路由里的postId
      params.postId = postId
    } else {
      // 此时postId应为当前回复的postId
    }
    const likeSavePostRes = await likeSavePostAPI(params)
    if(likeSavePostRes.code === 200) {
      return
    }
    message.warning(likeSavePostRes.message)
  }

  const sumitCommentOrReply = async() => {
    if(type === MsgTypes.comment){
      // comment 类型
      const editCommentRes = await editCommentAPI({ toUid, gameId, genreId, content,postId })
      if(editCommentRes.code === 200) {
        message.success('comment successful')
        // 向父组件传值 告诉它 我提交成功了， 让父组件执行刷新操作

        return
      }
      message.warning(editCommentRes.message)
      return
    }
    // reply 类型
  }

  return (
    <div className='afk-like-wrap'>
      <div className="afk-like-save">
        <div className="afk-like-save-item"><FavoriteBorderRounded/><FavoriteRounded/>Like</div>
        <div className="afk-like-save-item"><GradeOutlined/><Grade/>Save</div>
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
            <Button type="primary" onClick={sumitCommentOrReply}>Comment</Button>
          </div>
        </div>
      }
      
    </div>
  )
})
export default ControlsComp