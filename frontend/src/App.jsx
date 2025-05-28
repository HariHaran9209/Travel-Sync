import React, { useState } from 'react'
import './css/App.css'
import Navbar from './components/Navbar'
import LoginPopup from './components/LoginPopup'
import Header from './components/Header'
import AppDownload from './components/AppDownload'
import Footer from './components/Footer'
import { ToastContainer } from 'react-toastify'

const App = () => {

  const [ showLogin, setShowLogin ] = useState(false)

  return (
    <>
    <ToastContainer />
    { showLogin ? <LoginPopup setShowLogin={setShowLogin} /> : <></>}
    <div className="app">
      <Navbar setShowLogin={setShowLogin} />
      <Header />
    </div>
    <AppDownload />
    <Footer />
    </>
  )
}

export default App
