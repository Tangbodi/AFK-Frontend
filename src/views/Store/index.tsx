import './store.less'
import { Input } from 'antd'
import { SearchOutlined, CloseOutlined } from '@ant-design/icons';
import hot1 from '@/assets/images/hot1.png'
import hot2 from '@/assets/images/hot2.png'
import hot3 from '@/assets/images/hot3.png'

const Store = () => {
  return (
    <div className='afk-store'>
      <div className='afk-store-left'>
        <div className='store-search'>
          <Input placeholder="Search games" prefix={<SearchOutlined />} allowClear={{clearIcon:<CloseOutlined />}}/>
        </div>
        <div className='store-group'>
          <div className='store-group-name'>A</div>
          <div className='store-group-list'>
            <ul>
              <li>Abccc</li>
              <li>Adfff</li>
              <li>Aggtt</li>
            </ul>
          </div>
        </div>
        <div className='store-group'>
          <div className='store-group-name'>B</div>
          <div className='store-group-list'>
            <ul>
              <li>Abccc</li>
              <li>Adfff</li>
              <li>Aggtt</li>
            </ul>
          </div>
        </div>
      </div>
      <div className='afk-store-right'>
        <div className='store-right-top'>
          <div className='store-right-top-item'>
            <img src={hot1} width="280" height="135"/>
          </div>
          <div className='store-right-top-item'>
            <img src={hot2} width="280" height="135"/>
          </div>
          <div className='store-right-top-item'>
            <img src={hot3} width="280" height="135"/>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Store