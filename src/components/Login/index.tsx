import { useState } from 'react'
import { Modal, Form, Input, Button } from 'antd'
import logo from '@/assets/images/login-logo.png'
import './login.less'
const Login = () => {
  const [isModalOpen, setIsModalOpen] = useState(true)
  const showModal = () => {
    setIsModalOpen(true)
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
          <div className="sign-up">Don’t have an account? Sign up</div>
        </Form>
      </Modal>
    </>
  )
}

export default Login