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
      data: []
    }
  }
  getData(data) {
    this.setState({ data })
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
        <Carousel ref={el => (this.slider = el)}>
          {
            this.state.data.map((item, index) => {
              return (
                <div className="afk-banner-item" key={index}>
                  <img src={`//${item.imageUrl}`} height={300} />
                  <div className="banner-desc">
                    <h3 className="banner-desc-title">Why does Nintendo keep patching dupe methods?</h3>
                    <p className="banner-desc-sub"><span>HOT:</span>Tears of the Kingdom1</p>
                  </div>
                </div>
              )
            })
          }
          
          {/* <div className="afk-banner-item">
            <img src={banner1} height={300} />
            <div className="banner-desc">
              <h3 className="banner-desc-title">Why does Nintendo keep patching dupe methods?</h3>
              <p className="banner-desc-sub"><span>HOT:</span>Tears of the Kingdom2</p>
            </div>
          </div>
          <div className="afk-banner-item">
            <img src={banner1} height={300} />
            <div className="banner-desc">
              <h3 className="banner-desc-title">Why does Nintendo keep patching dupe methods?</h3>
              <p className="banner-desc-sub"><span>HOT:</span>Tears of the Kingdom3</p>
            </div>
          </div> */}
        </Carousel>
        <div className="banner-btn prev-btn" onClick={this.prev}></div>
        <div className="banner-btn next-btn" onClick={this.next}></div>
      </div>
    )
  }
}
export default Banner