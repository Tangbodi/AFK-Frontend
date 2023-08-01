// import Header from "@/components/Header"
// import Banner from '@/components/Banner'
// import hot1 from '@/assets/images/hot1.png'
// import hot2 from '@/assets/images/hot2.png'
// import hot3 from '@/assets/images/hot3.png'
// /** 
//  * Jump back in 
// */

// import warcraft from '@/assets/images/warcraft.png'
// import pokemon from '@/assets/images/pokemon.png'
// import xvi from '@/assets/images/xvi.png'
// import zelda from '@/assets/images/zelda.png'
// import cyberpunk from '@/assets/images/cyberpunk.png'

// /**
//  * Forum List
//  */

// import souls from '@/assets/images/souls.png'

// import { ThemeProvider, createTheme } from "@mui/material/styles"
// import CssBaseline from "@mui/material/CssBaseline"
// import { useState } from "react"

// import './home.less'
// const View = () => {
//   const [themeLight, setThemeType] = useState(true)
//   function handleThemeChange() {
//       setThemeType(!themeLight)
//   }
  
//   const theme = createTheme({
//     palette: {
//         mode: themeLight ? "light" : "dark"
//     }
//   })
//   return (
//     <ThemeProvider theme={theme}>
//       <CssBaseline/>
//       <div className="afk-home">
//         <Header></Header>
//         <main className="afk-main">
//           <Banner></Banner>
//           <div className="hot-games">
//             <ul>
//               <li>
//                 <img src={hot1} width="280" height="135"/>
//               </li>
//               <li>
//                 <img src={hot2} width="280" height="135"/>
//               </li>
//               <li>
//                 <img src={hot3} width="280" height="135"/>
//               </li>
//             </ul>
//           </div>
//           <div className="jump-back">
//             <div className="jump-back-title" onClick={handleThemeChange}>Jump Back in...</div>
//             <div className="jump-back-main">
//               <div className="jump-back-main-item">
//                 <div className="jump-back-main-item-left">
//                   <img src={zelda} width="64" height="64"/>
//                 </div>
//                 <div className="jump-back-main-item-right">
//                   <div className="item-right-title">Tears of the Kingdom</div>
//                   <div className="item-right-desc">Why does Nintendo keep patching dupe methods?</div>
//                 </div>
//               </div>
//               <div className="jump-back-main-item">
//                 <div className="jump-back-main-item-left">
//                   <img src={warcraft} width="64" height="64"/>
//                 </div>
//                 <div className="jump-back-main-item-right">
//                   <div className="item-right-title">World of Warcraft</div>
//                   <div className="item-right-desc">How do i sell items in world of warcraft?</div>
//                 </div>
//               </div>
//               <div className="jump-back-main-item">
//                 <div className="jump-back-main-item-left">
//                   <img src={pokemon} width="64" height="64"/>
//                 </div>
//                 <div className="jump-back-main-item-right">
//                   <div className="item-right-title">Pokenmon</div>
//                   <div className="item-right-desc">How do i sell items in world of warcraft?</div>
//                 </div>
//               </div>
//               <div className="jump-back-main-item">
//                 <div className="jump-back-main-item-left">
//                   <img src={xvi} width="64" height="64"/>
//                 </div>
//                 <div className="jump-back-main-item-right">
//                   <div className="item-right-title">Tears of the Kingdom</div>
//                   <div className="item-right-desc">Why does Nintendo keep patching dupe methods?</div>
//                 </div>
//               </div>
//               <div className="jump-back-main-item">
//                 <div className="jump-back-main-item-left">
//                   <img src={cyberpunk} width="64" height="64"/>
//                 </div>
//                 <div className="jump-back-main-item-right">
//                   <div className="item-right-title">Tears of the Kingdom</div>
//                   <div className="item-right-desc">Why does Nintendo keep patching dupe methods?</div>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="jump-back">
//             <div className="jump-back-title">Forum List</div>
//             <div className="jump-back-tabs">
//               <span className="jump-back-tabs-btn active">Games</span>
//               <span className="jump-back-tabs-btn">Genres</span>
//               <span className="jump-back-tabs-btn">Themes</span>
//               <span className="jump-back-tabs-btn">Consoles</span>
//             </div>
//             <div className="jump-back-main">
//               <div className="jump-back-main-item">
//                 <div className="jump-back-main-item-left">
//                   <img src={zelda} width="64" height="64"/>
//                 </div>
//                 <div className="jump-back-main-item-right">
//                   <div className="item-right-title">Tears of the Kingdom</div>
//                   <div className="item-right-desc">Why does Nintendo keep patching dupe methods?</div>
//                 </div>
//               </div>
//               <div className="jump-back-main-item">
//                 <div className="jump-back-main-item-left">
//                   <img src={souls} width="64" height="64"/>
//                 </div>
//                 <div className="jump-back-main-item-right">
//                   <div className="item-right-title">Tears of the Kingdom</div>
//                   <div className="item-right-desc">Why does Nintendo keep patching dupe methods?</div>
//                 </div>
//               </div>
//               <div className="jump-back-main-item">
//                 <div className="jump-back-main-item-left">
//                   <img src={warcraft} width="64" height="64"/>
//                 </div>
//                 <div className="jump-back-main-item-right">
//                   <div className="item-right-title">World of Warcraft</div>
//                   <div className="item-right-desc">How do i sell items in world of warcraft?</div>
//                 </div>
//               </div>
//               <div className="jump-back-main-item">
//                 <div className="jump-back-main-item-left">
//                   <img src={zelda} width="64" height="64"/>
//                 </div>
//                 <div className="jump-back-main-item-right">
//                   <div className="item-right-title">Tears of the Kingdom</div>
//                   <div className="item-right-desc">Why does Nintendo keep patching dupe methods?</div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </main>
//       </div>
//     </ThemeProvider>
//   )
// }

// export default View
import Box from '@mui/material/Box'
import { ThemeProvider, useTheme, createTheme } from '@mui/material/styles'
import { PaletteMode } from '@mui/material'
import { useState } from 'react'
import { color, height } from '@mui/system';
import './home.less'


const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    text: {
      ...(mode === 'light'
        ? {
            primary: '#111',
            bgColor: '#ccc'
          }
        : {
            primary: '#999',
            bgColor: 'red'
          }),
    },
  }
});

function MyApp() {
  const theme = useTheme()
  const [themeType, setThemeType] = useState(true)
  let darkModeTheme = createTheme(getDesignTokens(themeType?'light':'dark'))
  const changeTheme = () => {
    setThemeType(!themeType)
    darkModeTheme = createTheme(getDesignTokens(themeType?'light':'dark'))
  }
  return (
    <ThemeProvider theme={darkModeTheme}>
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: 'text.bgColor',
          color: 'text.primary',
          borderRadius: 1,
          p: 3,
        }}
      >
        This is a {theme.palette.mode} mode theme with custom palette
        <div>sdsdffff</div>
      </Box>
      <div onClick={changeTheme}>BTU</div>
    </ThemeProvider>
  );
}

export default MyApp