
import { useNavigate } from 'react-router-dom'
import { useEffect, useState, forwardRef } from "react"
type Props = {
  newsData: any
}
const News: React.FC<Props> = forwardRef((props, ref) => {
  const navigateTo = useNavigate()
  const { newsData } = props
  const [showList, setShowList] = useState([])
  const [showMore, setShowMore] = useState(false)
  useEffect(() => {
    getNews()
  },[newsData])
  
  const getNews = async() => {
    const syncNewsData = await newsData
    if(syncNewsData) {
      if(syncNewsData.totalPages > 1) {
        setShowMore(true)
      } else {
        setShowMore(false)
      }
      setShowList(newsData.content)
    }
  }
  return (
    <div className="afk-news mt20">
      <div className="afk-home-title">News</div>
      <div className="afk-news-list">
        {
          showList && showList.map((news, index)=> {
            return (
              <div className="afk-news-list-item" key={index} onClick={()=>{navigateTo(`/news/${news.newsId}?gameId=${news.gameId}&genreId=${news.genreId}`)}}>
                <div className="list-item-left">
                  <div className='list-item-left-main'>
                    <div className='list-item-left-slot'>
                      <img src={news.gameIconUrl}/>
                    </div>
                  </div>
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
          <div className="afk-news-more" onClick={()=>{navigateTo('/news')}}>
            &gt;&gt; More News
          </div>
        }
        
      </div>
      
    </div>
  )
})
export default News