import { useState, useImperativeHandle, forwardRef } from 'react'
import { Modal, Form, Input, Button, message } from 'antd'
import { useDispatch } from 'react-redux'
import { registrationAPI, loginAPI, forgotPasswordAPI } from '@/request/api'
import { getTheme } from '@/utils/theme'
import logo from '@/assets/images/login-logo.png'
import logoDark from '@/assets/images/login-logo-dark.png'
import './register.less'
type Props = {
  closeable: Function
}

const Register: React.FC<Props> = forwardRef((props, ref) => {
  const { closeable } = props
  const dispatch = useDispatch()
  const [isModalOpen, setIsModalOpen] = useState(true)
  const [isLoginValue, setIsLoginValue] = useState(true)
  const [isForgot, setIsForgot] = useState(false)
  const [form] = Form.useForm()
  useImperativeHandle(ref, () => ({
    showModal
  }))

  const showModal = (isLogin: boolean) => {
    setIsLoginValue(isLogin)
    setIsModalOpen(true)
  }
  const gotoLoginOrSinup = () => {
    setIsLoginValue(!isLoginValue)
  }
  const hanldeForgot = () => {
    setIsForgot(true)
  }
  const handleOk = () => {
    setIsModalOpen(false)
  }

  const handleCancel = () => {
    form.resetFields()
    setIsLoginValue(false)
    setIsForgot(false)
    setIsModalOpen(false)
    closeable(true)
    dispatch({type:'isLoginFiber', val: false})
  }

  const onSignUp = async() => {
    const values = await form.validateFields()
    if(values.password !== values.confirmPassword) {
      message.warning("The two entered passwords are inconsistent. Please check!")
      return
    }
    const registrationRes = await registrationAPI(values)
    if(registrationRes.code === 200) {
      message.success(registrationRes.data)
      setIsModalOpen(false)
      return
    }
    message.warning(registrationRes.message)
  }

  const onLogin = async() => {
    const values = await form.validateFields()
    const loginRes = await loginAPI(values)
    if(loginRes.code === 200) {
      message.success('Login successful')
      setIsModalOpen(false)
      sessionStorage.setItem('afk-username', loginRes.data.username)
      sessionStorage.setItem('afk-userid', loginRes.data.userId)
      sessionStorage.setItem('afk-jsessionid', loginRes.data.jsessionid)
      dispatch({type:"afkToken", val: loginRes.data.jsessionid})
      form.resetFields()
      return
    }
    message.warning(loginRes.message)
  }

  const forgotPassword = async() => {
    const params = await form.validateFields()
    const emailRegx = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/
    if(!params.email) {
      message.warning('Please enter you email')
      return
    }
    if(!emailRegx.test(params.email)){
      message.warning('Email is invalid')
      return
    }
    const forgotPasswordRes = await forgotPasswordAPI(params)
    if(forgotPasswordRes.code === 200) {
      message.success(forgotPasswordRes.data)
      form.resetFields()
      return
    }
    message.warning(forgotPasswordRes.message)
  }

  return (
    <>
      <Modal width={440} maskClosable={false} wrapClassName="afk-login" footer={null} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <div className="afk-login-logo">
          { getTheme() === 'theme-light'? 
            <img src={logo} width={200} height={60}/>
            : <img src={logoDark} width={200} height={60}/>
          }
        </div>
        { isForgot &&
          <Form form={form}  className="afk-post-form" layout="vertical" autoComplete="off" scrollToFirstError>
            <Form.Item name="email" label="Email">
              <Input className="login-input" type="email" />
            </Form.Item>
            <div className="form-login">
              <Button type="primary" className="form-login-btn" onClick={forgotPassword}>Submit</Button>
            </div>
          </Form>
        }
        {
          !isLoginValue && !isForgot && <Form form={form}  className="afk-post-form" layout="vertical" autoComplete="off" scrollToFirstError>
          <Form.Item name="username" label="Username" rules={[{ required: true, message: 'Please enter your username!' }]}>
            <Input className="login-input" />
          </Form.Item>
          <Form.Item name="email" label="Email" rules={[{type: 'email',message: 'The input is not valid E-mail!'},{required: true,message: 'Please enter your E-mail!'}]}>
            <Input className="login-input"  />
          </Form.Item>
          <Form.Item name="password" label="Password" rules={[{ required: true, message: 'Please enter your password!' }]}>
            <Input.Password className="login-input"  />
          </Form.Item>
          <Form.Item name="confirmPassword" label="Re-enter Password" rules={[{ required: true, message: 'Please re-enter your password!' }]}>
            <Input.Password className="login-input"  />
          </Form.Item>
          <div className="form-login">
            <Button type="primary" className="form-login-btn" onClick={onSignUp}>Sign Up</Button>
          </div>
          <div className="sign-up" onClick={gotoLoginOrSinup}>Have an account? Log In</div>
        </Form> 
        }
        {
          isLoginValue && !isForgot &&
          <Form form={form} className="afk-post-form" layout="vertical" autoComplete="off" scrollToFirstError>
          <Form.Item name="username" label="Username"  rules={[{ required: true, message: 'Please enter your username!' }]}>
            <Input className="login-input" />
          </Form.Item>
          <Form.Item name="password" label="Password" rules={[{ required: true, message: 'Please enter your password!' }]}>
            <Input.Password className="login-input"  />
          </Form.Item>
          <div className="forget-password" onClick={hanldeForgot}>Forget password?</div>
          <div className="form-login">
            <Button type="primary" className="form-login-btn" onClick={onLogin}>Log In</Button>
          </div>
          <div className="sign-up" onClick={gotoLoginOrSinup}>Don’t have an account? Sign up</div>
        </Form>
        }
      </Modal>
    </>
  )
})

export default Register