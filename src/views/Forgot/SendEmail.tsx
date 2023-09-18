import './forgot.less'
import { Input } from 'antd'
import Button from '@mui/material/Button'
const ForgotEmail = () => {
  return (
    <div className="afk-forgot-email">
      <div className="forgot-email-main">
        <div className="forgot-email-main-title">Forgot your password?</div>
        <div className="forgot-email-main-desc">There is nothing to worry about, we'll send you a message to help you reset your password.</div>
        <div className="forgot-email-main-formtitle text-l">Email Address</div>
        <div className="forgot-email-main-input"><Input className="login-input" type="email" placeholder='Enter your email address' /></div>
        <div className='forgot-email-main-btn'>
          <Button className="send-email-btn" variant="contained">Send reset link</Button>
        </div>
      </div>
    </div>
  )
}
export default ForgotEmail