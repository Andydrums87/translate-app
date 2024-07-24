import React, { useState } from 'react'
import './App.css'
import Logo from "../src/images/logo.svg"
import  Translator  from './components/Translator'


function App() {

  
  return (
    <div className="container">
      <img  className="logo"src={Logo} alt="" />
      <Translator />
    </div>
  )
}

export default App
