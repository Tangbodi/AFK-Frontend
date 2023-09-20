import Header from "@/components/Header"
import Banner from '@/components/Banner'
import Footer from "@/components/Footer"
// import Recommend from "@/components/Recommend"
import Forum from "@/components/Forum"
import Hot from '@/components/Hot'
import News from '@/components/News'
import './home.less'
import { useEffect, useRef, useState } from 'react'
import { getHomeGameImagesAPI, getNewsAPI } from '@/request/api'
import { message } from "antd"
const View = () => {
  const bannerRef = useRef(null)
  const [newsData, setNewsData] = useState()
  useEffect(() => {
    getNews()
    getHomeGameImages()
  },[])

  const getNews = async() => {
    const getNewsRes: any = await getNewsAPI({page: 1, size: 3})
    if(getNewsRes.code === 200) {
      const newsResData = getNewsRes.data || {}
      setNewsData({...newsResData})
      return
    }
    message.warning(getNewsRes.message)
  }

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
      <div className="afk-main">
        <Banner ref={bannerRef}/>
        {/* <Recommend newsData={newsData}/> */}
        <News newsData={newsData}/>
        <Hot/>
        <Forum/>
      </div>
      <Footer/>
    </div>
  )
}

export default View