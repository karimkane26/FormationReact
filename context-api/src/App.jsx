import './index.css'
import ChangerThemeBtn from './components/ChangerThemeBtn'
import { LangContextProvider } from './context/LangContext'
import { ThemeContexteProvider } from './context/ThemeContexte'
import Main from './components/Main'
import Footer from './components/Footer'

function App() {
  return (
    <div >
      <LangContextProvider>
      <ThemeContexteProvider>
        {/* <Test>
          <h1>Bonjour</h1>
          <h1>Bonjour</h1>
          <h1>Bonjour</h1>
          <h1>Bonjour</h1>
        </Test> */}
        <ChangerThemeBtn />
        <Main />
        <hr />
        <Footer />
      </ThemeContexteProvider>
      </LangContextProvider>

    </div>
  )
}

export default App
