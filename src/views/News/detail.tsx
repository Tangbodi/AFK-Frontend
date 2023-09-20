import './news.less'
import { getNewsDetailAPI } from '@/request/api'
import { message } from 'antd'
import { useEffect } from 'react'
import { useSearchParams, useParams } from 'react-router-dom'
const NewsQuery = () => {
  const { newsId } = useParams()
  const [searchParams] = useSearchParams()
  useEffect(() => {
    getNewsDetail()
  })
  const getNewsDetail = async() => {
    const params = {
      newsId,
      gameId: Number(searchParams.get('gameId')),
      genreId: Number(searchParams.get('genreId'))
    }
    const getNewsDetailRes = await getNewsDetailAPI(params)
    if(getNewsDetailRes.code === 200) {
      return
    }
    message.warning(getNewsDetailRes.message)
  }
  return (
    <div className="afk-news-query">
      <div className="news-crumbs">News</div>
      <div className="news-list">
        <div className="news-list-item">
          <div className="news-list-item-top">
            <div className="news-list-item-top-l">
              LOGO XXXX
            </div>
            <div className="news-list-item-top-r">
              <span className='item-top-r-forum'>Forum</span>
              <span className='item-top-r-Save'>Save</span>
            </div>
          </div>
          <div className="news-list-item-detail">
            <div className='news-list-item-content-title'>AAAAAA</div>
            <div className='news-list-item-content-time'>by <span>Blizzard Entertainment</span></div>
            <div className='news-list-item-content-main'>
            When Guardians of the Dream arrives, champions will be tasked to protect a new zone—The Emerald Dream, engage in new Public Events—Superbloom and Emerald Bounty, build Renown with the Dream Wardens for unique rewards, and save the new World Tree from the Fyrakk's forces in a new Raid—Amirdrassil, the Dream's Hope.

Join us as we chat about the next Dragonflight content update, Guardians of the Dream, as Assistant Lead Encounter Designer Taylor Sanders and Senior Narrative Designer Anne Stickney, along with our host, Community Manager Bethany Stout, take us on a journey through the new zone—The Emerald Dream zone, the next Raid—Amirdrassil, the Dream's Hope, new Public Events, Dragonriding updates, and more.

A special seed, planted by Tyrande, has grown into a new World Tree and is on the verge of crossing over into Azeroth. Fyrakk and his forces, including his new allies—the Druids of the Flame, move among the roots of the World Tree, inflaming the Dream denizens as they attempt to tear into the Emerald Dream to infuse the heart of the World Tree with fire and use it as a conduit to spread eternal flames throughout Azeroth.

There is plenty of Renown to be earned with a new faction—The Dream Wardens. Help denizens of the Dream comprised of Keepers, dryads, druids, green dragonflight, and runebears to earn Renown and rewards.

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewsQuery