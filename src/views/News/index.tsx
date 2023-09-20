import './news.less'
import InfiniteScroll from 'react-infinite-scroll-component'
import { getNewsAPI } from '@/request/api'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { message, Divider } from "antd"
import { PeopleOutline, GradeOutlined } from '@mui/icons-material'
const NewsQuery = () => {
  const navigateTo = useNavigate()
  let [page, setPage] = useState(1) 
  const [newsList, setNewsList] = useState([])
  const [totalPages, setTotalPages] = useState(1)
  const getNews = async(haspage?:number) => {
    const params: any = {size: 10}
    params.page = haspage ? haspage : page
    const getNewsRes = await getNewsAPI(params)
    if(getNewsRes.code === 200) {
      const newsResData = getNewsRes.data || {}
      setNewsList(newsList.concat(newsResData.content))
      setTotalPages(newsResData.totalPages)
      page = page + 1
      setPage(page)
      return
    }
    message.warning(getNewsRes.message)
  }
  useEffect(() => {
    getNews(1)
  },[])
  return (
    <div className="afk-news-query">
      <div className="news-crumbs">News</div>
      <InfiniteScroll
        dataLength={newsList.length}
        next={getNews}
        hasMore={totalPages>=page}
        loader={false}
        endMessage={<Divider plain>It is all, nothing more</Divider>}
        scrollableTarget="scrollableDiv"
      >
      <div className="news-list">
        {
          newsList.length > 0 &&
          newsList.map(news => {
            return (
              <div className="news-list-item" key={news.newsId}>
                <div className="news-list-item-top">
                  <div className="news-list-item-top-l" onClick={()=>{navigateTo(`/news/${news.newsId}`)}}>
                    <img src={news.gameIconUrl} width={48} height={48}/> {news.gameName}
                  </div>
                  <div className="news-list-item-top-r">
                    <span className='item-top-r-forum'>
                      <PeopleOutline/>Forum
                    </span>
                    <span className='item-top-r-Save'><GradeOutlined/>Save</span>
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
                    <div className="news-list-item-content-r-title" onClick={()=>{navigateTo(`/news/${news.newsId}?gameId=${news.gameId}&genreId=${news.genreId}`)}}>{news.title}</div>
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
      </InfiniteScroll>
    </div>
  )
}

export default NewsQuery