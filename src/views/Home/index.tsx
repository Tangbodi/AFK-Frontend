import Header from "@/components/Header"
import Banner from '@/components/Banner'
import Footer from "@/components/Footer"
import Recommend from "@/components/Recommend"
import Forum from "@/components/Forum"
import Hot from '@/components/Hot'
import News from '@/components/News'
import './home.less'
import { useEffect, useRef } from 'react'
import { getHomeGameImagesAPI } from '@/request/api'
import { message } from "antd"
const View = () => {
  const bannerRef = useRef(null)
  useEffect(() => {
    getHomeGameImages()
  },[])

  const getHomeGameImages = async() => {
    const getHomeGameImagesRes = await getHomeGameImagesAPI()
    if(getHomeGameImagesRes.code === 200) {
      bannerRef.current.getData(getHomeGameImagesRes.data||[])
      return
    }
    message.warning(getHomeGameImagesRes.message)
  }

  return (
    <div className="afk-home">
      <Header/>
      <main className="afk-main">
        <Banner ref={bannerRef}/>
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