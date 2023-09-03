import './stepper.less'
import Avatar from '@mui/material/Avatar'
import Controls from '@/components/Controls'
import { useState, forwardRef } from 'react'
import { dateUtils } from '@/utils/utils'
import { MsgTypes } from '@/config'
type Props = {
  reply?: any
  getLeaveMsgFn?: Function
}
const VerticalLinearStepper: React.FC<Props> = forwardRef((props, ref)=>{
  const { reply, getLeaveMsgFn } = props
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
                  <Avatar alt={replyItem.fromUsername} src="/static/images/avatar/1.jpg" sx={{width:'48px', height:'48px'}}/>
                </div>
                <div className="form-steps-item-top-right">
                  <div className='top-right-name'>{replyItem.fromUsername}</div>
                  <div className='top-right-date'>{dateUtils(replyItem.createdAt)}</div>
                </div>
              </div>
              <div className='form-steps-item-main'>
                <div className='form-steps-item-main-content'>
                  {
                    Number(replyItem.toReplyId) && 
                    <span className='content-relative'>@{replyItem.toUsername}</span>
                  }
                  { replyItem.content }
                </div>
                <Controls type={MsgTypes.reply} reply={replyItem} isReply={true} getLeaveMsgFn={getLeaveMidMsg}/>
              </div>
            </div>
          )
        })
      }
      <div className='form-steps-more'>
        &gt;&gt; More Replies
      </div>
    </div>
  )
})

export default VerticalLinearStepper
