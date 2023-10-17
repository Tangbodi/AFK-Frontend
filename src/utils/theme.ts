import { getUuid } from './utils'
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
  const userUuid = getUuid()
  const isManual = sessionStorage.getItem(userUuid)
  if(isManual && Number(isManual)) return
  const nowTime = new Date()
	const minutes = nowTime.getHours() * 60 + nowTime.getMinutes() //当前时间转换成分
  const endTime = "18:00"
  const endTime2 = "6:00"
  const endTimeToMinutes = Number(endTime.split(':')[0])*60;
  const endTimeToMinutes2 = Number(endTime2.split(':')[0])*60;
  (endTimeToMinutes <= minutes) || ( minutes <= endTimeToMinutes2 ) ? setTheme('theme-dark') : setTheme('theme-light')
  return (endTimeToMinutes <= minutes) || (minutes <= endTimeToMinutes2)
}