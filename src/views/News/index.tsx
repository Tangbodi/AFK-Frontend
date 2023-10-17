import './news.less'
import InfiniteScroll from 'react-infinite-scroll-component'
import { getNewsAPI, likeSavePostAPI } from '@/request/api'
import VerticalAlignTopRoundedIcon from '@mui/icons-material/VerticalAlignTopRounded';
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { message, Divider } from "antd"
import { getScrollTop } from '@/utils/utils'
import { PeopleOutline, GradeOutlined, Grade } from '@mui/icons-material'
const NewsQuery = () => {
  const navigateTo = useNavigate()
  let [page, setPage] = useState(1) 
  const [backBtnShow, setBackBtnShow] = useState(false)
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
      setPage(page + 1)
      return
    }
    message.warning(getNewsRes.message)
  }

  const saveGames = async(news, index) => {
    const status = news.isSaved ? 0 : 1
    const saveGamesRes = await likeSavePostAPI({ typeId: 4, objectId: news.gameId, status })
    if(saveGamesRes.code === 200) {
      news.isSaved = !news.isSaved
      newsList.splice(index, 1, news)
      setNewsList([...newsList])
      return
    }
    message.warning(saveGamesRes.message)
  }

  const handleScroll = () => {
    getScrollTop() > 100 ? setBackBtnShow(true): setBackBtnShow(false)
  }

  const backTop = () => {
    let timer: any = 0
    clearInterval(timer);
    timer = setInterval(function () {
      if (window.pageYOffset !== 0) {
        window.scroll(0, Math.max(window.pageYOffset - 50, 0));
      } else {
        clearInterval(timer);
      }
    }, 10)
  }
  useEffect(() => {
    window.addEventListener("scroll", handleScroll)
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
          newsList.map((news, index) => {
            return (
              <div className="news-list-item" key={news.newsId}>
                <div className="news-list-item-top">
                  <div className="news-list-item-top-l" onClick={()=>{navigateTo(`/forum/${news.gameId}?genreId=${news.genreId}&c=1`)}}>
                    <img src={news.gameIconUrl} width={48} height={48}/> {news.gameName}
                  </div>
                  <div className="news-list-item-top-r">
                    <span className='item-top-r-forum' onClick={()=>{navigateTo(`/forum/${news.gameId}?genreId=${news.genreId}&c=1`)}}>
                      <PeopleOutline style={{fontSize:'18px'}}/>Forum
                    </span>
                    <span className='item-top-r-Save' onClick={()=>{saveGames(news,index)}}>
                      { news.isSaved ? <Grade style={{fontSize:'14px'}}/> : <GradeOutlined style={{fontSize:'14px'}}/>}Save</span>
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
        { backBtnShow && <div className='news-back-top' onClick={backTop}>
            <VerticalAlignTopRoundedIcon/>
          </div>}
      </div>
      </InfiniteScroll>
    </div>
  )
}

export default NewsQuery