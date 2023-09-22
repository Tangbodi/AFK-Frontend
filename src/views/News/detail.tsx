import './news.less'
import { getNewsDetailAPI, likeSavePostAPI } from '@/request/api'
import { message } from 'antd'
import { useEffect, useState } from 'react'
import { PeopleOutline, GradeOutlined, Grade } from '@mui/icons-material'
import { useSearchParams, useParams, useNavigate } from 'react-router-dom'
const NewsQuery = () => {
  const { newsId } = useParams()
  const navigateTo = useNavigate()
  const [searchParams] = useSearchParams()
  const [isSaved, setIsSaved] = useState(false)
  const [newsData, setNewsData]= useState<NewsDetail>()
  useEffect(() => {
    getNewsDetail()
  },[])

  const saveGames = async() => {
    const status = isSaved ? 0 : 1
    const saveGamesRes = await likeSavePostAPI({ typeId: 4, objectId: searchParams.get('gameId'), status })
    if(saveGamesRes.code === 200) {
      setIsSaved(!isSaved)
      return
    }
    message.warning(saveGamesRes.message)
  }

  const getNewsDetail = async() => {
    const params = {
      news: newsId,
      game: Number(searchParams.get('gameId')),
      genre: Number(searchParams.get('genreId'))
    }
    const getNewsDetailRes = await getNewsDetailAPI(params)
    if(getNewsDetailRes.code === 200) {
      setNewsData(getNewsDetailRes.data)
      return
    }
    message.warning(getNewsDetailRes.message)
  }
  return (
    <div className="afk-news-query">
      <div className="news-crumbs">News</div>
      {
        newsData && 
        <div className="news-list">
        <div className="news-list-item">
          <div className="news-list-item-top">
            <div className="news-list-item-top-l" onClick={()=>{navigateTo(`/forum/${newsData.gameId}?genreId=${newsData.genreId}&c=1`)}}>
              <img src={newsData.gameIconUrl} width={48} height={48}/> {newsData.gameName}
            </div>
            <div className="news-list-item-top-r">
              <span className='item-top-r-forum' onClick={()=>{navigateTo(`/forum/${newsData.gameId}?genreId=${newsData.genreId}&c=0`)}}>
                <PeopleOutline style={{fontSize:'18px'}}/>Forum
              </span>
              <span className='item-top-r-Save' onClick={saveGames}>
                { isSaved ? <Grade style={{fontSize:'16px'}}/> : <GradeOutlined style={{fontSize:'16px'}}/>}Save
              </span>
            </div>
          </div>
          <div className="news-list-item-detail">
            <div className='news-list-item-content-title'>{newsData.title}</div>
            <div className='news-list-item-content-time'>{newsData.pubDate} <span>{newsData.source}</span></div>
            <div className='news-list-item-content-main' dangerouslySetInnerHTML={{ __html: newsData.content}}></div>
            <div className='news-list-item-content-imgs'>
              <img src={newsData.mediaContentUrl} />
            </div>
          </div>
        </div>
      </div>
      }
    </div>
  )
}

export default NewsQuery