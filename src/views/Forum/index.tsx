import './forum.less'
import PostDialog from '../Modules/PostDialog'
import { Button, Avatar } from '@mui/material'
import { Grade, GradeOutlined } from '@mui/icons-material'
import { getAllPostOneGameAPI, gameInfoAPI } from '@/request/api'
import { useEffect, useState } from 'react'
import { message } from 'antd'
import { useSearchParams, useParams } from 'react-router-dom'
const Forum = () => {
  const { gameId } = useParams()
  const [posts, setPosts] = useState([])
  const [searchParams, setSearchParams] = useSearchParams()
  const [gameData, setGameData] = useState<GameData>({
    description: '',
    gameId: null,
    gameName: '',
    genreId: null,
    iconUrl: ''
  })
  const [pageSize, setPageSize] = useState(1)
  const [currentPage, setCurrentPage] = useState(1)
  const [prevDisabled, setPrevDisabled] = useState(false)
  const [nextDisabled, setNextDisabled] = useState(false)
  useEffect(()=>{
    gameInfo(searchParams.get('genreId'), gameId)
    getAllPostOneGame(searchParams.get('genreId'), gameId, 1, pageSize)
  },[])

  const onPrevious = () => {
    if(currentPage === 1) {
      setPrevDisabled(true)
      return
    }
  }
  const onPageChange = () => {

  }

  const gameInfo = async(genreId: string, gameId: string) => {
    const gameInfoRes = await gameInfoAPI({genreId, gameId})
    if(gameInfoRes.code === 200) {
      setGameData(gameInfoRes.data|| {})
      return
    }
    message.warning(gameInfoRes.message)
  }

  const getAllPostOneGame = async(genre: string, game: string, page: number, size: number  ) => {
    const gameBaseInfoRes = await getAllPostOneGameAPI({ genre, game, page, size })
    if(gameBaseInfoRes.code === 200) {
      setPosts(gameBaseInfoRes.data.content || [])
      return
    }
    message.warning(gameBaseInfoRes.message)
  }
  return (
    <div className="afk-forum">
      <div className="afk-forum-title">Forum</div>
      <div className="afk-forum-main">
        <div className="afk-forum-main-title">
          { gameData.gameName }
        </div>
        <div className="afk-forum-main-game">
          <div className="game-logo">
            <img src={`//${gameData.iconUrl}`} width={138} height={138}/>
          </div>
          <div className="game-detail">
            <div className="game-detail-title">
              <div className='game-detail-title-l'>{ gameData.gameName }</div>
              <div className='game-detail-title-r'><Grade style={{fontSize:'14px'}}/>Save</div>
              </div>
            <div className="game-detail-desc">
              { gameData.description }
            </div>
          </div>
          {/* <div className="game-controls">
            <Button className="game-controls-btn" variant="contained">Shop</Button>
            <Button className="game-controls-btn" variant="contained">More Detail</Button>
          </div> */}
        </div>
        <div className="afk-forum-guides">
          {/* <div className="afk-forum-guides-tabs">
            <Button className="guides-btn" variant="contained">Guides</Button>
            <Button className="guides-btn" variant="contained">News</Button>
            <Button className="guides-btn" variant="contained">Q&A</Button>
            <Button className="guides-btn" variant="contained">Reviews</Button>
            <Button className="guides-btn" variant="contained">Chat</Button>
          </div> */}
          <div className="afk-forum-guides-list">
            <div className='afk-forum-guides-list-th'>
              <div className="list-th-replies w70">REPLIES</div>
              <div className="list-th-topic w416">TOPIC</div>
              <div className="list-th-by w130">CREATED BY</div>
              {/* <div className="list-th-last w130">LAST POST</div> */}
            </div>
            {
              posts && posts.map((post, index) => {
                return (
                  <div className='afk-forum-guides-list-td fc' key={index}>
                    <div className="list-th-replies w70">4</div>
                    <div className="list-th-topic w416">{post.title}</div>
                    <div className="list-th-by w130 fw400">
                      <Avatar alt={post.username} src="/static/images/avatar/1.jpg" sx={{width:'32px', height:'32px'}} />{post.username}
                    </div>
                    {/* <div className="list-th-last w130 fw400">
                      <Avatar alt="Aosh7651" src="/static/images/avatar/1.jpg" sx={{width:'32px', height:'32px'}} />Aosh7651
                    </div> */}
                  </div>
                )
              })
            }
            {/* <div className='afk-forum-guides-list-td fc'>
              <div className="list-th-replies w70">4</div>
              <div className="list-th-topic w416">Why does Nintendo keep patching dupe methods?</div>
              <div className="list-th-by w130 fw400">
                <Avatar alt="Josh7651" src="/static/images/avatar/1.jpg" sx={{width:'32px', height:'32px'}} />Josh7651
              </div>
              <div className="list-th-last w130 fw400">
                <Avatar alt="Aosh7651" src="/static/images/avatar/1.jpg" sx={{width:'32px', height:'32px'}} />Aosh7651
              </div>
            </div> */}
          </div>
          <div className="afk-forum-guides-create">
            <div className="guides-create-btn">
              <Button className="default-btn w240" variant="contained">Create New Post</Button>
            </div>
            <div className="guides-pagination">
              <div className={prevDisabled?'page-btn prev-btn disabled':'page-btn prev-btn'} onClick={onPrevious}>
                <i/>Previous
              </div>
              <div className="current">2021</div>
              <div className={nextDisabled?'page-btn next-btn disabled':'page-btn next-btn'}>Next<i/></div>
            </div>
          </div>
        </div>
      </div>
      <PostDialog/>
    </div>
  )
}
export default Forum