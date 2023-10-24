import './search.less'
import Hot from '@/components/Hot'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
const Search = () => {
  const navigate = useNavigate()
  const { result } = useSelector((state: RootState) => ({
    result: state.gobalStatus.result
  }))
  return (
    <div className='afk-search-result'>
      <Hot/>
      <div className='afk-search-result-content'>
        <div className='afk-search-result-top'>
          { result && result.length > 1 ? 'Found below results' : 'No result found'}
        </div>
        <div className='afk-search-result-main'>
          { result && result.map((item, index)=>{
            return (
              <div className='main-item' key={index} onClick={()=>{navigate(`/forum/${item.gameId}?genreId=${item.genreId}`)}}>
                <div className='main-item-title'>{item.title}</div>
                {/* <div className='main-item-link'>keyword、Kingdom</div> */}
                <div className='main-item-desc' dangerouslySetInnerHTML={{ __html: item.textRender}}></div>
              </div>
            )
          })}
          
        </div>
      </div>
      
    </div>
  )
}

export default Search