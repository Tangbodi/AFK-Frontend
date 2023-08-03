import { Grade, 
         SendOutlined,
         GradeOutlined, 
         FavoriteRounded, 
         FavoriteBorderRounded, 
         ChatBubbleOutlineOutlined
} from '@mui/icons-material'
import './controls.less'
const ControlsComp = () => {
  return (
    <div className="afk-like-save">
      <div className="afk-like-save-item"><FavoriteBorderRounded/><FavoriteRounded/>Like</div>
      <div className="afk-like-save-item"><GradeOutlined/><Grade/>Save</div>
      <div className="afk-like-save-item"><ChatBubbleOutlineOutlined/>Reply</div>
      <div className="afk-like-save-item transform-1"><SendOutlined/>Share</div>
    </div>
  )
}
export default ControlsComp