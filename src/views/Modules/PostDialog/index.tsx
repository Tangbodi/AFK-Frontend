import { useState, useImperativeHandle, forwardRef } from 'react'
import { Button, Modal, Form, Input, message } from 'antd'
import { useSearchParams, useParams } from 'react-router-dom'
import Uploader from '@/components/Uploader'
import { savePostAPI } from '@/request/api'
import './postDialog.less'
type Props = {
  title: string,
  ref: any
}
const PostDialog: React.FC<Props> = forwardRef((props, ref) => {
  const { TextArea } = Input
  const { title } = props
  const imageIdList = []
  const { gameId } = useParams()
  const [form] = Form.useForm()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [searchParams] = useSearchParams()
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
    if(!values.textRender){
      message.warning('Please input post content')
      return
    }
    // setIsModalOpen(false)
    if(imageIdList.length) {
      values.postImageNameList = imageIdList
    }
    const savePostRes = await savePostAPI(Object.assign({}, values, { genreId: searchParams.get('genreId'), gameId }))
    if(savePostRes.code === 200) {
      console.log('ass', savePostRes)
      if(savePostRes.data && savePostRes.data.postId) {
        message.success("save success")
        setIsModalOpen(false)
      }
      return
    }
    message.warning(savePostRes.message)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  const getFileList = (imageId: string) => {
    imageIdList.push(imageId)
  }

  return (
      <Modal width={860} wrapClassName="afk-post-dialog" title={`Forum: ${title}`} open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={[
          <Button key={1} onClick={handleCancel}>Cancel</Button>,
          <Button key={2} type="primary" onClick={handleOk}>Save</Button>,
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
          <Form.Item name="textRender" label="Post Content">
            <TextArea
              className="inputTextarea"
              maxLength={100}
              rows={5}
              style={{resize: 'none' }}
              placeholder="What are your thoughts?"
            />
          </Form.Item>
          <Form.Item name="postImageNameList" label="Image & Video">
            <Uploader getFiles={getFileList}/>
          </Form.Item>
        </Form>
      </Modal>
  )
})
export default PostDialog