import './forum.less'
import PostDialog from '../Modules/PostDialog'
import { Button, Avatar } from '@mui/material'
import { Grade, GradeOutlined } from '@mui/icons-material'
import { getAllPostOneGameAPI, gameInfoAPI, likeSavePostAPI } from '@/request/api'
import { useEffect, useState, useRef } from 'react'
import { message } from 'antd'
import { useSearchParams, useParams, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
const Forum = () => {
  const navigateTo = useNavigate()
  const { gameId } = useParams()
  const PostDialogRef = useRef(null)
  const [posts, setPosts] = useState([])
  const [searchParams] = useSearchParams()
  const [gameData, setGameData] = useState<GameData>({
    description: '',
    gameId: null,
    gameName: '',
    genreId: null,
    iconUrl: ''
  })
  
  const { savedForums } = useSelector((state: RootState) => ({
    savedForums: state.gobalStatus.savedForums
  }))
  const [isSaved, setIsSaved] = useState(false)
  const [pageSize, setPageSize] = useState(10)
  const [currentPage, setCurrentPage] = useState(1)
  const [prevDisabled, setPrevDisabled] = useState(true)
  const [nextDisabled, setNextDisabled] = useState(false)

  useEffect(()=>{ 
    savedForums && gameInfo(searchParams.get('genreId'), gameId)
    getAllPostOneGame(searchParams.get('genreId'), gameId, 1, pageSize)
  },[savedForums])

  const goToNext = (postId: string) => {
    navigateTo(`/topic/${postId}?genre=${searchParams.get('genreId')}&game=${gameId}`)
  }

  const onPrevious = () => {
    let _currentPage = currentPage
    _currentPage--
    getAllPostOneGame(searchParams.get('genreId'), gameId, _currentPage, pageSize)
  }

  const onNext = () => {
    let _currentPage = currentPage
    _currentPage++
    getAllPostOneGame(searchParams.get('genreId'), gameId, _currentPage, pageSize)
  }

  const gameInfo = async(genre: string, game: string) => {
    const gameInfoRes = await gameInfoAPI({genre, game})
    if(gameInfoRes.code === 200) {
      setGameData(gameInfoRes.data|| {})
      const gameName = gameInfoRes.data.gameName
      gameName && setIsSaved(savedForums.findIndex(save=>save.gameName === gameName) > -1)
      return
    }
    message.warning(gameInfoRes.message)
  }

  const getAllPostOneGame = async(genre: string, game: string, page: number, size: number  ) => {
    const gameBaseInfoRes = await getAllPostOneGameAPI({ genre, game, page, size })
    if(gameBaseInfoRes.code === 200) {
      setCurrentPage(page)
      if(page !== 1) {
        setPrevDisabled(false)
      } else {
        setPrevDisabled(true)
      }
      if(page >= gameBaseInfoRes.data.totalPages) {
        setNextDisabled(true)
      } else {
        setNextDisabled(false)
      }
      setPosts(gameBaseInfoRes.data.content || [])
      return
    }
    message.warning(gameBaseInfoRes.message)
  }
  const createNewPost = () => {
    PostDialogRef.current.showModal()
  }
  const saveGames = async() => {
    const status = isSaved ? 0 : 1
    const saveGamesRes = await likeSavePostAPI({ typeId: 4, objectId: gameId, status })
    if(saveGamesRes.code === 200) {
      setIsSaved(status === 0)
      return
    }
    message.warning(saveGamesRes.message)
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
            <img src={gameData.iconUrl} width={138} height={138}/>
          </div>
          <div className="game-detail">
            <div className="game-detail-title">
              <div className='game-detail-title-l'>{ gameData.gameName }</div>
              <div className='game-detail-title-r' onClick={saveGames}>
                {
                  isSaved ? <Grade style={{fontSize:'14px'}}/>
                  : <GradeOutlined style={{fontSize:'14px'}}/>
                }Save
                </div>
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
                    <div className="list-th-replies w70">{post.view}</div>
                    <div className="list-th-topic w416" onClick={()=>{goToNext(post.postId)}}>{post.title}</div>
                    <div className="list-th-by w130 fw400">
                      <Avatar alt={post.username}  sx={{width:'32px', height:'32px'}} />{post.username}
                    </div>
                  </div>
                )
              })
            }
          </div>
          <div className="afk-forum-guides-create">
            <div className="guides-create-btn">
              <Button className="default-btn w240" variant="contained" onClick={createNewPost}>Create New Post</Button>
            </div>
            <div className="guides-pagination">
              <div className={prevDisabled?'page-btn prev-btn disabled':'page-btn prev-btn'} onClick={onPrevious}>
                <i/>Previous
              </div>
              <div className="current">{currentPage}</div>
              <div className={nextDisabled?'page-btn next-btn disabled':'page-btn next-btn'} onClick={onNext}>Next<i/></div>
            </div>
          </div>
        </div>
      </div>
      <PostDialog title={gameData.gameName} ref={PostDialogRef} reload={()=>{getAllPostOneGame(searchParams.get('genreId'), gameId, 1, pageSize)}}/>
    </div>
  )
}
export default Forum