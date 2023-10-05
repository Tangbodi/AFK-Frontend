import './reset.less'
import { Form, Input, Button, message } from 'antd'
import { enterPasswordAPI } from '@/request/api'
import { useNavigate } from 'react-router-dom'
const Redirect = () => {
  const [form] = Form.useForm()
  const navigateTo = useNavigate()
  const enterPassword = async() => {
    const params = await form.validateFields()
    const regX = /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\\d]){1,})(?=(.*[\\W_]){1,})(?!.*\\s).{8,}$/
    if(!params.newPassword||!params.confirmPassword) {
      message.warning('New Password cannot be null')
      return
    }
    if(regX.test(params.newPassword)) {
      message.warning('Invalid Password')
      return
    }
    if(params.newPassword !== params.confirmPassword){
      message.warning('The two passwords are different')
      return
    }
    const enterPasswordRes = await enterPasswordAPI(params)
    if(enterPasswordRes.code === 200) {
      message.success(enterPasswordRes.data)
      return
    }
    message.warning(enterPasswordRes.message)
  }
  return (
    <div className="afk-redirect">
      <div className='afk-redirect-top'>
        <div className='afk-redirect-top-tit'>Reset Password</div>
        <div className='afk-redirect-top-desc'>Choose a new password for your account</div>
      </div>
      <div className='afk-redirect-form'>
        <Form form={form}  className="afk-post-form" layout="vertical" autoComplete="off" scrollToFirstError>
          <Form.Item name="newPassword" label="New Password">
            <Input.Password className="login-input" placeholder='Your new password *'  />
          </Form.Item>
          <Form.Item name="confirmPassword" label="Confirm New Password">
            <Input.Password className="login-input" placeholder='Confirm your new password *'/>
          </Form.Item>
          <div className="form-login">
            <div className=''>
              <Button type="primary" className="form-login-btn" onClick={enterPassword}>Reset Password</Button>
            </div>
            <div>
              <Button className="back-to-login" onClick={()=>{navigateTo('/')}}>Back to Login</Button>
            </div>
          </div>
        </Form> 
      </div>
    </div>
  )
}
export default Redirect