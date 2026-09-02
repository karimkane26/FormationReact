import React, { useContext } from 'react'
import ThemeContexte from '../context/ThemeContexte';
import ChangerThemeBtn from './ChangerThemeBtn';
const Test = ({children}) => {
    const data = useContext(ThemeContexte)
    console.log("Data2",data);
  return (
    <div>
      <ChangerThemeBtn />
    </div>
  )
}

export default Test