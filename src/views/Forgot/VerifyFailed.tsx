import './forgot.less'
import emailIconLight from '@/assets/images/email-icon-light.png'
// import emailIconDark from '@/assets/images/email-icon-dark.png'
import Button from '@mui/material/Button'
const VerifyFailed = () => {
  return (
    <div className='afk-forgot-email'>
      <div className='afk-verify-success'>
        <div className='afk-forgot-verify-icon2'>
          <img src={emailIconLight}/>
        </div>
        <div className='afk-forgot-verify-content'>
          Email verification link expired
        </div>
        <div className='afk-forgot-verify-desc'>
          Looks like the verification link has expired. Not to worry, we can send the link again.
        </div>
        <div className='forgot-email-main-btn'>
          <Button className="send-email-btn" variant="contained">Resend verification link</Button>
        </div>
      </div>
    </div>
  )
}

export default VerifyFailed