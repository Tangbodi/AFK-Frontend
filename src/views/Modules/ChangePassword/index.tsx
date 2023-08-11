import { useState, useImperativeHandle, forwardRef } from 'react'
import { Button, Modal, Form, Input } from 'antd'
import './changepassword.less'
const ChangePassword = forwardRef((props, ref) => {
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
  return (
    <Modal width={500} wrapClassName="afk-change-password" title="Change Password" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={[
      <Button key={1} onClick={handleCancel}>Cancel</Button>,
      <Button key={2} type="primary">Save</Button>,
    ]}>
    <Form className="afk-post-form" layout="vertical" autoComplete="off">
      <Form.Item name="Old Password" label="Old Password">
        <Input.Password className="titleInput" />
      </Form.Item>
      <Form.Item name="New Password" label="New Password">
        <Input.Password className="titleInput" />
      </Form.Item>
      <Form.Item name="Confirm New Password" label="Confirm New Password">
        <Input.Password className="titleInput" />
      </Form.Item>
    </Form>
  </Modal>
  )
})

export default ChangePassword