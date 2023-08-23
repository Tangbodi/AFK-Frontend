import type { UploadProps } from 'antd'
import { Upload, Button } from 'antd'
import './uploader.less'
const { Dragger } = Upload
const Uploader = (_props) => {
  const { getFiles } = _props
  const props: UploadProps = {
    multiple: true,
    beforeUpload() {
      return false // 阻止默认上传
    },
    onChange(info) {
      const { status } = info.file;
      if (status !== 'uploading') {
        getFiles(info.fileList) // 告知父组件需要上传的文件流对象
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