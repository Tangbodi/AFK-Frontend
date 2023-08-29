import { Grade, 
         SendOutlined,
         GradeOutlined, 
         FavoriteRounded, 
         FavoriteBorderRounded, 
         ChatBubbleOutlineOutlined
} from '@mui/icons-material'
import { Input, Button } from 'antd'
import './controls.less'
const ControlsComp = () => {
  const { TextArea } = Input
  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    console.log('Change:', e.target.value);
  }
  return (
    <div className='afk-like-wrap'>
      <div className="afk-like-save">
        <div className="afk-like-save-item"><FavoriteBorderRounded/><FavoriteRounded/>Like</div>
        <div className="afk-like-save-item"><GradeOutlined/><Grade/>Save</div>
        <div className="afk-like-save-item"><ChatBubbleOutlineOutlined/>Reply</div>
        <div className="afk-like-save-item transform-1"><SendOutlined/>Share</div>
      </div>
      <div className='afk-like-input'>
        <div className='afk-like-input-area'>
          <TextArea
            maxLength={100}
            style={{ height: 220, resize: 'none' }}
            onChange={onChange}
            placeholder="Please input"
          />
        </div>
        <div className='afk-like-input-btn'>
          <Button type="primary">Comment</Button>
        </div>
      </div>
    </div>
  )
}
export default ControlsComp