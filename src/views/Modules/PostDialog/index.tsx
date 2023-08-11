import { useState } from 'react'
import { Button, Modal, Form, Input } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import Uploader from '@/components/Uploader'
import './postDialog.less'
const PostDialog = () => {
  const [isModalOpen, setIsModalOpen] = useState(true)
  const { TextArea } = Input
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
      <Modal width={860} wrapClassName="afk-post-dialog" title="Forum: Tears of the Kingdom" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={[
          <Button key={1} type="primary" onClick={handleOk}>Save</Button>,
          <Button key={2} type="primary" onClick={handleOk}>Post</Button>,
        ]}>
        <Form className="afk-post-form" layout="vertical" autoComplete="off">
          <Form.Item name="title" label="Title">
            <Input className="titleInput" />
          </Form.Item>
          <Form.Item name="hastag" className='postDialog-btns' label="HashTag">
            <Button type="primary" icon={<PlusOutlined />}>
              Guides
            </Button>
            <Button type="primary" icon={<PlusOutlined />}>
              News
            </Button>
            <Button type="primary" icon={<PlusOutlined />}>
              Q&A
            </Button>
            <Button type="primary" icon={<PlusOutlined />}>
              Reviews
            </Button>
            <Button type="primary" icon={<PlusOutlined />}>
              Chat
            </Button>
          </Form.Item>
          <Form.Item name="hastag" label="Image & Video">
            <Uploader/>
          </Form.Item>
          <Form.Item name="postcontent" label="Post Content">
            <TextArea
              className="inputTextarea"
              maxLength={100}
              rows={5}
              style={{resize: 'none' }}
              placeholder="What are your thoughts?"
            />
          </Form.Item>
        </Form>
      </Modal>
  )
}
export default PostDialog