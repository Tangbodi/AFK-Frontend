
import { useNavigate } from 'react-router-dom'
import { getNewsAPI } from '@/request/api'
import { useEffect, useState } from "react"
import { message } from "antd"
import Loading from '../Loading'
const News = () => {
  const navigateTo = useNavigate()
  const [newsList, setNewsList] = useState([])
  const [showList, setShowList] = useState([])
  const [showMore, setShowMore] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  useEffect(() => {
    getNews()
  },[])

  const showMoreHandle = () => {
    setShowList(newsList)
    setShowMore(false)
  }

  const getNews = async() => {
    setIsLoading(true)
    const getNewsRes = await getNewsAPI()
    if(getNewsRes.code === 200) {
      setIsLoading(false)
      if(getNewsRes.data && getNewsRes.data.length > 3) {
        setShowMore(true)
        setShowList(getNewsRes.data.slice(0,3))
      } else {
        setShowMore(false)
        setShowList(getNewsRes.data)
      }
      setNewsList(getNewsRes.data||[])
      return
    }
    message.warning(getNewsRes.message)
  }
  return (
    <div className="afk-news mt20">
      <div className="afk-home-title">News</div>
      <div className="afk-news-list">
        { isLoading && <Loading/> }
        {
          showList.map((news, index)=> {
            return (
              <div className="afk-news-list-item" key={index} onClick={()=>{navigateTo(`/news/1`)}}>
                <div className="list-item-left">
                  <img src={news.mediaContentUrl}/>
                </div>
                <div className="list-item-right">
                  <div className="list-item-right-title">{news.title}</div>
                  <div className="list-item-right-desc">{news.description}</div>
                  {/* <div className="list-item-right-tag">Baldur's Gate 3</div> */}
                </div>
              </div>
            )
          })
        }
        {
          showMore && 
          <div className="afk-news-more" onClick={showMoreHandle}>
            &gt;&gt; More News
          </div>
        }
        
      </div>
      
    </div>
  )
}
export default News