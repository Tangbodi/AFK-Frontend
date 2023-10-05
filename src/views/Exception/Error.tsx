import './notfound.less'
const ErrorComp = () => {
  return (
    <div className="afk-error-wrap">
      <div className='afk-redirect-error'>
        <div className='error-main-title'>Email verification link expired</div>
        <div className='error-main-desc'>Looks like the verification link has expired. Not to worry, we can send the link again.</div>
      </div>
    </div>
  )
}
export default ErrorComp