import type { UploadProps } from 'antd'
import { Upload, Button, message } from 'antd'
import { savePostImageAPI } from '@/request/api'
import './uploader.less'
const { Dragger } = Upload
const Uploader = (_props) => {
  const { getFiles } = _props
  const handleSubmit = async(fileList) => {
    const formData = new FormData()
    formData.append('images', fileList[0].originFileObj)
    const savePostImageRes = await savePostImageAPI(formData)
    if(savePostImageRes.code === 200) {
      getFiles(savePostImageRes.data[0])
      return
    }
    message.warning(savePostImageRes.message)
  }
  const props: UploadProps = {
    multiple: false,
    maxCount: 9,
    beforeUpload() {
      return false
    },
    onChange(info) {
      const { status } = info.file
      if (status !== 'uploading') {
        handleSubmit(info.fileList.slice(-1))
        info.file.status = 'done'
      }
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files)
    },
  }
  return (
    <Dragger {...props} className='dragger-upload'>
      <p className='uploader-hint'>
        Drag and drop image or <Button type="primary">Upload</Button>
      </p>
    </Dragger>
  )
}

export default Uploader