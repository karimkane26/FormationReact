import { createContext, useState } from "react";

const ThemeContexte = createContext()

export const ThemeContexteProvider = ({children}) => {
    // const [theme,setTheme] = useState("white")
    // const values = {theme,setTheme} 
    return (
          <ThemeContexte.Provider value={'white'}>
           {children}
            </ThemeContexte.Provider>
    )
}

export default ThemeContexte
 

