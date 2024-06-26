import { useState, useImperativeHandle, forwardRef, useRef } from 'react'
import { Button, Modal, Form, Input, message } from 'antd'
import { useSearchParams, useParams } from 'react-router-dom'
import { Editor } from '@tinymce/tinymce-react'
import Uploader from '@/components/Uploader'
import { savePostAPI } from '@/request/api'
import './postDialog.less'
type Props = {
  title: string,
  ref: any,
  reload: Function
}
const PostDialog: React.FC<Props> = forwardRef((props, ref) => {
  let imageIdList = []
  const { title, reload } = props
  const editorRef = useRef(null)
  const [textRender, setTextRender] = useState('');
  const { gameId } = useParams()
  const [form] = Form.useForm()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [searchParams] = useSearchParams()
  const [editorKey, setEditorKey] = useState(4)
  
  useImperativeHandle(ref, () => ({
    showModal
  }))

  const showModal = () => {
    setIsModalOpen(true)
  }

  const clearEditor = () => {
    const newKey = editorKey * 43
    setEditorKey(newKey)
    setTextRender('')
  }
  const handleOk = async() => {
    const values = await form.validateFields()

    if(!values.title) {
      message.warning("Please enter post title")
      return
    }
    if(!textRender) {
      message.warning("Please enter post content")
      return
    }
    if(imageIdList.length) {
      let postImageNameList = []
      imageIdList.forEach(image => {
        postImageNameList.push(image.url)
      })
      values.postImageNameList = postImageNameList
    }
    if(!values.postImageNameList) values.postImageNameList = []
    const savePostRes = await savePostAPI(Object.assign({}, values, { textRender, genreId: searchParams.get('genreId'), gameId }))
    if(savePostRes.code === 200) {
      if(savePostRes.data && savePostRes.data.postId) {
        message.success("save success")
        setIsModalOpen(false)
        form.resetFields()
        clearEditor()
        reload()
      }
      return
    }
    message.warning(savePostRes.message)
  }

  const handleCancel = () => {
    form.resetFields()
    clearEditor()
    setIsModalOpen(false)
  }

  const getFileList = (imageObj: any) => {
    imageIdList.push(imageObj)
  }

  const removeImage = (uid: string) => {
    imageIdList = imageIdList.filter(image => image.uid !== uid)
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
          <div className='afk-editor-wrap'>
            <div className='afk-editor-title'>Post Content</div>
            <div className='afk-editor-detail'>
              <Editor
                key={editorKey}
                apiKey='sn5ytycr1mo04zyd7qmgf69k1xqv3choi63zrsy2bpksdvtv'
                onInit={(_evt, editor) => editorRef.current = editor}
                tinymceScriptSrc={'/tinymce/tinymce.min.js'}
                initialValue={''}
                onEditorChange={(newValue) => setTextRender(newValue)}
                init={{
                  height: 200,
                  width: '100%',
                  menubar: false,
                  plugins: [
                    'advlist', 'lists', 'charmap', 'preview',
                    'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen', 'emoticons',
                    'insertdatetime', 'table', 'code', 'help', 'wordcount'
                  ],
                  toolbar: 'undo redo | styles ' +
                    'bold italic underline forecolor | alignleft aligncenter ' +
                    'alignright alignjustify | bullist numlist outdent indent | ' +
                    'removeformat | help' +
                    'code | emoticons | preview ',
                  statusbar: false,
                  content_style: 'body { background-color: #fff; }'
                }}
              />
            </div>
          </div>
          <Form.Item name="postImageNameList" label="Image & Video">
            <Uploader getFiles={getFileList} removeImage={removeImage}/>
          </Form.Item>
        </Form>
      </Modal>
      
  )
})
export default PostDialog