import './forgot.less'
import { Done } from '@mui/icons-material'
import Button from '@mui/material/Button'
const VerifySuccess = () => {
  return (
    <div className='afk-forgot-email'>
      <div className='afk-verify-success'>
        <div className='afk-forgot-verify-icon'>
          <Done sx={{ fontSize: 28 }}/>
        </div>
        <div className='afk-forgot-verify-content'>
          Thank you
        </div>
        <div className='afk-forgot-verify-desc'>
          Your email address was successfully verified.
        </div>
        <div className='forgot-email-main-btn'>
          <Button className="send-email-btn" variant="contained">Back to Login</Button>
        </div>
      </div>
    </div>
  )
}

export default VerifySuccess