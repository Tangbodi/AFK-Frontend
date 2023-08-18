import { returnAllGamesAPI } from "@/request/api"
import { message } from "antd"
import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom'
import Loading from "../Loading"

const Forum = () => {
  const navigate = useNavigate()
  const [games, setGames] = useState([])
  const [showList, setShowList] = useState([])
  const [showMore, setShowMore] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  useEffect(() => {
    returnAllGames()
  },[])

  const showMoreHandle = () => {
    setShowList(games)
    setShowMore(false)
  }

  const returnAllGames = async() => {
    setIsLoading(true)
    const returnAllGamesRes = await returnAllGamesAPI()
    if(returnAllGamesRes.code === 200) {
      setIsLoading(false)
      if(returnAllGamesRes.data && returnAllGamesRes.data.length > 9){
        setShowMore(true)
        setShowList(returnAllGamesRes.data.slice(0,9))
      }else{
        setShowMore(false)
        setShowList(returnAllGamesRes.data||[])
      }
      setGames(returnAllGamesRes.data)
      return
    }
    message.warning(returnAllGamesRes.message)
  }
  return (
    <div className="jump-back">
      <div className="afk-home-title">Forum List</div>
      <div className="jump-back-tabs">
        <span className="jump-back-tabs-btn active">Games</span>
      </div>
      <div className="jump-back-main-wrap">
        {isLoading&&<Loading/>}
        <div className="jump-back-main">
          { showList.map((game, index)=>{
            return (
              <div className="jump-back-main-item" key={index} onClick={()=>{navigate(`/forum/${game.gameId}?genreId=${game.genreId}`)}}>
                <div className="jump-back-main-item-left">
                  <img src={'//'+game.iconUrl} width={64} height={64}/>
                </div>
                <div className="jump-back-main-item-right">
                  <div className="item-right-title">{game.gameName}</div>
                  <div className="item-right-desc">{game.gameSlogan}</div>
                </div>
              </div>)
            })
          }
        </div>
        { showMore &&  <div className="jump-back-more" onClick={showMoreHandle}>&gt;&gt; View more</div>}        
      </div>
    </div>
  )
}

export default Forum