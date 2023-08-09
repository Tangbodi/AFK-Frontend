import Header from "@/components/Header"
import Banner from '@/components/Banner'
import Footer from "@/components/Footer"
import Recommend from "@/components/Recommend"
import hot1 from '@/assets/images/hot1.png'
import hot2 from '@/assets/images/hot2.png'
import hot3 from '@/assets/images/hot3.png'
import hot4 from '@/assets/images/hot4.png'
import warcraft from '@/assets/images/warcraft.png'
import zelda from '@/assets/images/zelda.png'
import souls from '@/assets/images/souls.png'
import baldur from '@/assets/images/baldur.png'
import './home.less'

const View = () => {
  return (
      <div className="afk-home">
        <Header/>
        <main className="afk-main">
          <Banner/>
          <Recommend/>
          <div className="afk-news mt20">
            <div className="afk-home-title">News</div>
            <div className="afk-news-list">
              <div className="afk-news-list-item">
                <div className="list-item-left">
                  <img src={baldur}/>
                </div>
                <div className="list-item-right">
                  <div className="list-item-right-title">Baldur's Gate 3 - How To Unlock More Illithid Powers</div>
                  <div className="list-item-right-desc">Your character and companions can gain abilities in Baldur's Gate 3. Some, like the Illithid Powers, emphasize the use of psychic force. Telepathy and telekinesis go hand in hand when you want to eliminate your foes. However, there are stronger variants that you can obtain. Our guide discusses how you can unlock more high-tier Illithid Powers in Baldur's Gate 3.</div>
                  <div className="list-item-right-tag">Baldur's Gate 3</div>
                </div>
              </div>
              <div className="afk-news-list-item">
                <div className="list-item-left">
                  <img src={baldur}/>
                </div>
                <div className="list-item-right">
                  <div className="list-item-right-title">Baldur's Gate 3 - How To Unlock More Illithid Powers</div>
                  <div className="list-item-right-desc">Your character and companions can gain abilities in Baldur's Gate 3. Some, like the Illithid Powers, emphasize the use of psychic force. Telepathy and telekinesis go hand in hand when you want to eliminate your foes. However, there are stronger variants that you can obtain. Our guide discusses how you can unlock more high-tier Illithid Powers in Baldur's Gate 3.</div>
                  <div className="list-item-right-tag">Baldur's Gate 3</div>
                </div>
              </div>
              <div className="afk-news-list-item">
                <div className="list-item-left">
                  <img src={baldur}/>
                </div>
                <div className="list-item-right">
                  <div className="list-item-right-title">Baldur's Gate 3 - How To Unlock More Illithid Powers</div>
                  <div className="list-item-right-desc">Your character and companions can gain abilities in Baldur's Gate 3. Some, like the Illithid Powers, emphasize the use of psychic force. Telepathy and telekinesis go hand in hand when you want to eliminate your foes. However, there are stronger variants that you can obtain. Our guide discusses how you can unlock more high-tier Illithid Powers in Baldur's Gate 3.</div>
                  <div className="list-item-right-tag">Baldur's Gate 3</div>
                </div>
              </div>
              <div className="afk-news-more">
                &gt;&gt; More News
              </div>
            </div>
            
          </div>
          <div className="hot-games">
            <ul>
              <li>
                <img src={hot1} width={280} height={135}/>
              </li>
              <li>
                <img src={hot2} width={280} height={135}/>
              </li>
              <li>
                <img src={hot3} width={280} height={135}/>
              </li>
              <li>
                <img src={hot4} width={280} height={135}/>
              </li>
            </ul>
          </div>
          <div className="jump-back">
            <div className="afk-home-title">Forum List</div>
            <div className="jump-back-tabs">
              <span className="jump-back-tabs-btn active">Games</span>
              <span className="jump-back-tabs-btn">Genres</span>
              <span className="jump-back-tabs-btn">Themes</span>
              <span className="jump-back-tabs-btn">Consoles</span>
            </div>
            <div className="jump-back-main-wrap">
              <div className="jump-back-main">
                <div className="jump-back-main-item">
                  <div className="jump-back-main-item-left">
                    <img src="http://31.220.21.110:8180/ICON/104.png" width="64" height="64"/>
                  </div>
                  <div className="jump-back-main-item-right">
                    <div className="item-right-title">Tears of the Kingdom</div>
                    <div className="item-right-desc">Why does Nintendo keep patching dupe methods?</div>
                  </div>
                </div>
                <div className="jump-back-main-item">
                  <div className="jump-back-main-item-left">
                    <img src={souls} width="64" height="64"/>
                  </div>
                  <div className="jump-back-main-item-right">
                    <div className="item-right-title">Tears of the Kingdom</div>
                    <div className="item-right-desc">Why does Nintendo keep patching dupe methods?</div>
                  </div>
                </div>
                <div className="jump-back-main-item">
                  <div className="jump-back-main-item-left">
                    <img src={warcraft} width="64" height="64"/>
                  </div>
                  <div className="jump-back-main-item-right">
                    <div className="item-right-title">World of Warcraft</div>
                    <div className="item-right-desc">How do i sell items in world of warcraft?</div>
                  </div>
                </div>
                <div className="jump-back-main-item">
                  <div className="jump-back-main-item-left">
                    <img src={zelda} width="64" height="64"/>
                  </div>
                  <div className="jump-back-main-item-right">
                    <div className="item-right-title">Tears of the Kingdom</div>
                    <div className="item-right-desc">Why does Nintendo keep patching dupe methods?</div>
                  </div>
                </div>
              </div>
              <div className="jump-back-more">&gt;&gt; View more</div>
            </div>
          </div>
        </main>
        <Footer/>
      </div>
  )
}

export default View