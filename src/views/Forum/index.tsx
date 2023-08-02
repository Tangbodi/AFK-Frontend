import cyberpunk from '@/assets/images/cyberpunk.png'
import { Button, Avatar } from '@mui/material'
import './forum.less'
const Forum = () => {
  return (
    <div className="afk-forum">
      <div className="afk-forum-title">Forum</div>
      <div className="afk-forum-main">
        <div className="afk-forum-main-title">
          Tears of the Kingdom
        </div>
        <div className="afk-forum-main-game">
          <div className="game-logo">
            <img src={cyberpunk} width={138} height={138}/>
          </div>
          <div className="game-detail">
            <div className="game-detail-title">Tears of the Kingdom</div>
            <div className="game-detail-desc">
            Lorem ipsum dolor sit amet consectetur adipiscing elit tortor eu dolorol egestas morbi sem vulputate etiam facilisis pellentesque ut quis Lorem ipsum dolor sit Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet ...
            </div>
          </div>
          <div className="game-controls">
            <Button className="game-controls-btn" variant="contained">Shop</Button>
            <Button className="game-controls-btn" variant="contained">More Detail</Button>
          </div>
        </div>
        <div className="afk-forum-guides">
          <div className="afk-forum-guides-tabs">
            <Button className="guides-btn" variant="contained">Guides</Button>
            <Button className="guides-btn" variant="contained">News</Button>
            <Button className="guides-btn" variant="contained">Q&A</Button>
            <Button className="guides-btn" variant="contained">Reviews</Button>
            <Button className="guides-btn" variant="contained">Chat</Button>
          </div>
          <div className="afk-forum-guides-list">
            <div className='afk-forum-guides-list-th'>
              <div className="list-th-replies w70">REPLIES</div>
              <div className="list-th-topic w416">TOPIC</div>
              <div className="list-th-by w130">CREATED BY</div>
              <div className="list-th-last w130">LAST POST</div>
            </div>
            <div className='afk-forum-guides-list-td fc'>
              <div className="list-th-replies w70">4</div>
              <div className="list-th-topic w416">Why does Nintendo keep patching dupe methods?</div>
              <div className="list-th-by w130 fw400">
                <Avatar alt="Josh7651" src="/static/images/avatar/1.jpg" sx={{width:'32px', height:'32px'}} />Josh7651
              </div>
              <div className="list-th-last w130 fw400">
                <Avatar alt="Aosh7651" src="/static/images/avatar/1.jpg" sx={{width:'32px', height:'32px'}} />Aosh7651
              </div>
            </div>
            <div className='afk-forum-guides-list-td fc'>
              <div className="list-th-replies w70 warn">20</div>
              <div className="list-th-topic w416">Why does Nintendo keep patching dupe methods?</div>
              <div className="list-th-by w130 fw400">Josh7651</div>
              <div className="list-th-last w130 fw400">Josh7651</div>
            </div>
          </div>
          <div className="afk-forum-guides-create">
            <div className="guides-create-btn">
              <Button className="default-btn w240" variant="contained">Create New Post</Button>
            </div>
            <div className="guides-pagination">
              <div className="page-btn prev-btn disabled">
                <i/>Previous
              </div>
              <div className="current">2021</div>
              <div className="page-btn next-btn">Next<i/></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Forum