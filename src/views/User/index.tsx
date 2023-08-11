import Button from '@mui/material/Button'
import Avatar from '@mui/material/Avatar'
import { useRef, useEffect, useState } from 'react'
import LogoutDialog from '@/components/LogoutDialog'
import { getUserInfoAPI } from '@/request/api'
import { message, Form, Input } from 'antd'
import './user.less'
const User = () => {
  const [form] = Form.useForm()
  const LogOutRef = useRef(null)
  const [avatarUrl, setAvatarUrl] = useState(null)
  const [userName, setUserName] = useState(null)
  const [disabled, setDisabled] = useState(false)
  
  const logOut = () => {
    LogOutRef.current.handleClickOpen()
  }

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
    <>
    <div className="afk-user">
      <div className="afk-user-sidebar">
        <ul>
          <li className="active">Account</li>
          <li>Notifications</li>
          <li>Activities</li>
          <li>Privacy and Security</li>
        </ul>
        <div className='afk-logout'>
          <Button className="default-btn w218" variant="contained" onClick={logOut}>Log out</Button>
        </div>
      </div>
      <div className="afk-user-content">
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
      </div>
    </div>
    <LogoutDialog ref={LogOutRef}/>
    </>
  )
}

export default User