import Box from '@mui/material/Box'
// import Stepper from '@mui/material/Stepper'
// import Step from '@mui/material/Step'
// import StepLabel from '@mui/material/StepLabel'
// import StepContent from '@mui/material/StepContent'
// import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'
import Controls from '@/components/Controls'
import './stepper.less'
const steps = [
  {
    label: 'Name',
    description: `For each ad campaign that you create, you can control how much
              you're willing to spend on clicks and conversions, which networks
              and geographical locations you want your ads to show on, and more.`,
  },
  {
    label: 'Create an ad group',
    description:
      'An ad group contains one or more ads which target a shared set of keywords.',
  },
  {
    label: 'Create an ad',
    description: `Try out different ad text to see what brings in the most customers,
              and learn how to enhance your ads using features like ad extensions.
              If you run into any problems with your ads, find out how to tell if
              they're running and how to resolve approval issues.`,
  },
  {
    label: 'Create an ad',
    description: `Try out different ad text to see what brings in the most customers,
              and learn how to enhance your ads using features like ad extensions.
              If you run into any problems with your ads, find out how to tell if
              they're running and how to resolve approval issues.`,
  }
]

export default function VerticalLinearStepper() {
  return (
    <Box>
      {/* <Stepper orientation="vertical" className='forum-steps'>
        {steps.map((step, index) => (
          <Step expanded key={step.label}>
            <StepLabel StepIconComponent={()=>(<Avatar alt="Josh7651" src="/static/images/avatar/1.jpg" sx={{width:'48px', height:'48px'}}/>)}>
              {step.label}
            </StepLabel>
            <StepContent>
              <Typography>
                <span className="relation-user">@zhangsan </span>
                {step.description}
              </Typography>
              <Controls/>
            </StepContent>
          </Step>
        ))}
      </Stepper> */}
      <div className="forum-steps">
        <div className='form-steps-item'>
          <div className="form-steps-item-top">
            <div className='form-steps-item-top-left'>
              <Avatar alt="Josh7651" src="/static/images/avatar/1.jpg" sx={{width:'48px', height:'48px'}}/>
            </div>
            <div className="form-steps-item-top-right">
              Kofa2387
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
              Kofa2387
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
              Kofa2387
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
    </Box>
  )
}
