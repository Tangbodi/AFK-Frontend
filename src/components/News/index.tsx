
import { useNavigate } from 'react-router-dom'
import { useEffect, useState, forwardRef } from "react"
// import { message } from "antd"
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

  const showMoreHandle = () => {
    setShowList(newsData)
    setShowMore(false)
  }

  const getNews = () => {
    if(newsData && newsData.length >3) {
      setShowMore(true)
      setShowList(newsData.slice(0,3))
    } else {
      setShowMore(false)
      setShowList(newsData)
    }
    // const getNewsRes = await getNewsAPI()
    // if(getNewsRes.code === 200) {
    //   if(getNewsRes.data && getNewsRes.data.length > 3) {
    //     setShowMore(true)
    //     setShowList(getNewsRes.data.slice(0,3))
    //   } else {
    //     setShowMore(false)
    //     setShowList(getNewsRes.data)
    //   }
    //   setNewsList(getNewsRes.data||[])
    //   return
    // }
    // message.warning(getNewsRes.message)
  }
  return (
    <div className="afk-news mt20">
      <div className="afk-home-title">News</div>
      <div className="afk-news-list">
        {
          showList.map((news, index)=> {
            return (
              <div className="afk-news-list-item" key={index} onClick={()=>{navigateTo(`/news/1`)}}>
                <div className="list-item-left">
                  <div className='list-item-left-main'>
                    <div className='list-item-left-slot'>
                      <img src={news.mediaContentUrl}/>
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
          <div className="afk-news-more" onClick={showMoreHandle}>
            &gt;&gt; More News
          </div>
        }
        
      </div>
      
    </div>
  )
})
export default News