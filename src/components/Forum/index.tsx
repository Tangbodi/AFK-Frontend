import { returnAllGamesAPI } from "@/request/api"
import { message } from "antd"
import { useEffect, useState } from "react"

const Forum = () => {
  const [games, setGames] = useState([])
  useEffect(() => {
    returnAllGames()
  },[])

  const returnAllGames = async() => {
    const returnAllGamesRes = await returnAllGamesAPI()
    if(returnAllGamesRes.code === 200) {
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
        <div className="jump-back-main">
          { games.map((game, index)=>{
            return (
              <div className="jump-back-main-item" key={index}>
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
        <div className="jump-back-more">&gt;&gt; View more</div>
      </div>
    </div>
  )
}

export default Forum