
const BackTop = () => {
  const goTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }
  return (
    <div className="afk-back-top" onClick={goTop}>
      Top
    </div>
  )
}
export default BackTop