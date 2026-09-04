import './index.css'
import ChangerThemeBtn from './components/ChangerThemeBtn'
import Main from './components/Main'
import Footer from './components/Footer'
import useTheme from './hooks/useTheme'
function App() {
  const {theme} = useTheme()
  return (
    <div className={theme}>
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
    </div>
  )
}

export default App
