import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter as Router, Routes, Route, Link, BrowserRouter} from 'react-router-dom'
import LoginPage from "./components/LoginPage.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <BrowserRouter>
          <App />
      </BrowserRouter>
      {/*<Routes>*/}
      {/*    <Route path="/signin" element={<LoginPage />} />*/}
      {/*    <Route path="/test" element={<App />} />*/}
      {/*</Routes>*/}
  </React.StrictMode>
)
