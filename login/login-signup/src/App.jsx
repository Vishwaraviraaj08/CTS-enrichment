import { useState } from 'react'
import './App.css'
import LoginPage from './components/LoginPage.jsx'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)

  return (
      <>
          <Routes>
              <Route path="/signin" element={<LoginPage />} />
          </Routes>

      </>
  )
}

export default App
