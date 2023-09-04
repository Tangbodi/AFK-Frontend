import { useState, useImperativeHandle, forwardRef } from 'react'
import { Modal, Form, Input, Button, message } from 'antd'
import { registrationAPI, loginAPI } from '@/request/api'
import { getTheme } from '@/utils/theme'
import logo from '@/assets/images/login-logo.png'
import logoDark from '@/assets/images/login-logo-dark.png'
import './register.less'


const Register = forwardRef((props, ref) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLoginValue, setIsLoginValue] = useState(false)
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
  const handleOk = () => {
    setIsModalOpen(false)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
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
      return
    }
    message.warning(loginRes.message)
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
        {
          !isLoginValue ? <Form form={form}  className="afk-post-form" layout="vertical" autoComplete="off" scrollToFirstError>
          <Form.Item name="username" label="Username" rules={[{ required: true, message: 'Please input your username!' }]}>
            <Input className="login-input" />
          </Form.Item>
          <Form.Item name="email" label="Email" rules={[{type: 'email',message: 'The input is not valid E-mail!'},{required: true,message: 'Please input your E-mail!'}]}>
            <Input className="login-input"  />
          </Form.Item>
          <Form.Item name="password" label="Password" rules={[{ required: true, message: 'Please input your password!' }]}>
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
        : 
        <Form form={form} className="afk-post-form" layout="vertical" autoComplete="off" scrollToFirstError>
          <Form.Item name="username" label="Username"  rules={[{ required: true, message: 'Please input your username!' }]}>
            <Input className="login-input" />
          </Form.Item>
          <Form.Item name="password" label="Password" rules={[{ required: true, message: 'Please input your password!' }]}>
            <Input.Password className="login-input"  />
          </Form.Item>
          <div className="forget-password">Forget password?</div>
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