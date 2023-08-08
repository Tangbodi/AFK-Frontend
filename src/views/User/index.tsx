import Button from '@mui/material/Button'
import './user.less'
const User = () => {
  return (
    <div className="afk-user">
      <div className="afk-user-sidebar">
        <ul>
          <li className="active">Account</li>
          <li>Notifications</li>
          <li>Activities</li>
          <li>Privacy and Security</li>
        </ul>
        <div className='afk-logout'>
          <Button className="default-btn w218" variant="contained">Log out</Button>
        </div>
      </div>
      <div className="afk-user-content">
        <div className="afk-user-content-account">
          <div className="afk-user-avatar">
            <div className="afk-user-avatar-left"></div>
            <Button className="afk-user-avatar-right" variant="contained">Change Avatar</Button>
          </div>
          <div className="afk-user-form">
            <div className="afk-user-form-item">
              <div className="form-item-title">Username</div>
              <div className="form-item-input">
                <input/>
              </div>
            </div>
            <div className="afk-user-form-item">
              <div className="form-item-title">Email</div>
              <div className="form-item-input">
                <input/>
              </div>
            </div>
            <div className="afk-user-form-item">
              <div className="form-item-title">Password</div>
              <div className="form-item-input">
                <input/>
              </div>
            </div>
            <div className="afk-user-form-submit">
              <Button className="afk-user-avatar-right" variant="contained">Save Changes</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default User