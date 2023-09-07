import './redirect.less'
import { Form, Input, Button, message } from 'antd'
import { enterPasswordAPI } from '@/request/api'
const Redirect = () => {
  const [form] = Form.useForm()
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
      <div className='afk-redirect-form'>
        <Form form={form}  className="afk-post-form" layout="vertical" autoComplete="off" scrollToFirstError>
          <Form.Item name="newPassword" label="New Password">
            <Input.Password className="login-input"  />
          </Form.Item>
          <Form.Item name="confirmPassword" label="Confirm New Password">
            <Input.Password className="login-input"  />
          </Form.Item>
          <div className="form-login">
            <Button type="primary" className="form-login-btn" onClick={enterPassword}>Sign Up</Button>
          </div>
        </Form> 
      </div>
    </div>
  )
}
export default Redirect