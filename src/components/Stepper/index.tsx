import Avatar from '@mui/material/Avatar'
import Controls from '@/components/Controls'
import './stepper.less'

export default function VerticalLinearStepper() {
  return (
    <div className="forum-steps">
      <div className='form-steps-item'>
        <div className="form-steps-item-top">
          <div className='form-steps-item-top-left'>
            <Avatar alt="Josh7651" src="/static/images/avatar/1.jpg" sx={{width:'48px', height:'48px'}}/>
          </div>
          <div className="form-steps-item-top-right">
            <div className='top-right-name'>Kofa2387</div>
            <div className='top-right-date'>July7,2023</div>
          </div>
        </div>
        <div className='form-steps-item-main'>
          <div className='form-steps-item-main-content'>
            Try out different ad text to see what brings in the most customers,
            and learn how to enhance your ads using features like ad extensions.
            If you run into any problems with your ads, find out how to tell if
            they're running and how to resolve approval issues.
          </div>
          <Controls/>
        </div>
      </div>
      <div className='form-steps-item'>
        <div className="form-steps-item-top">
          <div className='form-steps-item-top-left'>
            <Avatar alt="Josh7651" src="/static/images/avatar/1.jpg" sx={{width:'48px', height:'48px'}}/>
          </div>
          <div className="form-steps-item-top-right">
            <div className='top-right-name'>Kofa2387</div>
            <div className='top-right-date'>July7,2023</div>
          </div>
        </div>
        <div className='form-steps-item-main'>
          <div className='form-steps-item-main-content'>
            Try out different ad text to see what brings in the most customers,
            and learn how to enhance your ads using features like ad extensions.
            If you run into any problems with your ads, find out how to tell if
            they're running and how to resolve approval issues.
          </div>
          <Controls/>
        </div>
      </div>
      <div className='form-steps-item'>
        <div className="form-steps-item-top">
          <div className='form-steps-item-top-left'>
            <Avatar alt="Josh7651" src="/static/images/avatar/1.jpg" sx={{width:'48px', height:'48px'}}/>
          </div>
          <div className="form-steps-item-top-right">
            <div className='top-right-name'>Kofa2387</div>
            <div className='top-right-date'>July7,2023</div>
          </div>
        </div>
        <div className='form-steps-item-main'>
          <div className='form-steps-item-main-content'>
            Try out different ad text to see what brings in the most customers,
            and learn how to enhance your ads using features like ad extensions.
            If you run into any problems with your ads, finlike ad extensions.
            If you run into any like ad extensions.
            If you run into any like ad extensions.
            If you run into any d out how to tell if
            they're running and how to resolve approval issues.
          </div>
          <Controls/>
        </div>
      </div>
      <div className='form-steps-more'>
        &gt;&gt; More Replies
      </div>
    </div>
  )
}
