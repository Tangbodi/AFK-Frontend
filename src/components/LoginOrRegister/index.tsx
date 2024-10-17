import './register.less'
import { getTheme } from '@/utils/theme'
import { useDispatch } from 'react-redux'
import logo from '@/assets/images/login-logo.png'
import logoDark from '@/assets/images/login-logo-dark.png'
import { SITE_KEY } from '@/config'
import { Modal, Form, Input, Button, message } from 'antd'
import ClearRoundedIcon from '@mui/icons-material/ClearRounded'
import CheckRoundedIcon from '@mui/icons-material/CheckRounded'
import { useState, useImperativeHandle, forwardRef, createRef } from 'react'
import { registrationAPI, loginAPI, forgotPasswordAPI } from '@/request/api'
import ReCAPTCHA from "react-google-recaptcha"

type Props = {
  closeable: Function
}

const Register: React.FC<Props> = forwardRef((props, ref) => {
  const { closeable } = props
  const dispatch = useDispatch()
  const captchaRef = createRef()
  const [isModalOpen, setIsModalOpen] = useState(true)
  const [isLoginValue, setIsLoginValue] = useState(true)
  const [isForgot, setIsForgot] = useState(false)
  const [atLeast8, setAtLeast8] = useState(false)
  const [special, setSpecial] = useState(false)
  const [aNumber, setANumber] = useState(false)
  const [capital, setCapital] = useState(false)
  const [pmatch, setPmatch] = useState(false)
  const [form] = Form.useForm()
  useImperativeHandle(ref, () => ({
    showModal
  }))

  const showModal = (isLogin: boolean) => {
    setIsLoginValue(isLogin)
    setIsModalOpen(true)
  }
  const gotoLoginOrSinup = () => {
    setIsLoginValue(!isLoginValue)
  }
  const hanldeForgot = () => {
    setIsForgot(true)
  }
  const handleOk = () => {
    setIsModalOpen(false)
  }

  const handleCancel = () => {
    form.resetFields()
    setIsLoginValue(false)
    setIsForgot(false)
    setIsModalOpen(false)
    closeable(true)
    dispatch({type:'isLoginFiber', val: false})
  }

  const onSignUp = async() => {
    const regX = /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\\d]){1,})(?=(.*[\\W_]){1,})(?!.*\\s).{8,}$/
    const _captchaRef: any = captchaRef.current
    const response = _captchaRef.getValue()
    if (!response) {
      message.warning("Please click reCAPTCHA")
      return
    }
    const values = await form.validateFields()
    if(regX.test(values.password)) {
      message.warning('Invalid Password')
      return
    }
    if(values.password !== values.confirmPassword) {
      message.warning("The two entered passwords are inconsistent. Please check!")
      return
    }
    const registrationRes = await registrationAPI(values)
    if(registrationRes.code === 200) {
      message.success(registrationRes.data)
      setIsModalOpen(false)
      return
    }
    message.warning(registrationRes.message)
  }

  const onLogin = async() => {
    const _captchaRef: any = captchaRef.current
    const response = _captchaRef.getValue()
    if (!response) {
      message.warning("Please click reCAPTCHA")
      return
    }
    const values = await form.validateFields()
    const loginRes = await loginAPI(values)
    if(loginRes.code === 200) {
      message.success('Login successful')
      setIsModalOpen(false)
      sessionStorage.setItem('afk-username', loginRes.data.username)
      sessionStorage.setItem('afk-userid', loginRes.data.userId)
      sessionStorage.setItem('afk-avatarurl', loginRes.data.avatarUrl)
      sessionStorage.setItem('afk-jsessionid', loginRes.data.jsessionid)
      dispatch({type:"afkToken", val: loginRes.data.jsessionid})
      dispatch({type: 'isSavedForumFiber', val: Math.random()})
      form.resetFields()
      return
    }
    message.warning(loginRes.message)
  }

  const forgotPassword = async() => {
    const params = await form.validateFields()
    const emailRegx = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/
    if(!params.email) {
      message.warning('Please enter you email')
      return
    }
    if(!emailRegx.test(params.email)){
      message.warning('Email is invalid')
      return
    }
    const forgotPasswordRes = await forgotPasswordAPI(params)
    if(forgotPasswordRes.code === 200) {
      message.success(forgotPasswordRes.data)
      form.resetFields()
      return
    }
    message.warning(forgotPasswordRes.message)
  }

  return (
    <>
      <Modal width={440} maskClosable={false} wrapClassName="afk-login" footer={null} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <div className="afk-login-logo">
          { getTheme() === 'theme-light'? 
            <img src={logo} width={200} height={60}/>
            : <img src={logoDark} width={200} height={60}/>
          }
        </div>
        { isForgot &&
          <Form form={form}  className="afk-post-form" layout="vertical" autoComplete="off" scrollToFirstError>
            <Form.Item name="email" label="Email">
              <Input className="login-input" type="email" />
            </Form.Item>
            <div className="form-login">
              <Button type="primary" className="form-login-btn" onClick={forgotPassword}>Submit</Button>
            </div>
          </Form>
        }
        {
          !isLoginValue && !isForgot && <Form form={form}  className="afk-post-form" layout="vertical" autoComplete="off" scrollToFirstError>
          <Form.Item name="username" label="Username" rules={[{ required: true, message: 'Please enter your username!' }]}>
            <Input className="login-input" />
          </Form.Item>
          <Form.Item name="email" label="Email" rules={[{type: 'email',message: 'The input is not valid E-mail!'},{required: true,message: 'Please enter your E-mail!'}]}>
            <Input className="login-input"  />
          </Form.Item>
          <Form.Item name="password" label="Password" rules={[{ required: true, message: 'Please enter your password!' }, () => ({
            validator(_, value) {
              const specialCharaterRex = /[`~!@#$%^&*()_+<>?:"{},.\/;'[\]]/
              const oneNumberRex = /\d+/
              const capitalRex = /[A-Z]+/
              value.length >= 8 ? setAtLeast8(true) : setAtLeast8(false)
              specialCharaterRex.test(value) ? setSpecial(true) : setSpecial(false)
              oneNumberRex.test(value) ? setANumber(true) : setANumber(false)
              capitalRex.test(value) ? setCapital(true) : setCapital(false)

              // Ensure password meets all requirements
              if (value.length >= 8 && specialCharaterRex.test(value) && oneNumberRex.test(value) && capitalRex.test(value)) {
                return Promise.resolve();
              } else {
                return Promise.reject(new Error('Password does not meet the requirements'));
              }

            },
          })]}>
            <Input.Password className="login-input"  />
          </Form.Item>
          <Form.Item name="confirmPassword" label="Re-enter Password" rules={[{ required: true, message: 'Please re-enter your password!' },
          ({ getFieldValue }) => ({
             validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                setPmatch(true);
                return Promise.resolve();
              } else {
                setPmatch(false);
                return Promise.reject(new Error('The new password that you entered does not match!'));
              }
            },
          })]}>
            <Input.Password className="login-input"  />
          </Form.Item>
          <div className='form-password-tips'>
            <div className='form-password-tips-item'>
              {atLeast8 ? <CheckRoundedIcon style={{color: 'green'}}/> : <ClearRoundedIcon/>}<span>Password has at east 8 characters.</span>
            </div>
            <div className='form-password-tips-item'>
              {special ? <CheckRoundedIcon style={{color: 'green'}}/> : <ClearRoundedIcon/>}<span>Password has special characters.</span>
            </div>
            <div className='form-password-tips-item'>
              {aNumber ? <CheckRoundedIcon style={{color: 'green'}}/> : <ClearRoundedIcon/>}<span>Password has a number.</span>
            </div>
            <div className='form-password-tips-item'>
              {capital ? <CheckRoundedIcon style={{color: 'green'}}/> : <ClearRoundedIcon/>}<span>Password has a capital letter.</span>
            </div>
            <div className='form-password-tips-item'>
              {atLeast8 && special && aNumber && capital && pmatch ? <CheckRoundedIcon style={{color: 'green'}}/> : <ClearRoundedIcon/>}<span>Passwords match.</span>
            </div>
          </div>
          <div className="form-login">
            <ReCAPTCHA
              className="re-chaptcha"
              sitekey={SITE_KEY}
              ref={captchaRef}
            />
            <Button type="primary" className="form-login-btn" onClick={onSignUp}>Sign Up</Button>
          </div>
          <div className="sign-up" onClick={gotoLoginOrSinup}>Have an account? Log In</div>
        </Form> 
        }
        {
          isLoginValue && !isForgot &&
          <Form form={form} className="afk-post-form" layout="vertical" autoComplete="off" scrollToFirstError>
          <Form.Item name="username" label="Username"  rules={[{ required: true, message: 'Please enter your username!' }]}>
            <Input className="login-input" />
          </Form.Item>
          <Form.Item name="password" label="Password" rules={[{ required: true, message: 'Please enter your password!' }]}>
            <Input.Password className="login-input"  />
          </Form.Item>
          <div className="forget-password" onClick={hanldeForgot}>Forget password?</div>
          <div className="form-login">
            <ReCAPTCHA
              className="re-chaptcha"
              sitekey={SITE_KEY}
              ref={captchaRef}
            />
            <Button type="primary" className="form-login-btn" onClick={onLogin}>Log In</Button>
          </div>
          <div className="sign-up" onClick={gotoLoginOrSinup}>Don’t have an account? Sign up</div>
        </Form>
        }
      </Modal>
    </>
  )
})

export default Register