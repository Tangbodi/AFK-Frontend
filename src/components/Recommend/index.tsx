import './recommend.less'
import { message } from 'antd'
import { useEffect, useState, SyntheticEvent, forwardRef, useRef } from 'react'
import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import Banner from '../Banner'
import { useNavigate } from 'react-router-dom'
import { homeMergedAPI } from '@/request/api'
import { homeTabsList } from '@/config'
type Props = {
  newsData: any
}
const Recommend: React.FC<Props> = forwardRef((props, _) => {
  const [currentTabValue, setCurrentTabValue] = useState('latest')
  const [postsList, setPostsList] = useState([])
  const navigateTo = useNavigate()
  const bannerRef = useRef(null)
  const { newsData } = props
  useEffect(()=>{
    newsData && handleChange(null, currentTabValue) // 默认加载第一个tab
    newsData && bannerRef.current.getData(newsData.content)
  },[newsData])
  // tab切换change触发
  const handleChange = (_: SyntheticEvent, type = currentTabValue) => {
    setCurrentTabValue(type)
    homeMerged(type)
  }
  // 路由跳转
  const goToRouter = ({postId, genreId, gameId}) => {
    navigateTo(`/topic/${postId}?genre=${genreId}&game=${gameId}`)
  }
  // 首页tabs接口
  const homeMerged = async(type: string) => {
    const homeMergedRes = await homeMergedAPI({type})
    setPostsList([])
    if(homeMergedRes.code === 200) {
      setPostsList(homeMergedRes.data||[])
      return
    }
    message.warning(homeMergedRes.message)
  }
  return (
    <div className="afk-recommend">
      <div className="afk-recommend-left">
        <Banner ref={bannerRef}/>
      </div>
      <div className="afk-recommend-right">
        <Box sx={{ width: '100%'}}>
          <TabContext value={currentTabValue}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={handleChange}>
                { homeTabsList.map(tab => (<Tab label={tab.label} value={tab.value} key={tab.value} />)) }
              </TabList>
            </Box>
            {
              homeTabsList.map(tab =>(
                <TabPanel value={tab.value} key={tab.value}>
                  {
                    postsList.map((postsItem, index) => {
                      return (
                        <div className='tab-panel-item' key={index} onClick={()=>{goToRouter(postsItem)}}>
                          <p>{postsItem.title || postsItem.content}</p>
                          <span>{postsItem.gameName}</span>
                        </div>
                      )
                    })
                  }
                </TabPanel>
              ))
            }
          </TabContext>
        </Box>
      </div>
    </div>
  )
})
export default Recommend