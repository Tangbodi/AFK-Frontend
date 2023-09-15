import './news.less'

import { getNewsAPI } from '@/request/api'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { message } from "antd"
const NewsQuery = () => {
  const navigateTo = useNavigate()
  const [newsList, setNewsList] = useState([])
  const getNews = async() => {
    const getNewsRes = await getNewsAPI()
    if(getNewsRes.code === 200) {
      setNewsList(getNewsRes.data||[])
      return
    }
    message.warning(getNewsRes.message)
  }
  useEffect(() => {
    getNews()
  },[])
  return (
    <div className="afk-news-query">
      <div className="news-crumbs">News</div>
      <div className="news-list">
        {
          newsList.length > 0 &&
          newsList.map(news => {
            return (
              <div className="news-list-item" key={news.newsId}>
                <div className="news-list-item-top">
                  <div className="news-list-item-top-l" onClick={()=>{navigateTo(`/news/${news.newsId}`)}}>
                    LOGO {news.title}
                  </div>
                  <div className="news-list-item-top-r">
                    <span className='item-top-r-forum'>Forum</span>
                    <span className='item-top-r-Save'>Save</span>
                  </div>
                </div>
                <div className="news-list-item-content">
                  <div className="news-list-item-content-l">
                    <div className='item-top-l-slot'>
                      <div className='item-top-l-img'>
                        <img src={news.mediaContentUrl}/>
                      </div>
                    </div>
                  </div>
                  <div className="news-list-item-content-r">
                    <div className="news-list-item-content-r-title" onClick={()=>{navigateTo(`/news/${news.newsId}`)}}>{news.title}</div>
                    <div className="news-list-item-content-r-date">{news.pubDate} by <span>Blizzard Entertainment</span></div>
                    <div className="news-list-item-content-r-main">
                      {news.description}
                    </div>
                  </div>
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default NewsQuery