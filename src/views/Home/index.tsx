import Header from "@/components/Header"
import Banner from '@/components/Banner'
import Footer from "@/components/Footer"
import hot1 from '@/assets/images/hot1.png'
import hot2 from '@/assets/images/hot2.png'
import hot3 from '@/assets/images/hot3.png'


import warcraft from '@/assets/images/warcraft.png'
import pokemon from '@/assets/images/pokemon.png'
import xvi from '@/assets/images/xvi.png'
import zelda from '@/assets/images/zelda.png'
import cyberpunk from '@/assets/images/cyberpunk.png'
import souls from '@/assets/images/souls.png'
import './home.less'
const View = () => {
  return (
      <div className="afk-home">
        <Header/>
        <main className="afk-main">
          <Banner/>
          <div className="hot-games">
            <ul>
              <li>
                <img src={hot1} width="280" height="135"/>
              </li>
              <li>
                <img src={hot2} width="280" height="135"/>
              </li>
              <li>
                <img src={hot3} width="280" height="135"/>
              </li>
            </ul>
          </div>
          <div className="jump-back">
            <div className="jump-back-title">Jump Back in...</div>
            <div className="jump-back-main">
              <div className="jump-back-main-item">
                <div className="jump-back-main-item-left">
                  <img src={zelda} width="64" height="64"/>
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
                  <img src={pokemon} width="64" height="64"/>
                </div>
                <div className="jump-back-main-item-right">
                  <div className="item-right-title">Pokenmon</div>
                  <div className="item-right-desc">How do i sell items in world of warcraft?</div>
                </div>
              </div>
              <div className="jump-back-main-item">
                <div className="jump-back-main-item-left">
                  <img src={xvi} width="64" height="64"/>
                </div>
                <div className="jump-back-main-item-right">
                  <div className="item-right-title">Tears of the Kingdom</div>
                  <div className="item-right-desc">Why does Nintendo keep patching dupe methods?</div>
                </div>
              </div>
              <div className="jump-back-main-item">
                <div className="jump-back-main-item-left">
                  <img src={cyberpunk} width="64" height="64"/>
                </div>
                <div className="jump-back-main-item-right">
                  <div className="item-right-title">Tears of the Kingdom</div>
                  <div className="item-right-desc">Why does Nintendo keep patching dupe methods?</div>
                </div>
              </div>
            </div>
          </div>
          <div className="jump-back">
            <div className="jump-back-title">Forum List</div>
            <div className="jump-back-tabs">
              <span className="jump-back-tabs-btn active">Games</span>
              <span className="jump-back-tabs-btn">Genres</span>
              <span className="jump-back-tabs-btn">Themes</span>
              <span className="jump-back-tabs-btn">Consoles</span>
            </div>
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
          </div>
        </main>
        <Footer/>
      </div>
  )
}

export default View