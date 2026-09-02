import React, { useContext } from 'react'
import ThemeContexte from '../context/ThemeContexte'

const ChangerThemeBtn = () => {
    const data = useContext(ThemeContexte)
    console.log(data);
    
  return (
    <div>
        <h1>Theme:{data}</h1>
        <button>Changer Theme</button>
    </div>
  )
}

export default ChangerThemeBtn