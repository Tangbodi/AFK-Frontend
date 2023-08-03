import { Avatar, Button } from '@mui/material'
import Banner from '@/components/Banner'
import Controls from '@/components/Controls'
import Stepper from '@/components/Stepper'
import './topic.less'

const Topic = () => {
  return (
    <div className="afk-topic">
      <div className="afk-topic-title">Forum - Tears of the Kingdom</div>
      <div className="afk-topic-main">
        <div className="afk-topic-main-title">
          <span className="main-title-tag">Q&A</span>
          <div className="main-title-text">
            Why does Nintendo keep patching dupe methods?
          </div>
        </div>
        <div className='afk-top-main-content'>
          <div className="main-content-title">
            <div className="content-title-left">
              <Avatar alt="Josh7651" src="/static/images/avatar/1.jpg" sx={{width:'48px', height:'48px'}}/>Ella0983
            </div>
            <div className="content-title-right">
              July 7, 2023
            </div>
          </div>
          <div className="main-content-banner">
            <Banner/>
          </div>
          <div className="main-content-detail">
            <div className="main-content-desc">
              Lorem ipsum dolor sit amet consectetur adipiscing elit tortor eu dolorol egestas morbi sem vulputate etiam facilisis pellentesque ut quis Lorem ipsum dolor sit Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet.
            </div>
            <div className="main-content-controls">
              <div className='controls-left'>
                <Controls/>
              </div>
              <div className='controls-right'>
                <Button className="custome-btn controls-btn" variant="contained">Comment</Button>
              </div>
            </div>
          </div>
          <div className='afk-top-main-content-item'>
              <div className="main-content-title">
                <div className="content-title-left">
                  <Avatar alt="Josh7651" src="/static/images/avatar/1.jpg" sx={{width:'48px', height:'48px'}}/>Ella0983
                </div>
                <div className="content-title-right">
                  July 7, 2023
                </div>
              </div>
              <div className="main-content-detail">
                <div className="main-content-desc">
                  Lorem ipsum dolor sit amet consectetur adipiscing elit tortor eu dolorol egestas morbi sem vulputate etiam facilisis pellentesque ut quis Lorem ipsum dolor sit Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet.
                </div>
                <div className="main-content-controls comment-type">
                  <Controls/>
                </div>
                <div>
                  <Stepper/>
                </div>
              </div>
          </div>
          <div className='afk-top-main-content-item'>
              <div className="main-content-title">
                <div className="content-title-left">
                  <Avatar alt="Josh7651" src="/static/images/avatar/1.jpg" sx={{width:'48px', height:'48px'}}/>Ella0983
                </div>
                <div className="content-title-right">
                  July 7, 2023
                </div>
              </div>
              <div className="main-content-detail">
                <div className="main-content-desc">
                  Lorem ipsum dolor sit amet consectetur adipiscing elit tortor eu dolorol egestas morbi sem vulputate etiam facilisis pellentesque ut quis Lorem ipsum dolor sit Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet.
                </div>
                <div className="main-content-controls comment-type">
                  <Controls/>
                </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Topic