import { createContext, useState } from "react";
const LangContext = createContext()
export default LangContext
export const LangContextProvider = ({children}) => {
    const [lang,setLang] = useState('us')
    const changeLang =() => {
        setLang((langue) => langue === 'eng' ? 'fr' : 'eng')
    }
    return (
        <LangContext.Provider value={{lang,changeLang}}>
        {children}
        </LangContext.Provider>
    )
}