import './stepper.less'
import Avatar from '@mui/material/Avatar'
import Controls from '@/components/Controls'
import { forwardRef, useEffect, useState } from 'react'
import { dateUtils } from '@/utils/utils'
import { MsgTypes } from '@/config'
type Props = {
  reply?: any
  pIndex?: number
  getLeaveMsgFn?: Function
}
const VerticalLinearStepper: React.FC<Props> = forwardRef((props)=>{
  const { reply, getLeaveMsgFn, pIndex } = props
  const [more, setMore] = useState(false)
  const [showReply, setShowReply] = useState(reply)
  

  useEffect(()=>{
    if(reply && reply.length>3) {
      setMore(true)
      setShowReply(reply.slice(0,3))
    }
  }, [])

  const lookMore = () => {
    setMore(false)
    setShowReply(reply)
  }

  const getLeaveMidMsg = (val: any) => {
    getLeaveMsgFn(val)
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
                  <Avatar alt={replyItem.fromUsername}  sx={{width:48, height:48}}/>
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
                <Controls replyNums={replyItem.likeNum} pIndex={pIndex} cIndex={index} type={MsgTypes.reply} toUsername={replyItem.fromUsername} reply={replyItem} isReply={true} getLeaveMsgFn={getLeaveMidMsg}/>
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
