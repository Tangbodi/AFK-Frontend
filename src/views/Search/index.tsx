import './search.less'
import Hot from '@/components/Hot'
import { useSelector } from 'react-redux'
const Search = () => {
  const { result } = useSelector((state: RootState) => ({
    result: state.gobalStatus.result
  }))
  return (
    <div className='afk-search-result'>
      <Hot/>
      <div className='afk-search-result-top'>
        找到约 {result&&result.length} 条结果
      </div>
      <div className='afk-search-result-main'>
        { result && result.map((item, index)=>{
          return (
            <div className='main-item' key={index}>
              <div className='main-item-title'>{item.title}</div>
              <div className='main-item-link'>keyword、Kingdom</div>
              <div className='main-item-desc' dangerouslySetInnerHTML={{ __html: item.textRender}}></div>
            </div>
          )
        })}
        
      </div>
    </div>
  )
}

export default Search