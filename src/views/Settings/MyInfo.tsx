import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import { useEffect, useState } from 'react'
import { getUserInfoAPI } from '@/request/api'
import { message, Form, Input } from 'antd'
const MyInfo = () => {
  const [form] = Form.useForm()
  const [avatarUrl, setAvatarUrl] = useState(null)
  const [userName, setUserName] = useState(null)
  const [disabled, setDisabled] = useState(false)

  const saveChanges = async() => {
    const values = await form.validateFields()
    setDisabled(true)
  }

  const getUserInfo = async() => {
    const userInfoRes = await getUserInfoAPI()
    if(userInfoRes.code === 200) {
      const data = userInfoRes.data || {}
      setUserName(data.username)
      setAvatarUrl(data.avatar_url)
      form.setFieldsValue({
        username: data.username,
        email: data.email
      })
      return
    }
    message.warning(userInfoRes.message)
  }

  useEffect(() => {
    // getUserInfo()
  })
  return (
    <div className="afk-user-content-account">
      <div className="afk-user-avatar">
        <Avatar className="afk-user-avatar-left" alt={userName} src={avatarUrl}/>
        <Button className="afk-user-avatar-right" variant="contained">Change Avatar</Button>
      </div>
      <div className="afk-user-form">
        <Form form={form} layout="vertical" autoComplete="off">
          <Form.Item label="Username" name="username" >
            <Input className='info-input' allowClear />
          </Form.Item>
          <Form.Item label="Email" name="email" >
            <Input className='info-input' allowClear  />
          </Form.Item>
          <Form.Item label="Password" name="password" >
            <Input.Password className='info-input' allowClear  />
          </Form.Item>
          <div className="afk-user-form-submit">
            <Button className="afk-user-avatar-right" variant="contained" disabled={disabled} onClick={saveChanges}>Save Changes</Button>
          </div>
        </Form>
      </div>
    </div>
  )
}
export default MyInfo