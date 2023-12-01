import './App.css'
import LoginPage from './components/LoginPage.jsx'
import {  Routes, Route } from 'react-router-dom'

function App() {
  return (
      <>
          <Routes>
              <Route path="/signin" element={<LoginPage />} />
          </Routes>

      </>
  )
}

export default App
