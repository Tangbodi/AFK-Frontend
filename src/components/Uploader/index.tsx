import type { UploadProps } from 'antd'
import { Upload, Button, message } from 'antd'
import { savePostImageAPI } from '@/request/api'
import './uploader.less'
const { Dragger } = Upload
const Uploader = (_props) => {
  const { getFiles } = _props
  let imgInfo = {}
  const handleSubmit = async(fileList) => {
    const formData = new FormData()
    // formData.append('images', fileList[0].originFileObj)
    formData.append('images', fileList)
    const savePostImageRes = await savePostImageAPI(formData)
    if(savePostImageRes.code === 200) {
      getFiles(savePostImageRes.data[0])
      return
    }
    message.warning(savePostImageRes.message)
  }
  const compressImg = (file) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = (ev) => {
      try {
        const img: any = new Image()
        img.src = ev.target.result
        img.onload = () => {
          let canvas = document.createElement('canvas')
          let context = canvas.getContext('2d')
          let imgWidth = img.width
          let imgHeight = img.height
          let targetWidth = imgWidth
          let targetHeight = imgHeight
          if(targetWidth > targetHeight) {
            let scale = targetHeight / 1280
             targetHeight = 1280
             targetWidth = targetWidth / scale
          } else {
            let scale2 = targetWidth / 1280
            targetWidth = 1280
            targetHeight = targetHeight / scale2
          }
          canvas.width = targetWidth
          canvas.height = targetHeight
          context.clearRect(0, 0, canvas.width, canvas.height)
          context.drawImage(img, 0, 0, canvas.width, canvas.height)
          let data = ""
          if(file.size <= 628288) {
            handleSubmit(file)
          } else {
            data = canvas.toDataURL("image/jpeg", 0.4)
            canvas.toBlob(
              blob => {
                Object.keys(imgInfo).forEach(i => {
                  blob[i] = imgInfo[i]
                })
                handleSubmit(blob)
              }
            ); 
          }
        }
        
      } catch(e){
        console.log(e)
      }
    }
  }
  const props: UploadProps = {
    multiple: false,
    maxCount: 9,
    beforeUpload(file) {
      const isJpgPng = file.type === 'image/jpeg' || file.type === 'image/png'
      if(!isJpgPng) {
        message.warning("Upload images in JPG/PNG format only!")
      } else {
        imgInfo['lastModified'] = file['lastModified']
        imgInfo['name'] = file['name']
        imgInfo['originSize'] = file['size']
        imgInfo['originType'] = file['type']
        compressImg(file)
      }
      return false
    },
    onChange(info) {
      const { status } = info.file
      if (status !== 'uploading') {
        // handleSubmit(info.fileList.slice(-1))
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