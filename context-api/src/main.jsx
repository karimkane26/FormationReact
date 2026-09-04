import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ThemeContexteProvider } from './context/ThemeContexte.jsx'
import { LangContextProvider } from './context/LangContext.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeContexteProvider>
      <LangContextProvider>
        <App />
      </LangContextProvider>
    </ThemeContexteProvider>
  </StrictMode>,
)
