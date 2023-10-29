import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './components/Home'
import Login from './components/Auth/Login'
import Register from './components/Auth/Register'
import axios from 'axios'
import Redirector from './components/Redirector'

function App() {
  axios.defaults.withCredentials = true

  return (
    <>
      <Routes>
        <Route path='vault/app/' element={<Redirector />} />
        <Route path='vault/app/auth/login' element={<Login />} />
        <Route path='vault/app/auth/register' element={<Register />} />
      </Routes>
    </>
  )
}

export default App
