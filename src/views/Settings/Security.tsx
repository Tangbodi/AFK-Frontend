import './security.less'
import EditIcon from '@mui/icons-material/Edit'
import CheckCircleSharpIcon from '@mui/icons-material/CheckCircleSharp'
import ChangePassword from '../Modules/ChangePassword'
import { useRef } from 'react'
const Security = () => {
  const ChangePasswordRef = useRef(null)
  const EditHandle = () => {
    ChangePasswordRef.current.showModal()
  }
  return (
    <>
     <div className="afk-security">
        <div className="security-card">
          <div className="security-title">Authentication options</div>
          <div className="security-password">
            <div className='security-password-left'>Password</div>
            <div className='security-password-right' onClick={EditHandle}><EditIcon style={{fontSize:'22px'}}/></div>
          </div>
          <div className='security-passwordstatus'>
            <CheckCircleSharpIcon/><span>Password has been set</span>
          </div>
        </div>
     </div>
     <ChangePassword ref={ChangePasswordRef}/>
     </>
  )
}
export default Security