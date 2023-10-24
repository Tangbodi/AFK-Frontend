import { Carousel } from 'antd'
import './banner.less'
import { Component } from 'react'

class Banner extends Component<any,any> {
  private slider: any
  constructor(props) {
    super(props)
    this.next = this.next.bind(this);
    this.prev = this.prev.bind(this);
    this.slider = undefined
    this.state = {
      data: [],
      width: '100%',
      autoplay: false,
      autoplaySpeed: 6000,

    }
  }
  getData(data, width, autoplay) {
    this.setState({ width })
    this.setState({ data })
    this.setState({ autoplay })
  }
  next() {
    this.slider.next()
  }
  prev() {
    this.slider.prev();
  }
  render() {
    return (
      <div className="afk-banner">
        <Carousel ref={el => (this.slider = el)} autoplay={this.state.autoplay} autoplaySpeed={this.state.autoplaySpeed}>
          {
            this.state.data.map((item, index) => {
              return (
                <div className="afk-banner-item" key={index}>
                  <img src={item.imageUrl || item.mediaContentUrl} height={300} width={this.state.width} />
                  {/* <div className="banner-desc">
                    <h3 className="banner-desc-title">Why does Nintendo keep patching dupe methods?</h3>
                    <p className="banner-desc-sub"><span>HOT:</span>Tears of the Kingdom1</p>
                  </div> */}
                </div>
              )
            })
          }
        </Carousel>
        <div className="banner-btn prev-btn" onClick={this.prev}></div>
        <div className="banner-btn next-btn" onClick={this.next}></div>
      </div>
    )
  }
}
export default Banner