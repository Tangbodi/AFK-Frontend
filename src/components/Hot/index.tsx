import hot1 from '@/assets/images/hot1.png'
import hot2 from '@/assets/images/hot2.png'
import hot3 from '@/assets/images/hot3.png'
import hot4 from '@/assets/images/hot4.png'

const Hot = () => {
  return (
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
  )
}
export default Hot