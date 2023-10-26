import { useState, useImperativeHandle, forwardRef } from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import { logoutAPI } from '@/request/api'
import { useNavigate } from 'react-router-dom'
import { message } from 'antd'
import { useDispatch } from 'react-redux'

const LogoutDialog = forwardRef((_, ref) => {
  const [open, setOpen] = useState(false)
  const [disabled, setDisabled] = useState(false)
  const naigateTo = useNavigate()
  const dispatch = useDispatch()
  useImperativeHandle(ref, () => ({
    handleClickOpen
  }))
  const handleClickOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }
  const handleConfirm = async () => {
    setDisabled(true)
    const logoutRes = await logoutAPI()
    if(logoutRes.code === 200) {
      setOpen(false)
      naigateTo('/')
      const uuid = sessionStorage.getItem('afk-uuid')
      sessionStorage.removeItem('afk-jsessionid')
      sessionStorage.removeItem('afk-userid')
      sessionStorage.removeItem('afk-username')
      sessionStorage.removeItem('afk-avatarurl')
      sessionStorage.removeItem('afk-uuid')
      sessionStorage.removeItem(uuid)
      dispatch({type:"afkToken", val: null})
      message.success(logoutRes.data)
    } else {
      message.warning(logoutRes.message)
    }
    setDisabled(false)
  }
  return (
    <Dialog
      className='afk-logout-confirm'
      open={open}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogContent>
        <DialogContentText>
          Confirm to log out of the current account?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button className='c-btn' autoFocus variant="outlined" onClick={handleClose}>
          Cancel
        </Button>
        <Button className='s-btn' onClick={handleConfirm}  variant="contained" autoFocus disabled={disabled}>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  )
})

export default LogoutDialog
  