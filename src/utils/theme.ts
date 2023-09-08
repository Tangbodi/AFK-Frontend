export const getTheme = (): string => {
  return localStorage.getItem('theme')
}

export const setTheme = (themeName: string):void => {
  localStorage.setItem('theme', themeName)
  document.documentElement.className = themeName
}

export const keepTheme = ():void => {
  const localTheme = localStorage.getItem('theme')
  if(localTheme) {
    if(localTheme === 'theme-dark'){
      setTheme('theme-dark')
    } else if(localTheme === 'theme-light'){
      setTheme('theme-light')
    } 
  } else {
    setTheme('theme-light')
  }
}

export const autoSetTheme = () => {
  const nowTime = new Date()
	const minutes = nowTime.getHours() * 60 + nowTime.getMinutes() //当前时间转换成分
  const endTime = "18:00"
  const endTimeToMinutes = Number(endTime.split(':')[0])*60
  endTimeToMinutes <= minutes ? setTheme('theme-dark') : setTheme('theme-light')
}