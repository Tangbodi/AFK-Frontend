import { ChangeEvent, useEffect, useState } from 'react'
import { Input, Space, Button, message } from 'antd';
import { useNavigate } from 'react-router-dom'
import styles from './login.module.scss'
import getA from './inint'
import './login.less'

import { captchaAPI, loginAPI } from '@/request/api'
const View = () => {
  let navigateTo = useNavigate()
  // 加载完这个组件之后
  useEffect(() => {
    getCaptchaImg()
    getA()
  }, [])
  const [usernameVal, setUsernameVal] = useState("")
  const [passwordVal, setPasswordVal] = useState("")
  const [imgUrl, setImgUrl] = useState("")
  const usernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsernameVal(e.target.value)
  }
  const passwordChange = (e:ChangeEvent<HTMLInputElement>) => {
    setPasswordVal(e.target.value)
  }
  const gotoLogin = async () => {
    if(!usernameVal.trim() || !passwordVal.trim()){
      message.warning('请输入完整信息')
      return
    }
    const loginAPIRes = await loginAPI({
      password: passwordVal, 
      username: usernameVal, 
      code: '123',
      uuid: localStorage.getItem('uuid') as string
    })
    if(loginAPIRes.code === 200) {
      message.success('登录成功')
      localStorage.setItem('test-token', loginAPIRes.token)
      navigateTo("/page1")
      localStorage.removeItem("uuid")
    } else {
      message.success('登录成功')
      localStorage.setItem('test-token', loginAPIRes.token)
      navigateTo("/page1")
      localStorage.removeItem("uuid")
    }
  }
  // 获取验证码图片
  const getCaptchaImg = async () => {
    const captchaAPIres = await captchaAPI()
    if(captchaAPIres.code == 200) {
      setImgUrl(`data:image/gif;base64,${captchaAPIres.img}`)
      localStorage.setItem('uuid', captchaAPIres.uuid)
    }
  }
  return (
    <div className={styles.loginPage} style={{display:'block'}}>
      login
      <div className={styles.form + ' loginbox'}>
      <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
          <Input placeholder="User Name" onChange={usernameChange} />
          <Input.Password placeholder="input password" onChange={passwordChange} />
          <div className='captchabox' onClick={getCaptchaImg}>
            <img src={imgUrl} height="38"/>
          </div>
          <Button type="primary" block onClick={gotoLogin}>
            登录
          </Button>
      </Space>
      </div>
    </div>
  )
}

export default View