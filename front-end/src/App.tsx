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
        <Route path='/' element={<Redirector />}>
          <Route path='auth/login' element={<Login />} />
          <Route path='auth/register' element={<Register />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
