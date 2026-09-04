import React, { useContext } from 'react'
import ThemeContexte from '../context/ThemeContexte'
import LangContext from '../context/LangContext'
const Main = () => {
    const {theme, ChangementTheme} = useContext(ThemeContexte)
    const {lang, changeLang} = useContext(LangContext)
  return (
    <div>
        <hr />
        <p>Theme: {theme}</p>
        <p>Lang: {lang}</p>
        <button onClick={ChangementTheme} className={theme}>Changer Theme</button>
        <button onClick={changeLang}>Changer Lang</button>

    </div>
  )
}

export default Main