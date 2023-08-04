import type { UploadProps } from 'antd'
import { message, Upload, Button } from 'antd'
import './uploader.less'
const { Dragger } = Upload

const props: UploadProps = {
  name: 'file',
  multiple: true,
  action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  onChange(info) {
    const { status } = info.file;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`)
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`)
    }
  },
  onDrop(e) {
    console.log('Dropped files', e.dataTransfer.files)
  },
};

const Uploader = () => (
  <Dragger {...props} className='dragger-upload'>
    <p className='uploader-hint'>
      Drag and drop image or <Button type="primary">Upload</Button>
    </p>
  </Dragger>
);

export default Uploader