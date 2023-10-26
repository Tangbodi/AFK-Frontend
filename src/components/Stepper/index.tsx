import './stepper.less'
import Avatar from '@mui/material/Avatar'
import Controls from '@/components/Controls'
import { forwardRef, useEffect, useState } from 'react'
import { dateUtils } from '@/utils/utils'
import { MsgTypes } from '@/config'
type Props = {
  reply?: any
  pIndex?: number
  postFn?: Function,
  getLeaveMsgFn?: Function
}
const VerticalLinearStepper: React.FC<Props> = forwardRef((props)=>{
  const { reply, getLeaveMsgFn, pIndex, postFn } = props
  const [more, setMore] = useState(false)
  const [showReply, setShowReply] = useState(reply)
  

  useEffect(()=>{
    setShowReply(reply)
    if(reply && reply.length>1) {
      setMore(true)
      setShowReply(reply.slice(0,1))
    } else {
      setMore(false)
    }
  }, [reply])

  const lookMore = () => {
    setMore(false)
    setShowReply(reply)
  }

  const getLeaveMidMsg = (val: any) => {
    getLeaveMsgFn(val)
  }

  const noPostFnMiddle = (status: number, cIndex: number) => {
    postFn({status, cIndex})
  }
  return (
    <div className="forum-steps">
      {
        showReply && showReply.length>0 &&
        showReply.map((replyItem, index)=>{
          return (
            <div className='form-steps-item' key={index}>
              <div className="form-steps-item-top">
                <div className='form-steps-item-top-left'>
                  <Avatar src={replyItem.fromAvatarURL} alt={replyItem.fromUsername}  sx={{width:48, height:48}}/>
                </div>
                <div className="form-steps-item-top-right">
                  <div className='top-right-name'>{replyItem.fromUsername}</div>
                  <div className='top-right-date'>{dateUtils(replyItem.createdAt, ' ')}</div>
                </div>
              </div>
              <div className='form-steps-item-main'>
                <div className='form-steps-item-main-content'>
                  {
                    replyItem.toReplyId && Number(replyItem.toReplyId) > 0 && 
                    <span className='content-relative'>@{replyItem.toUsername}</span>
                  }
                  { replyItem.content }
                </div>
                <Controls notPostFn={(status)=>{noPostFnMiddle(status, index)}} replyNums={replyItem.likeNum} pIndex={pIndex} cIndex={index} type={MsgTypes.reply} toUsername={replyItem.fromUsername} reply={replyItem} isReply={true} getLeaveMsgFn={getLeaveMidMsg}/>
              </div>
            </div>
          )
        })
      }
      { more && 
        <div className='form-steps-more' onClick={lookMore}>
          &gt;&gt; More Replies
        </div>
      }
      
    </div>
  )
})

export default VerticalLinearStepper
