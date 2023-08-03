import { useState } from 'react'
import { Button, Modal, Form, Input } from 'antd'
import './postDialog.less'
const PostDialog = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { TextArea } = Input
  const showModal = () => {
    setIsModalOpen(true);
  }

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  }
  return (
    <>
      <Modal width={860} wrapClassName="afk-post-dialog" title="Forum: Tears of the Kingdom" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={[
          <Button key={1} type="primary" onClick={handleOk}>Save</Button>,
          <Button key={2} type="primary" onClick={handleOk}>Post</Button>,
        ]}>
        <Form className="afk-post-form" layout="vertical" autoComplete="off">
          <Form.Item name="title" label="Title">
            <Input className="titleInput" />
          </Form.Item>
          <Form.Item name="hastag" label="HashTag">
            <div className="tabs-tags">
              <span className="tabs-tags-tag active">Guides</span>
              <span className="tabs-tags-tag">News</span>
              <span className="tabs-tags-tag">Q&A</span>
              <span className="tabs-tags-tag">Reviews</span>
              <span className="tabs-tags-tag">Chat</span>
            </div>
          </Form.Item>
          <Form.Item name="postcontent" label="Post Content">
            <TextArea
              className="inputTextarea"
              maxLength={100}
              rows={5}
              style={{resize: 'none' }}
              placeholder=""
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}
export default PostDialog