import { CircularProgress } from '@mui/material'
import './loading.less'
const Loading = () => {
  return (
    <div className='afk-loading'>
      <CircularProgress sx={{ color: '#ccc'}}/>
    </div>
  )
}

export default Loading