import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import usa from '@/assets/images/usa.png'
import { useEffect, useState } from 'react'
import { getUserInfoAPI, updateEmailAPI, getMailAddressAPI, updateMailAddressAPI } from '@/request/api'
import { message, Form, Input } from 'antd'
import EditIcon from '@mui/icons-material/Edit'
import './myInfo.less'

const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not a valid email!'
  }
};
const MyInfo = () => {
  const [form] = Form.useForm()
  const [localtionForm] = Form.useForm()
  const [avatarUrl, setAvatarUrl] = useState(null)
  const [userName, setUserName] = useState(null)
  const [email, setEmail] = useState('')
  const [disabled, setDisabled] = useState(false)
  const [infoEdit, setInfoEdit] = useState(false)
  const [locationEdit, setLocationEdit] = useState(false)
  const [address, setAddress] = useState()
  const [city, setCity] = useState()
  const [country, setCountry] = useState()
  const [sstate, setSstate] = useState()
  const [phone, setPhone] = useState()
  const [zip, setZip] = useState()
  const saveChanges = async() => {
    const values = await form.validateFields()
    setDisabled(true)
    delete values.username
    const updateEmailRes = await updateEmailAPI(values)
    if(updateEmailRes.code === 200) {
      message.success("submit success!")
      return
    }
    message.warning(updateEmailRes.message)
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
      setEmail(data.email)
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

  const getMailAddress = async() => {
    const getMailAddressRes = await getMailAddressAPI()
    if(getMailAddressRes.code === 200) {
      const data = getMailAddressRes.data || {}
      setAddress(data.address)
      setCity(data.city)
      setCountry(data.country)
      setSstate(data.state)
      setPhone(data.phone)
      setZip(data.zip)
      localtionForm.setFieldsValue({
        address: data.address,
        city: data.city,
        state: data.state,
        zip: data.zip,
        phone: data.phone
      })
    }
  }

  const updateMailAddress = async() => {
    const params = await localtionForm.validateFields()
    const updateMailAddressRes = await updateMailAddressAPI(params)
    if(updateMailAddressRes.code === 200) {
      message.success('update success')
      locationEditHandle()
      return
    }
    message.warning(updateMailAddressRes.message)
  }
  useEffect(() => {
    getUserInfo()
    getMailAddress()
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
        <Form form={form} layout="vertical" autoComplete="off" validateMessages={validateMessages}>
          <Form.Item label="Username" name="username" >
            { infoEdit ? <Input className='info-input' disabled allowClear /> : <div className="info-noedit">{userName}</div> }
          </Form.Item>
          <Form.Item label="Email" name="email" rules={[{ type: 'email', required: true }]}>
            { infoEdit ? <Input className='info-input' allowClear  /> :<div className="info-noedit">{email}</div> }      
          </Form.Item>
          {/* <Form.Item label="Password" name="password" >
            { infoEdit ? <Input.Password className='info-input' allowClear  /> :<div className="info-noedit">aaa****bbb</div> }    
          </Form.Item> */}
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
            <div className='location-preview-title'>Address</div>
            <div className='location-preview-desc'>{address}</div>
            <div className='location-preview-desc'>{city}, {sstate} {zip}</div>
            <div className='location-preview-desc'>{country}</div>
            <div className='location-preview-title'>Phone</div>
            <div className='location-preview-desc'>+1 {phone}</div>
          </div>
          :
          <Form form={localtionForm} layout="vertical" autoComplete="off">
            <Form.Item label="Street Address" name="address" >
              <Input className='info-input' allowClear placeholder="Street Address" />
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
            <Form.Item label="Phone">
              <div className='phone-box'>
                <div className='phone-box-l'>
                  <img src={usa} width={26} height={13}/>
                </div>
                <div className='phone-box-c'>+1</div>
                <div className='phone-box-r'>
                  <Form.Item name="phone" >
                    <Input className='info-input-mobile' allowClear placeholder="Input Phone Number" />
                  </Form.Item>
                </div>
              </div>
            </Form.Item>
            <div className="afk-user-form-submit">
              <Button className="afk-user-avatar-btn afk-user-avatar-cancel" variant="outlined" onClick={locationEditHandle}>Cancel</Button>
              <Button className="afk-user-avatar-btn afk-user-avatar-save" variant="contained" disabled={disabled} onClick={updateMailAddress}>Save Changes</Button>
            </div>
          </Form>
        }
        
        
      </div>
    </div>
  )
}
export default MyInfo