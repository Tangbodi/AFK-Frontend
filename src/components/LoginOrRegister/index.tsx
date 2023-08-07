import { useState, useImperativeHandle, forwardRef } from 'react'
import { Modal, Form, Input, Button } from 'antd'
import logo from '@/assets/images/login-logo.png'
import './register.less'


const Register = forwardRef((props, ref) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLoginValue, setIsLoginValue] = useState(false)
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

  return (
    <>
      <Modal width={440} maskClosable={false} wrapClassName="afk-login" footer={null} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <div className="afk-login-logo">
          <img src={logo} width={200} height={60}/>
        </div>
        {
          isLoginValue ? <Form  className="afk-post-form" layout="vertical" autoComplete="off">
          <Form.Item name="username" label="Username">
            <Input className="login-input" />
          </Form.Item>
          <Form.Item name="password" label="Post Content">
            <Input className="login-input"  />
          </Form.Item>
          <Form.Item name="confirmPassword" label="Re-enter Password">
            <Input className="login-input"  />
          </Form.Item>
          <div className="form-login">
            <Button type="primary" className="form-login-btn">Sign Up</Button>
          </div>
          <div className="sign-up" onClick={gotoLoginOrSinup}>Have an account? Log In</div>
        </Form> 
        : 
        <Form className="afk-post-form" layout="vertical" autoComplete="off">
          <Form.Item name="username" label="Username">
            <Input className="login-input" />
          </Form.Item>
          <Form.Item name="password" label="Post Content">
            <Input className="login-input"  />
          </Form.Item>
          <div className="forget-password">Forget password?</div>
          <div className="form-login">
            <Button type="primary" className="form-login-btn">Log In</Button>
          </div>
          <div className="sign-up" onClick={gotoLoginOrSinup}>Don’t have an account? Sign up</div>
        </Form>
        }
      </Modal>
    </>
  )
})

export default Register