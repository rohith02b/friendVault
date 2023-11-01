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
  const baseUrl = import.meta.env.VITE_BASE_ROUTE
  const authUrl = import.meta.env.VITE_AUTH_SERVICE_URL

  console.log(baseUrl, authUrl)

  return (
    <>
      <Routes>
        <Route path={baseUrl} element={<Redirector />} />
        <Route path={`${baseUrl}auth/register`} element={<Register />} />
        <Route path={`${baseUrl}auth/login`} element={<Login />} />
      </Routes>
    </>
  )
}

export default App
