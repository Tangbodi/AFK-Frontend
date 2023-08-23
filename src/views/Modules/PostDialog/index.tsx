import { useState, useImperativeHandle, forwardRef } from 'react'
import { Button, Modal, Form, Input, message } from 'antd'
// import { PlusOutlined } from '@ant-design/icons'
import Uploader from '@/components/Uploader'
import './postDialog.less'
const PostDialog = forwardRef((props, ref) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { TextArea } = Input
  const [form] = Form.useForm()
  useImperativeHandle(ref, () => ({
    showModal
  }))
  const showModal = () => {
    setIsModalOpen(true)
  }

  const handleOk = async() => {
    const values = await form.validateFields()
    if(!values.title) {
      message.warning("Please input title")
      return
    }
    if(!values.imageList.length) {
      message.warning('Please drag or drop a image')
      return
    }
    if(!values.textRender){
      message.warning('Please input post content')
      return
    }
    // setIsModalOpen(false)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  const getFileList = (val) => {
    console.log('a1', val)
  }

  return (
      <Modal width={860} wrapClassName="afk-post-dialog" title="Forum: Tears of the Kingdom" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={[
          <Button key={1} type="primary" onClick={handleOk}>Save</Button>,
          <Button key={2} type="primary" onClick={handleOk}>Post</Button>,
        ]}>
        <Form form={form} className="afk-post-form" layout="vertical" autoComplete="off">
          <Form.Item name="title" label="Title">
            <Input className="titleInput" />
          </Form.Item>
          {/* <Form.Item name="hastag" className='postDialog-btns' label="HashTag">
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
          </Form.Item> */}
          <Form.Item name="imageList" label="Image & Video">
            <Uploader getFiles={getFileList}/>
          </Form.Item>
          <Form.Item name="textRender" label="Post Content">
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
})
export default PostDialog