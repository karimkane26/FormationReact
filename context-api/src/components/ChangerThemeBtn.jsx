import React, { useContext } from 'react'
import ThemeContexte from '../context/ThemeContexte'
import LangContext from '../context/LangContext'
const ChangerThemeBtn = () => {
    const  {theme,ChangementTheme}= useContext(ThemeContexte)
    const {lang} = useContext(LangContext)
  return (
    <div>
      <h1>Header</h1>
      <p>Theme:{theme}</p>
        <h1>Lang:{lang}</h1>
        {/* <button onClick={() => setTheme((theme) === "white" ? "dark" : 'white')}>Changer Theme</button> */}
        <button onClick={ChangementTheme}className={theme}>Changer Theme</button>

    </div>
  )
}

export default ChangerThemeBtn