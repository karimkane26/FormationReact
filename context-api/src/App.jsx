import { useState } from 'react'
import ThemeContexte from './context/ThemeContexte'
import './index.css'
import ChangerThemeBtn from './components/ChangerThemeBtn'
import Test from './components/Test'
import { ThemeContexteProvider } from './context/ThemeContexte'
function App() {

  return (
    <div className='App'>
      <ThemeContexteProvider>
        <Test>
          <h1>Bonjour</h1>
          <h1>Bonjour</h1>
          <h1>Bonjour</h1>
          <h1>Bonjour</h1>

          

        </Test>

      </ThemeContexteProvider>
    </div>
  )
}

export default App
