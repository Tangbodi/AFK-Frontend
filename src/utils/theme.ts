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