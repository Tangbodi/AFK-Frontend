import './stepper.less'
import Avatar from '@mui/material/Avatar'
import Controls from '@/components/Controls'
import { forwardRef } from 'react'
import { dateUtils } from '@/utils/utils'
import { MsgTypes } from '@/config'
type Props = {
  reply?: any
  pIndex?: number
  getLeaveMsgFn?: Function
}
const VerticalLinearStepper: React.FC<Props> = forwardRef((props)=>{
  const { reply, getLeaveMsgFn, pIndex } = props
  const getLeaveMidMsg = (val: any) => {
    getLeaveMsgFn(val)
  }
  return (
    <div className="forum-steps">
      {
        reply && reply.length>0 &&
        reply.map((replyItem, index)=>{
          return (
            <div className='form-steps-item' key={index}>
              <div className="form-steps-item-top">
                <div className='form-steps-item-top-left'>
                  <Avatar alt={replyItem.fromUsername}  sx={{width:'48px', height:'48px'}}/>
                </div>
                <div className="form-steps-item-top-right">
                  <div className='top-right-name'>{replyItem.fromUsername}</div>
                  <div className='top-right-date'>{dateUtils(replyItem.createdAt, 'T')}</div>
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
                <Controls pIndex={pIndex} cIndex={index} type={MsgTypes.reply} toUsername={replyItem.fromUsername} reply={replyItem} isReply={true} getLeaveMsgFn={getLeaveMidMsg}/>
              </div>
            </div>
          )
        })
      }
      {/* <div className='form-steps-more'>
        &gt;&gt; More Replies
      </div> */}
    </div>
  )
})

export default VerticalLinearStepper
