import { createContext, useState, useEffect } from "react";

const ThemeContexte = createContext()

export const ThemeContexteProvider = ({children}) => {
    const [theme, setTheme] = useState('white')

    const ChangementTheme = () => {
        setTheme((theme) => (theme === 'light' ? 'dark' : 'light'))
    }

    useEffect(() => {
        localStorage.setItem("theme",theme)
    },[theme])
   

    return (
          <ThemeContexte.Provider value={{theme,ChangementTheme}}>
           {children}
            </ThemeContexte.Provider>
    )
}

export default ThemeContexte
