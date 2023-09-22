import { useState, useImperativeHandle, forwardRef } from 'react'
import { Button, Modal, Form, Input, message } from 'antd'
import './changepassword.less'
import { updatePasswordAPI } from '@/request/api'
const ChangePassword = forwardRef((_, ref) => {
  const [form] = Form.useForm()
  const [isModalOpen, setIsModalOpen] = useState(false)
  useImperativeHandle(ref, () => ({
    showModal
  }))
  const showModal = () => {
    setIsModalOpen(true)
  }

  const handleOk = () => {
    setIsModalOpen(false)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  const updatePassword = async () => {
    const params = await form.validateFields()
    const regX = /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\\d]){1,})(?=(.*[\\W_]){1,})(?!.*\\s).{8,}$/
    if(!params.oldPassword) {
      message.warning('Old Password cannot be null')
      return
    }
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
    const updatePasswordRes = await updatePasswordAPI(params)
    if(updatePasswordRes.code === 200) {
      message.success('update success')
      setIsModalOpen(false)
      return
    }
    message.warning(updatePasswordRes.message)
  }
  return (
    <Modal width={500} wrapClassName="afk-change-password" title="Change Password" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={[
      <Button key={1} onClick={handleCancel}>Cancel</Button>,
      <Button key={2} type="primary" onClick={updatePassword}>Save</Button>,
    ]}>
    <Form form={form}  className="afk-post-form" layout="vertical" autoComplete="off">
      <Form.Item name="oldPassword" label="Old Password">
        <Input.Password className="titleInput" />
      </Form.Item>
      <Form.Item name="newPassword" label="New Password">
        <Input.Password className="titleInput" />
      </Form.Item>
      <Form.Item name="confirmPassword" label="Confirm New Password">
        <Input.Password className="titleInput" />
      </Form.Item>
    </Form>
  </Modal>
  )
})

export default ChangePassword