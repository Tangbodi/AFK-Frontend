import Header from "@/components/Header"
import Banner from '@/components/Banner'
import Footer from "@/components/Footer"
import Recommend from "@/components/Recommend"
import Forum from "@/components/Forum"
import Hot from '@/components/Hot'
import News from '@/components/News'
import './home.less'

const View = () => {
  return (
    <div className="afk-home">
      <Header/>
      <main className="afk-main">
        <Banner/>
        <Recommend/>
        <News/>
        <Hot/>
        <Forum/>
      </main>
      <Footer/>
    </div>
  )
}

export default View