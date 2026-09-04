import React, { useContext } from 'react'
import useTheme from '../hooks/useTheme'
import LangContext from '../context/LangContext'
const ChangerThemeBtn = () => {
    const  {theme,ChangementTheme}= useTheme()
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