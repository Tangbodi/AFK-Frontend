import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import usa from '@/assets/images/usa.png'
import { useEffect, useState } from 'react'
import { getUserInfoAPI } from '@/request/api'
import { message, Form, Input, Select, Space } from 'antd'
import EditIcon from '@mui/icons-material/Edit'
import './myInfo.less'

const { Option } = Select

const MyInfo = () => {
  const [form] = Form.useForm()
  const [avatarUrl, setAvatarUrl] = useState(null)
  const [userName, setUserName] = useState(null)
  const [disabled, setDisabled] = useState(false)
  const [infoEdit, setInfoEdit] = useState(false)
  const [locationEdit, setLocationEdit] = useState(false)

  const saveChanges = async() => {
    const values = await form.validateFields()
    setDisabled(true)
  }

  const infoEditHandle = () => {
    setInfoEdit(!infoEdit)
  }

  const locationEditHandle = () => {
    setLocationEdit(!locationEdit)
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
        {
          !infoEdit && 
          <div className="afk-user-form-edit" onClick={infoEditHandle}>
            <EditIcon style={{fontSize:'22px'}}/>
          </div>
        }
        <Form form={form} layout="vertical" autoComplete="off">
          <Form.Item label="Username" name="username" >
            { infoEdit ? <Input className='info-input' allowClear /> : <div className="info-noedit">yeshuangdong</div> }
          </Form.Item>
          <Form.Item label="Email" name="email" >
            { infoEdit ? <Input className='info-input' allowClear  /> :<div className="info-noedit">yeshuangdong@gmail.com</div> }      
          </Form.Item>
          <Form.Item label="Password" name="password" >
            { infoEdit ? <Input.Password className='info-input' allowClear  /> :<div className="info-noedit">aaa****bbb</div> }    
          </Form.Item>
          { infoEdit && 
            <div className="afk-user-form-submit">
              <Button className="afk-user-avatar-btn afk-user-avatar-cancel" variant="outlined" onClick={infoEditHandle}>Cancel</Button>
              <Button className="afk-user-avatar-btn afk-user-avatar-save" variant="contained" disabled={disabled} onClick={saveChanges}>Save Changes</Button>
            </div>
          }
        </Form>
      </div>
      <div className="afk-user-form">
        <div className="afk-user-form-location">
          <div className="afk-user-form-location-l">Location</div>
          <div className="afk-user-form-location-r" onClick={locationEditHandle}><EditIcon style={{fontSize:'22px'}}/></div>
        </div>
        {
          !locationEdit ?
          <div className='location-preview'>
            <div className='location-preview-title'>Time Zone</div>
            <div className='location-preview-desc'>UTC+08:00 Beijing, Chongqing, Urumqi</div>
            <div className='location-preview-title'>Address</div>
            <div className='location-preview-desc'>Lane 4293, Chuanzhou Road, Pudong New Area, Shanghai</div>
            <div className='location-preview-desc'>Shanghai, SH 225400</div>
            <div className='location-preview-desc'>China</div>
            <div className='location-preview-title'>Phone</div>
            <div className='location-preview-desc'>+86 13636553101</div>
          </div>
          :
          <Form form={form} layout="vertical" autoComplete="off">
            <Form.Item label="Time Zone" name="timezone" >
              <Input className='info-input' placeholder="Time Zone" allowClear />
            </Form.Item>
            <Form.Item label="Street Address" name="street" >
              <Input className='info-input' allowClear placeholder="Street Address" />
            </Form.Item>
            <Form.Item label="" name="street2" >
              <Input className='info-input' allowClear placeholder="Apt/Suite" />
            </Form.Item>
            <Form.Item label="City" name="city" >
              <Input className='info-input' allowClear placeholder="City" />
            </Form.Item>
            <Form.Item label="State/Province" name="state" >
              <Input className='info-input' allowClear placeholder="State/Province" />
            </Form.Item>
            <Form.Item label="ZIP/Postal code" name="zip" >
              <Input className='info-input' allowClear placeholder="ZIP/Postal code" />
            </Form.Item>
            <Form.Item label="Phone" name="zip" >
              <div className='phone-box'>
                <div className='phone-box-l'>
                  <img src={usa} width={26} height={13}/>
                </div>
                <div className='phone-box-c'>+1</div>
                <div className='phone-box-r'>
                  <Input style={{ width: '100%' }} placeholder="Input Phone Number" />
                </div>
              </div>
            </Form.Item>
            <div className="afk-user-form-submit">
              <Button className="afk-user-avatar-btn afk-user-avatar-cancel" variant="outlined" onClick={locationEditHandle}>Cancel</Button>
              <Button className="afk-user-avatar-btn afk-user-avatar-save" variant="contained" disabled={disabled} onClick={saveChanges}>Save Changes</Button>
            </div>
          </Form>
        }
        
        
      </div>
    </div>
  )
}
export default MyInfo